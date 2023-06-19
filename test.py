# import rasterio
# import rasterio.features
# import rasterio.warp
# import json
# import os
#
#
# def converter(name):
#     with rasterio.open(f"app/images/{name}") as dataset:
#         mask = dataset.dataset_mask()
#         for geom, val in rasterio.features.shapes(mask, transform=dataset.transform):
#             try:
#                 geom = rasterio.warp.transform_geom(dataset.crs, "EPSG:4326", geom, precision=6)
#                 geojson_path = f"app/geojsons/{name}.geojson"
#                 with open(geojson_path, "w") as f:
#                     f.write(json.dumps(geom))
#                 coordinates = geom['coordinates']
#                 return coordinates[0][0], os.path.abspath(geojson_path), coordinates
#             except rasterio.errors.CRSError as e:
#                 print(f"{name}: Error: Invalid CRS -", e)
#
#
# print(converter('f2fcc1de-5815-4c20-95bf-0f71f3ff769d.tif'))
import ftplib
from ftplib import FTP
from io import BytesIO

from PIL import Image
import cv2 as cv
import io

from config import load_config

config = load_config('.env')
host = config.ftp.host
ftp_user = config.ftp.user
ftp_password = config.ftp.password

ftp = FTP(host)
ftp.login(ftp_user, ftp_password)


def download(filename):
    ftp.cwd('/tiff_images')
    server_filename = 'tif_image'
    with open(filename, 'rb') as file:
        ftp.storbinary(f'STOR {server_filename}', file)
    ftp.quit()


def get_from_ftp(filename):
    ftp.cwd('/tiff_images')
    my_file = open(filename, 'wb')
    ftp.retrbinary('RETR ' + filename, my_file.write, 1024)
    ftp.quit()
    my_file.close()
