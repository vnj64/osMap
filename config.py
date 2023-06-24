from dataclasses import dataclass
from environs import Env


@dataclass
class Ftp:
    host: str
    user: str
    password: str


@dataclass
class Db:
    db_dsn: str


@dataclass
class Config:
    ftp: Ftp
    db: Db


def load_config(path: str = None):
    env = Env()
    env.read_env(path)

    return Config(
        ftp=Ftp(
            host=env.str("FTP_HOST"),
            user=env.str("FTP_USER"),
            password=env.str("FTP_PASSWORD")
        ),
        db=Db(
            db_dsn=env.str("DATABASE_URL")
        )
    )