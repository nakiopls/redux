import React from 'react';
import Header from './component/Header'
import Productos from './component/Productos'
import NuevoProducto from './component/NuevoProducto'
import EditarProducto from './component/EditarProducto'

import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

//REDUX
import { Provider } from 'react-redux';
import store from './store';


function App() {
  return (
    <Router>
      <Provider store={store}>
        <Header/>
          <div className="container mt-5">
            <Switch>
              <Route exact path="/" component={Productos}/>
              <Route exact path="/producto/nuevo" component={NuevoProducto}/>
              <Route exact path="/producto/editar/:id" component={EditarProducto}/>
            </Switch>
          </div>
      </Provider>
    </Router>

  );
}

export default App;
