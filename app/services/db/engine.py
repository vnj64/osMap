from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

from app.services.db.dbase import Base
from config import Config


async def create_db_session(cfg: Config):
    engine = create_async_engine(
        url=cfg.db.db_dsn,
    )

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async_session = sessionmaker(
        engine, expire_on_commit=True, class_=AsyncSession,
    )

    return async_session
