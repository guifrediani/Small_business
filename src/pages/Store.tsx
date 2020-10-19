import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom'
import '../styles/pages/stores.css';

import Sidebar from '../components/Sidebar'
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

interface Store {
  Latitude : number;
  Longitude : number;
  name : string;
  about : string;
  instructions : string;
  opening_hours : string;
  open_on_weekends : string;
  images : Array<{
    id : number;
    url : string;
  }>;
};
interface StoreParams{
  id : string;
}

export default function Store() {
  const params = useParams<StoreParams>();
  const [store, setStore] = useState <Store>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
    

  useEffect(() => {
      api.get(`stores/${params.id}`).then(response => {
          setStore(response.data);
      });
  } , [params.id]);

  if (!store) {
    return <p>Carregando...</p>
  }
  return (
    <div id="page-store">
   <Sidebar />

      <main>
        <div className="store-details">
          <img src={store.images[activeImageIndex].url} alt={store.name} />

          <div className="images">
           {store.images.map((image, index) => {
             return (
              <button 
              key={image.id}
               className={activeImageIndex === index ? 'active' : ''}
                  type="button"
                onClick = {() => {
                  setActiveImageIndex(index)
                }}
                >
              <img src={image.url} alt={store.name} />
            </button>
             );
           })}
         
          </div>
          
          <div className="store-details-content">
            <h1>
              {store.name}
            </h1>
              <p>
                {store.about}
              </p>
             
            <div className="map-container">
              <Map 
                center={[store.Latitude, store.Longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={mapIcon} position={[store.Latitude, store.Longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${store.Latitude},${store.Longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
              <p>{store.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {store.opening_hours}
              </div>
             { store.open_on_weekends ? (
                <div className="open-on-weekends">
                <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                fim de semana
              </div>
             ) : (
              <div className="open-on-weekends dont-open">
              <FiInfo size={32} color="#FF669D" />
              Não Atendemos <br />
              fim de semana
            </div>
             )}
            </div>

           {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
             </button> */}
           </div>
        </div>
      </main>
    </div>
  );
}