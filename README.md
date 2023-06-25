<h1 align="center">.tiff viewer</h1>

<p align="center"><img src="./readme_assets/PIC2.png"></p>

## Description.
Project implemented on React and Python with using [fastAPI](https://fastapi.tiangolo.com/) framework. The user uploads .tiff
image and by its result can see the correct binding of its image to the map. Coordinates are attached to the picture and
its owner can view the polygon in the area where the picture was taken.

## How to use?
It's as simple as that. Click the upload image button, and admire our creation.

## About the project.
- .tiff viewer implemented with [React.js](https://react.dev/) and [OpenLayers](https://openlayers.org/) library on Front-end.
- On the backend we used [Python 3.8](https://www.python.org/), [fastAPI](https://fastapi.tiangolo.com/) framework, [SQLAlchemy](https://www.sqlalchemy.org/).

## Contributors.
- [vnJ64](https://github.com/vnj64)
- [Limonadek](https://github.com/Limonadek)
- [GitAlexandr](https://github.com/GitAlexandr)
- [gavrushhha](https://github.com/gavrushhha)

## Project setup.
```
# Clone repository.
git clone git@github.com:vnj64/osMap.git

# Move to the root.
cd osMap/

# Create .env file (template in root)
nano .env

Backend(root path):

# Give access to .sh scripts (run from project root).
cd scripts && chmod a+x pre_start.sh start.sh

# Run pre_start.sh (DONT CLOSE BEFORE start.sh).
./pre_start.sh

# Run start.sh (in other cmd).
./start.sh

# Check for errors in the logs if this doesn't work via.
docker-compose logs -f

Frontend(path: /frontend/osmap):
# There should be the following versions
Node - v16.17.0
npm - v8.15.0
npx - v8.15.0

# Install packages
npm install

# Start the project
npm run start
```

## Issues.
 If you find any error, please write to [issue](https://github.com/vnj64/osMap/issues). Thank you!