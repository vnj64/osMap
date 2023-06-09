import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MAP_ROUTE } from '../Routring/urls';
import './index.css';

const UploadImage =  () => {

    const navigate = useNavigate();

    const [file, setFile] = useState('');
    const [target, setTarget] = useState([]);
    const [isUpload, setIsUpload] = useState(false);


    const selectFile = (e) => {
        setFile(e.target.files[0]);
    }

    const viewGeo = () => {

        const formData = new FormData();
        formData.append('file', file);

        fetch('http://localhost:8000/upload/', {
            method: 'POST',
            body: formData,
        }).then(response => response.json()).then((data) => {
            console.log(data)
            setTarget(data);
            setIsUpload(true);
        })
    }

    const checkMap = () => {
        console.log(target[0], target[1]);
        navigate(MAP_ROUTE + `/${target[0]}/${target[1]}`)
    }

    return (
        <>
            <input type='file' onChange={selectFile} accept="image/tif" />
            {
                isUpload ? 
                <button disabled={!file} onClick={checkMap}>
                    Посмотреть
                </button>
                :
                <button disabled={!file} onClick={viewGeo}>
                    Отправить
                </button>
            }
        </>
    );
}

export default UploadImage;