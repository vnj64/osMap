FROM python:3.11.1-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

ENV CPLUS_INCLUDE_PATH=/opt/homebrew/opt/gdal/include
ENV C_INCLUDE_PATH=/opt/homebrew/opt/gdal/include

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
