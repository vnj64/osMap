import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MAP_ROUTE } from '../Routring/urls';
import './index.css';

const UploadImage =  () => {

    const navigate = useNavigate();

    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('');
    const [target, setTarget] = useState([]);
    const [isUpload, setIsUpload] = useState(false);


    const selectFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }

    const viewGeo = () => {

        const formData = new FormData();
        formData.append('file', file);

        fetch('http://localhost:8000/upload/', {
            method: 'POST',
            body: formData,
        }).then(response => response.json()).then((data) => {
            setTarget(data);
            setIsUpload(true);
        })
    }

    const checkMap = () => {
        navigate(MAP_ROUTE + `/${target[0]}/${target[1]}`)
    }

    return (
        <>
            <input required className="inputfile" id="file" type="file" onChange={selectFile} accept="image/tif" />
            <label htmlFor="file"><span className='text text--inputfile'>{fileName ? `${fileName}` : 'Выберите файл'}</span></label>
            {
                isUpload ? 
                <button className="button text" disabled={!file} onClick={checkMap}>
                    Посмотреть
                </button>
                :
                <button className="button text" disabled={!file} onClick={viewGeo}>
                    Отправить
                </button>
            }
        </>
    );
}

export default UploadImage;