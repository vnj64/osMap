import rasterio
import rasterio.features
import rasterio.warp
import json


def converter(name):
    with rasterio.open(f"app/images/{name}.tif") as dataset:
        mask = dataset.dataset_mask()
        for geom, val in rasterio.features.shapes(mask, transform=dataset.transform):
            try:
                geom = rasterio.warp.transform_geom(dataset.crs, "EPSG:4326", geom, precision=6)
                with open(f"app/geojsons/{name}.geojson", "w") as f:
                    f.write(json.dumps(geom))
                coordinates = geom['coordinates']
                return coordinates[0][0]
            except rasterio.errors.CRSError as e:
                print(f"{name}: Error: Invalid CRS -", e)
