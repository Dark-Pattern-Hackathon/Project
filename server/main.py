from fastapi import FastAPI

app = FastAPI()


@app.post("/api/data")
def check_pattern():
    return "POST"

