import React, { Component } from 'react'
import Card from '../components/Card'
import FormGroup from '../components/FormGroup'

import { withRouter } from 'react-router-dom'
import UsuarioService from '../service/UsuarioService';
import { mensagemErro, mensagemSucesso } from '../components/Toastr';

class CadastroUsuario extends Component {

  state = {
    nome: "",
    email: "",
    senha: "",
    senhaRepeticao: ""
  }

  constructor(){
    super();
    this.service = new UsuarioService();
  }

  Cadastrar = () => {
    
    const { nome, email, senha, senhaRepeticao } = this.state
    const usuario = { nome, email, senha, senhaRepeticao }

    try {
      this.service.validar(usuario);
    } catch (erro) {
      const mensagens = erro.mensagens;
      mensagens.forEach(msg => mensagemErro(msg))
      return false;
    }

    this.service.salvar(usuario)
                .then(resp => {
                  mensagemSucesso("Usuário cadastrado com sucesso! Faça o login para acessar o sistema.")
                  this.props.history.push('/login')
                }).catch(err => {
                  mensagemErro(err.response.data)
                })
  }

  Cancelar = () => {
    this.props.history.push('/login')
  }



  render() {
    return (
        <Card title="Cadastro de Usuário">
          <div className="row">
            <div className="col-lg-12">
              <div className="bs-component">

                <FormGroup label="Nome: *" htmlFor="inputNome">
                  <input
                    type="text"
                    id="inputNome"
                    name="nome" 
                    className='form-control m-1'
                    onChange={e => this.setState({ nome: e.target.value }) }
                    placeholder="Digite seu nome..."
                    />
                </FormGroup>

                <FormGroup label="Email: *" htmlFor="inputEmail">
                  <input
                    type="text"
                    id="inputEmail"
                    name="email" 
                    className='form-control m-1'
                    onChange={e => this.setState({ email: e.target.value }) }
                    placeholder="Digite seu email..."
                    />
                </FormGroup>

                <FormGroup label="Senha: *" htmlFor="inputSenha">
                  <input
                    type="password"
                    id="inputSenha"
                    name="senha" 
                    className='form-control m-1'
                    onChange={e => this.setState({ senha: e.target.value }) }
                    placeholder="Digite sua senha..."
                    />
                </FormGroup>

                <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                  <input
                    type="password"
                    id="inputRepitaSenha"
                    name="senha" 
                    className='form-control m-1'
                    onChange={e => this.setState({ senhaRepeticao: e.target.value }) }
                    placeholder="Digite sua senha..."
                    />
                </FormGroup>
                <button onClick={this.Cadastrar} type="button" className="btn btn-outline-success m-2">
                <i className="pi pi-save mx-1" style={{'fontSize': '15px'}}></i>
                  Salvar</button>
                <button onClick={this.Cancelar}type="button" className="btn btn-outline-danger m-2">
                <i className="pi pi-times mx-1"></i>
                  Cancelar</button>
              </div>
            </div>
          </div>
        </Card>
    )
  }
}

export default withRouter(CadastroUsuario)
