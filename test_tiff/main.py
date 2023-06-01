import rasterio
from rasterio.plot import show


file_path = "output.tif"

# Откройте файл GeoTIFF
dataset = rasterio.open(file_path)


# Доступ к основной информации о наборе растровых данных
print("Ширина:", dataset.width)
print("Высота:", dataset.height)
print("Количество полос:", dataset.count)
print("Система отсчета координат (CRS):", dataset.crs)
print("Геотрансформация:", dataset.transform)


# Результат
# Ширина: 10800
# Высота: 5400
# Количество полос: 3
# Система отсчета координат (CRS): EPSG:4326
# Геотрансформация: | 0.03, 0.00,-180.00|
# | 0.00,-0.03, 90.00|
# | 0.00, 0.00, 1.00|

# Считывание растровых данных для первой полосы
band1 = dataset.read(1)

# В качестве альтернативы, вы можете прочитать все полосы сразу, используя:
# bands = dataset.read()


# Отображение растровых данных
show(band1)
