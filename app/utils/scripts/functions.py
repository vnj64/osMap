from ftplib import FTP
from config import load_config


config = load_config('.env')
host = config.ftp.host
ftp_user = config.ftp.user
ftp_password = config.ftp.password

ftp = FTP(host)
ftp.login(ftp_user, ftp_password)


def download(filename):
    ftp.cwd('/tiff_images')
    server_filename = 'tif_image'
    with open(filename, 'rb') as file:
        ftp.storbinary(f'STOR {server_filename}', file)
    ftp.quit()


def get_from_ftp(filename):
    ftp.cwd('/tiff_images')
    my_file = open(filename, 'wb')
    ftp.retrbinary('RETR ' + filename, my_file.write, 1024)
    ftp.quit()
    my_file.close()
