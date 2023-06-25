#!/bin/bash


cd ../ && python3 -m venv venv

source venv/bin/activate

pip install -r requirements.txt

docker-compose build
docker-compose up db