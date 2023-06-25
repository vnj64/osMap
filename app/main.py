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


@app.post("/api/upload/")
async def create_upload_file(file: UploadFile = File(...)):
    session = await create_db_session(cfg=config)
    name = uuid.uuid4()
    try:
        file.filename = f"{name}.tif"
        contents = await file.read()

        with open(f"{IMAGEDIR}{file.filename}", "wb") as f:
            f.write(contents)

        result, geojson_path, full_coordinates = converter(name)

        now = datetime.now()
        await Polygons.insert_polygons(session_maker=session, name=str(name), images="path_to_dir",
                                       full_coordinates=full_coordinates, date_publish=now)

        return result
    except Exception as e:
        print(e)
        return "Кажется данное изображение не имеет геоданных, либо вы его уже использовали!."


@app.get('/api/polygons')
async def get_markers_coords():
    session = await create_db_session(cfg=config)
    new_mass = []
    try:
        mass = [await Polygons.get_polygons(session_maker=session)]
    except Exception:
        return "Возникли проблемы на сервер, попробуйте позже."
    if len(mass) == 0:
        return "Изображений нет"
    else:
        for lst in mass:
            for item in lst:
                polygon = item.Polygons
                new_item = {
                    'type': "Feature",
                    'geometry': {
                        'type': "Polygon",
                        'coordinates': polygon.full_coordinates

                    },
                    'id': polygon.id,
                    'properties': {
                        'name': polygon.name,
                        'images': polygon.images,
                        'datePublish': polygon.datePublish
                    }
                }
                new_mass.append(new_item)

        newPolygonJSON = {
            'type': "FeatureCollection",
            'features': new_mass
        }
        return newPolygonJSON


if __name__ == "__main__":
    async def start():
        uvicorn.run(app, host="127.0.0.1", port=8000)
