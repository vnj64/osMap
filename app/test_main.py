import pytest
from fastapi.testclient import TestClient
from .main import app

client = TestClient(app)


def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"msg": "Hello World"}


def test_read_create_upload_file():
    response = client.get("/api/upload/")
    assert response.status_code == 200


def test_read_get_markers_coords():
    response = client.get("/api/polygons/")
    assert response.status_code == 200
