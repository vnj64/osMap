import uuid
from PIL import Image
from io import BytesIO
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from app.utils.scripts.converter import converter
from app.utils.scripts.functions import download

app = FastAPI()

IMAGEDIR = "app/images/"

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
    result, geojson_path, full_coordinates = converter(name)

    res_img = Image.open(BytesIO(contents))
    download(res_img)

    now = datetime.now()
    time_upload = now.strftime("%d:%m:%Y-%H:%M")

    dataPublish = time_upload
    images = geojson_path
    id = name
    full_coordinates = full_coordinates

    # отправка в бд

    return result


@app.get('/polygons')
async def get_markers_coords():
    # получение из бд
    mass = [{'id': id, 'images': images, 'full_coordinates': full_coordinates, 'dataPublish': dataPublish}]
    new_mass = []

    for item in mass:
        new_item = {
            type: "Feature",
            'geometry': {
                type: "Polygon",
                'coordinates': item.full_coordinates

            },
            id: item.id,
            'properties': {
                'images': item.images,
                'datePublish': item.dataPublish
            }
        }
        new_mass.append(new_item)

    newPolygonJSON = {
        type: "FeatureCollection",
        'features': new_mass
    }

    return newPolygonJSON
