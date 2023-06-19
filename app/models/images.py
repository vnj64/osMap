from datetime import datetime

from sqlalchemy import Column, String, DATE, select, insert, Integer, JSON
from sqlalchemy.orm import sessionmaker

from app.services.db.dbase import Base


class Polygons(Base):
    __tablename__ = "polygons"

    id = Column(Integer, unique=True, primary_key=True)
    name = Column(String, unique=True)
    images = Column(String)
    full_coordinates = Column(JSON)
    datePublish = Column(DATE)

    @classmethod
    async def get_polygons(cls, session_maker: sessionmaker):
        async with session_maker() as session:
            sql = select(cls)
            result = await session.execute(sql)
            return result.all()

    @classmethod
    async def insert_polygons(cls,
                              session_maker: sessionmaker,
                              name: str,
                              images: str,
                              full_coordinates: dict,
                              date_publish: datetime):
        async with session_maker() as session:
            sql = insert(cls).values(
                name=name,
                images=images,
                full_coordinates=full_coordinates,
                datePublish=date_publish,
            )
            await session.execute(sql)
            await session.commit()
