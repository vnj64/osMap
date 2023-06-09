CREATE TABLE images (
  id UUID PRIMARY KEY,
  dataPublish VARCHAR(255),
  images TEXT,
  full_coordinates FLOAT[],
  name VARCHAR(255),
  result FLOAT[]
);