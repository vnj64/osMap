import folium

# Создание объекта карты
m = folium.Map(location=[51.5074, -0.1278], zoom_start=10)

# Добавление слоя OSM TileLayer
folium.TileLayer('https://{s}.tile.openstreetmap.org/17/43.40109/39.97984.png', name='OpenStreetMap',
                 attr="<a href=https://endless-sky.github.io/>Endless Sky</a>").add_to(m)

# Добавление маркера на карту
folium.Marker([51.5074, -0.1337], popup='London').add_to(m)

# Сохранение карты в HTML файл
m.save('templates/map.html')
