#!/bin/bash


cd ../ && cd app/

mkdir images && mkdir geojsons

cd ../ && uvicorn app.main:app --reload