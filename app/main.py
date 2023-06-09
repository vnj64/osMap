import uuid
from PIL import Image
from io import BytesIO
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from app.utils.scripts.converter import converter
from app.utils.scripts.functions import download


app = FastAPI(title="FastAPI, Docker, and Traefik")

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
                'type': 'Polygon',
                'coordinates': [
                    [
                        [-78.150789, 38.066723],
                        [-78.138062, 37.768061],
                        [-77.733504, 37.778149],
                        [-77.744596, 38.07692],
                        [-78.150789, 38.066723]
                    ]
                ]
            },
            {
                'type': 'Polygon',
                'coordinates': [
                    [
                        [-80.150789, 40.066723],
                        [-80.138062, 39.768061],
                        [-79.733504, 39.778149],
                        [-79.744596, 40.07692],
                        [-80.150789, 40.066723]
                    ]
                ]
            }
        ],
    }
}


@app.post("/upload/")
async def create_upload_file(file: UploadFile = File(...)):
    name = uuid.uuid4()
    file.filename = f"{name}.tif"
    contents = await file.read()

    with open(f"{IMAGEDIR}{file.filename}", "wb") as f:
        f.write(contents)
    # will be redacted soon
    # tiff_to_png_convert
    res_img = Image.open(BytesIO(contents))
    download(res_img)
    result = converter(name)
    return result


@app.get('/polygons')
async def get_markers_coords():
    return tmp
