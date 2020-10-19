import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Landing from './pages/Landing';
import storesMap from './pages/storesMap';
import Store from './pages/Store';
import CreateStore from './pages/createStore';

function Routes (){
    return(
      <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Landing}></Route>
            <Route path="/app" component={storesMap}></Route>
            <Route path="/stores/create" component={CreateStore}></Route>
            <Route path="/stores/:id" component={Store}></Route>
        </Switch>
      </BrowserRouter>
    );
}

export default Routes;