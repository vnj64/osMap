import rasterio
import rasterio.features
import rasterio.warp
import json

for i in range(1, 19):
    with rasterio.open(f'tefal/{i}.tif') as dataset:
        mask = dataset.dataset_mask()

        for geom, val in rasterio.features.shapes(mask, transform=dataset.transform):
            try:
                geom = rasterio.warp.transform_geom(dataset.crs, 'EPSG:4326', geom, precision=6)
                with open(f'{i}.geojson', 'w') as f:
                    f.write(json.dumps(geom))  
                print(f'{i}:{geom}')
            except rasterio.errors.CRSError as e:
                print(f"{i}: Error: Invalid CRS -", e)
