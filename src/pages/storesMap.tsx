import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup} from 'react-leaflet'

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/stores-map.css';
import api from '../services/api';
import mapIcon from '../utils/mapIcon';


interface Store {
    id: number;
    Latitude : number;
    Longitude : number;
    name : string;
};

function StoresMap() {
    const [stores, setStores] = useState <Store[]>([]);
    

    useEffect(() => {
        api.get('stores').then(response => {
            setStores(response.data);
        });
    } , []);

    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src = {mapMarkerImg} alt="Local Business" />
                    <h2>Escolha um comércio no mapa</h2>
                    <p>Sua próxima compra te espera :)</p>
                </header>

                <footer>
                    <strong>Valinhos</strong>
                    <span>São Paulo</span>
                </footer>
            </aside>
            
           <Map

            center = {[-22.971557,-46.9767363]}
            zoom = {15}
            style = {{ width : '100%' , height: '100%'}}
            >
              
             <TileLayer 
             url = {`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
             />
        
             {stores.map(store => {
                 return(
                    <Marker 
                    key={store.id}
                   icon={mapIcon}
                    position={[store.Latitude, store.Longitude]}
                       >
                           <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                               {store.name}
                               <Link to={`/stores/${store.id}`}>
                                   <FiArrowRight size = {20} color = "#FFF" />
                               </Link>
                
                           </Popup>
                       </Marker>
                 )
             })};
             </Map>

            <Link to = "stores/create" className="create-store">
                <FiPlus size={32} color="#fff" />
            </Link>
        </div>
    );
}

export default StoresMap; 