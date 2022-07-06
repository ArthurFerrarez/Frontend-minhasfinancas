import React, { Component } from 'react'
import axios from 'axios';
import UsuarioService from '../service/UsuarioService';

import currencyFormatter from 'currency-formatter';
import { AuthContext } from '../ProvedorAutentificacao';
import LocalStorageService from '../service/LocalStorageService';

class Home extends Component {

  state = {
    saldo: 0
  }

  constructor(){
    super();
    this.UsuarioService = new UsuarioService();
  }

  // Para recupera os dados do usuario logado, já implementamos o localStorage no login
  // Lá tive q transformar em String, aq tenho q fazer o contrario
  // const usuarioLogadoString = localStorage.getItem('_usuario_logado')
  // const usuarioLogado = JSON.parse(usuarioLogadoString) 
  componentDidMount(){
    const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
    this.UsuarioService.obterSaldoPorUsuario(usuarioLogado.id)
                        .then(resp => {
                          this.setState({saldo: resp.data});
                        }).catch(err => {
                          console.error(err.response);
                        })
  }

  render() {
    return (
      <div className="p-4 bg-primary text-white rounded">
        <h1 className="display-3">Bem vindo!</h1>
        <p className="lead">Esse é seu sistema de finanças.</p>
        <p className="lead">Seu saldo para o mês atual é de
        <span style={{color: this.state.saldo >= 0 ? 'green' : 'red'}}>
        {currencyFormatter.format(this.state.saldo ,{ locale:'pt-BR' })}</span></p>

        <hr className="my-4" />

        <p>E essa é sua área administrativa, utilize um 
          dos menus ou botões para navegar pelo sistema.
        </p>
        <p className="lead">
          <a href="/cadastro-usuario" className="btn btn-info btn-lg m-2"
            role="button">
            <i className="fa fa-users"></i> Cadastrar Usuário
          </a>
          <a href="/cadastro-lancamentos" className="btn btn-danger btn-lg m-2" 
          role="button">
            <i className="fa fa-money-bill "></i> Cadastrar Lançamento
          </a>
        </p>
      </div>
    )
  }
}

// Home.contextType = AuthContext;
export default Home;