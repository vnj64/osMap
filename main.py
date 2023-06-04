import uuid

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from converter import converter

app = FastAPI()

IMAGEDIR = "images/"

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

tmp = {
    'type': 'Feature',
    'geometry': {
        'type': 'GeometryCollection',
        'geometries': [
            {
                'type': 'Point',
                'coordinates': [
                    39.9812299,
                    43.402636
                ],
            },
            {
                'type': 'Point',
                'coordinates': [
                    39.9787455,
                    43.4028267
                ]
            }
        ],
    }
}


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


@app.get('/markers')
async def get_markers_coords():
    return tmp
