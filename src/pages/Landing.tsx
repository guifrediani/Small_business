import React from 'react';

import '../styles/pages/landing.css';

import logoimg from '../images/Logo.svg';

import { FiArrowRight } from 'react-icons/fi';

import { Link } from 'react-router-dom';

function Landing (){
    return(
        <div id="page-landing">
      <div className="content-wrapper"> 
          <img src = {logoimg} alt=""/>

          <main>
            <h1>Conectando compradores e comércios locais</h1>
            <p>Conheça mais sobre sua vizinhança!</p>
          </main>

          <div className="location">
            <strong>Valinhos</strong>
            <span>São Paulo</span>
          </div>

          <Link to="/app" className='enter-app'>
            <FiArrowRight size= {26} color="rgba(0,0,0,0.6"></FiArrowRight>
          </Link>
      </div>
    </div>
    );
}

export default Landing;