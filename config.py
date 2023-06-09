from dataclasses import dataclass
from environs import Env


@dataclass
class Ftp:
    host: str
    user: str
    password: str


@dataclass
class Config:
    ftp: Ftp


def load_config(path: str = None):
    env = Env()
    env.read_env(path)

    return Config(
        ftp=Ftp(
            host=env.str("FTP_HOST"),
            user=env.str("FTP_USER"),
            password=env.str("FTP_PASSWORD")
        )
    )