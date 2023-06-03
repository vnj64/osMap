import uuid

from fastapi import FastAPI, UploadFile, File
from converter import converter

app = FastAPI()

IMAGEDIR = "images/"


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/upload/")
async def create_upload_file(file: UploadFile = File(...)):
    name = uuid.uuid4()
    file.filename = f"{name}.tif"
    contents = await file.read()

    with open(f"{IMAGEDIR}{file.filename}", "wb") as f:
        f.write(contents)

    result = converter(name)

    return result
