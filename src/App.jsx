import { Component } from 'react';
import Rotas from './Rotas';
import NavBar from './components/NavBar';

import 'bootswatch/dist/flatly/bootstrap.css';
import './custom.css';
import 'toastr/build/toastr.css';
import 'toastr/build/toastr.min.js';
import 'primeicons/primeicons.css';
import ProvedorAutentificacao from './ProvedorAutentificacao';


class App extends Component{

  render(){

    return (
      <>
      <ProvedorAutentificacao>
          <NavBar/>
          <div className="container">
            <Rotas/>
          </div>
      </ProvedorAutentificacao>
      </>
    );
  }
}

export default App;
