from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse
import json

import classify_script
import database

# PORT 3031
app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/data/detect")
def check_pattern(patterns_list: dict):
    """
    Detects if the website is using dark pattern or not.
    :param patterns_list: list of text from the website
    :return: True or False depending on the categorization of the dark pattern
    """
    s = classify_script.predict_category(set(patterns_list["text"].split("\n")))
    return {"Res": list(s)}


@app.post("/api/data/report")
def report_pattern(report_data: dict) -> JSONResponse:
    """
    Reports the dark pattern from the user and store it in a database.
    :param report_data:
    :return: JSON response 200 if the dark pattern is reported Successfully, else Error
    """
    #database.insert_report(report_data['email'], report_data['url'], report_data['pattern_name'], report_data['html_code'], report_data['user_comment'])
    return JSONResponse(content="Reported Dark Pattern!! Thank You", status_code=200)
