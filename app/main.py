import uuid
from datetime import datetime

import uvicorn
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from app.services.db.engine import create_db_session
from .utils.scripts.converter import converter
from config import load_config
from .models.images import Polygons


app = FastAPI()

IMAGEDIR = "app/images/"
config = load_config()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
    "http://89.108.81.42"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/upload/")
async def create_upload_file(file: UploadFile = File(...)):
    session = await create_db_session(cfg=config)
    name = uuid.uuid4()
    file.filename = f"{name}.tif"
    contents = await file.read()

    with open(f"{IMAGEDIR}{file.filename}", "wb") as f:
        f.write(contents)

    result, geojson_path, full_coordinates = converter(name)

    now = datetime.now()
    await Polygons.insert_polygons(session_maker=session, name=str(name), images="path_to_dir",
                                   full_coordinates=full_coordinates, date_publish=now)

    return result


@app.get('/polygons')
async def get_markers_coords():
    # получение из бд
    new_mass = []
    session = await create_db_session(cfg=config)
    # for item in mass:
    #     new_item = {
    #         type: "Feature",
    #         'geometry': {
    #             type: "Polygon",
    #             'coordinates': item.full_coordinates
    #
    #         },
    #         id: item.id,
    #         'properties': {
    #             'images': item.images,
    #             'datePublish': item.dataPublish
    #         }
    #     }
    #     new_mass.append(new_item)
    #
    # newPolygonJSON = {
    #     type: "FeatureCollection",
    #     'features': new_mass
    # }
    return await Polygons.get_polygons(session_maker=session)

if __name__ == "__main__":
    async def start():
        uvicorn.run(app, host="0.0.0.0", port=8000)
