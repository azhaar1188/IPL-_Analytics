from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import requests
from dotenv import load_dotenv
import os

app = FastAPI()
load_dotenv()

API_KEY = os.getenv("CRIC_API_KEY")
cache = {}

# Allow frontend to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
BASE_URL = "https://api.cricapi.com/v1"

def fetch_from_cricapi(endpoint, params={}):
    
    params["apikey"] = API_KEY

    response = requests.get(
        f"{BASE_URL}/{endpoint}",
        params=params
    )

    return response.json()

def fetch_cached(endpoint, params={}):

    key = f"{endpoint}:{str(params)}"

    # RETURN CACHE IF EXISTS
    if key in cache:
        print("Returning cached data...")
        return cache[key]

    # FETCH FRESH DATA
    data = fetch_from_cricapi(endpoint, params)

    # STORE IN CACHE
    cache[key] = data

    return data

@app.get("/")
def home():
    return {"message": "IPL Analytics Backend Running"}

@app.get("/players")
def get_players():
    with open("data.json") as f:
        data = json.load(f)
    return data
        
@app.get("/matches")
def get_matches():

    response = requests.get(f"{BASE_URL}/currentMatches",
    params={"apikey": API_KEY})
    
    data = response.json()

    # DEBUG
    print(data)

    # CHECK IF DATA EXISTS
    if "data" not in data:
        return {
            "error": "No match data found",
            "response": data
        }

    # FILTER IPL MATCHES
    ipl_matches = []

    for match in data["data"]:

        if (
            "IPL" in match.get("name", "")
            or
            "Indian Premier League" in match.get("name", "")
        ):

            ipl_matches.append(match)

    return {
        "data": ipl_matches
    }
@app.get("/schedule")
def get_schedule():

    # STEP 1 → Find IPL series
    series_data = fetch_cached(
        "series",
        {"search": "ipl"}
    )

    if "data" not in series_data:
        return {"error": "No IPL series found"}

    # STEP 2 → Take latest IPL
    latest_ipl = series_data["data"][0]

    series_id = latest_ipl["id"]

    # STEP 3 → Fetch full IPL matches
    matches_data = fetch_cached(
        "series_info",
        {"id": series_id}
    )

    return matches_data

@app.get("/ipl/matches")
def get_ipl_matches():

    series_id = "d5a498c8-7596-4b93-8ab0-e0efc3345312"

    data = fetch_cached(
        "series_info",
        {"id": series_id}
    )

    matches = data["data"]["matchList"]

    cleaned_matches = []

    for match in matches:

        cleaned_matches.append({
            "id": match["id"],
            "name": match["name"],
            "status": match["status"],
            "venue": match["venue"],
            "date": match["date"],
            "teams": match["teams"]
        })

    return cleaned_matches

@app.get("/ipl/live")
def get_live_matches():

    series_id = "d5a498c8-7596-4b93-8ab0-e0efc3345312"

    data = fetch_cached(
        "series_info",
        {"id": series_id}
    )

    matches = data["data"]["matchList"]

    live_matches = []

    for match in matches:

        if (
            match["matchStarted"]
            and
            not match["matchEnded"]
        ):

            live_matches.append(match)

    return live_matches

@app.get("/ipl/upcoming")
def upcoming_matches():

    series_id = "d5a498c8-7596-4b93-8ab0-e0efc3345312"

    data = fetch_cached(
        "series_info",
        {"id": series_id}
    )

    matches = data["data"]["matchList"]

    upcoming = []

    for match in matches:

        if not match["matchStarted"]:

            upcoming.append(match)

    return upcoming

@app.get("/ipl/completed")
def completed_matches():

    series_id = "d5a498c8-7596-4b93-8ab0-e0efc3345312"

    data = fetch_cached(
        "series_info",
        {"id": series_id}
    )

    matches = data["data"]["matchList"]

    completed = []

    for match in matches:

        if match["matchEnded"]:

            completed.append(match)

    return completed

@app.get("/ipl/match/{match_id}")
def get_match_details(match_id: str):

    data = fetch_cached(
        "match_scorecard",
        {"id": match_id}
    )

    return data

@app.get("/ipl/scorecard/{match_id}")
def get_scorecard(match_id: str):

    data = fetch_from_cricapi(
        "match_scorecard",
        {"id": match_id}
    )

    return data

@app.get("/ipl/squads")
def get_ipl_squads():

    match_id = "b39bbd39-c67f-4892-9a48-02e958946718"

    data = fetch_from_cricapi(
        "match_squad",
        {"id": match_id}
    )

    return data["data"]

@app.get("/squads")
def get_squads():

    with open("squads.json") as f:
        data = json.load(f)

    return data