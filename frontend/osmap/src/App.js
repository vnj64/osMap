import { useState } from 'react';
import './App.css';
import MapWrapper from './components/MapWrapper'

const App = () => {

  const [file, setFile] = useState('');

  const [coorMarker, setCoorMarker] = useState(null);
  const [coorPolygon, setCoorPolygon] = useState(null);


  const selectFile = (e) => {
    console.log(e.target.files[0])
    setFile(e.target.files[0]);
  }

  const viewGeo = () => {
    fetch('http://localhost:8000/upload/', {
      method: 'POST',
      body: file,
      headers: {
        'Access-Control-Allow-Origin': 'no-cors',
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
      },
    }).then(response => response.json()).then((data) => {
      console.log(data);
    })
  }
  console.log(coorMarker !== null)
  
  return (
    <div className="App">

      <input type='file' onChange={selectFile} accept="image/tif" />
      <button disabled={!file} onClick={viewGeo}>Отправить</button>
      
      {
        (coorMarker !== null) && <MapWrapper coorMarker={coorMarker} coorPolygon={coorPolygon} />
      }
    </div>
  )
}

export default App;