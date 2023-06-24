mass = [
  [
    {
      "Polygons": {
        "name": "ef8b6f1a-e013-4c30-b72b-c68d78981a9c",
        "full_coordinates": [
          [
            [
              -78.150789,
              38.066723
            ],
            [
              -78.138062,
              37.768061
            ],
            [
              -77.733504,
              37.778149
            ],
            [
              -77.744596,
              38.07692
            ],
            [
              -78.150789,
              38.066723
            ]
          ]
        ],
        "images": "path_to_dir",
        "id": 1,
        "datePublish": "2023-06-24"
      }
    }
  ]
]


def ast():
    new_mass = []
    for lst in mass:
        for item in lst:
            new_item = {
                'type': "Feature",
                'geometry': {
                    'type': "Polygon",
                    'coordinates': item['Polygons']['full_coordinates']

                },
                'id': item['Polygons']['id'],
                'properties': {
                    'images': item['Polygons']['images'],
                    'datePublish': item['Polygons']['datePublish']
                }
            }
            new_mass.append(new_item)

    newPolygonJSON = {
        'type': "FeatureCollection",
        'features': new_mass
    }

    return newPolygonJSON


print(ast())


