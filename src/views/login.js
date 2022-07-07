import React,{Component} from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'

import UsuarioService from '../app/service/usuarioService'
import LocalStorageService from '../app/service/localstorageService'
import { mensagemErro } from '../components/toastr'
import { AuthContext  } from '../main/provedorAutenticacao'

class Login extends Component{

    state = {
        email: '',
        senha: ''
    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }

    entrar = () => {
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then( response => {
            // Assim q colocar pegar os dados do usuario e armzenar em algum lugar, nesse caso no localStorage
      // localStorage.setItem('_usuario_logado', JSON.stringify(resp.data))
            this.context.iniciarSessao(response.data)
            this.props.history.push('/home')
        }).catch( erro => {
           mensagemErro(erro.response.data)
        })
    }

    prepareCadastrar = () => {
        // Esse history vem do withRouter do react-router-dom
        this.props.history.push('/cadastro-usuarios')
    }

    render(){

        return(
              <div className="row">
                <div className="col-md-6" style={{position: 'relative', left:'300px'}}>
                  <div className="bs-docs-section">
                    <Card title="Login">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="bs-component">
                            <fieldset>
                              <FormGroup label="Email: *" htmlFor="exampleInputEmail">
                              <input
                                  value={this.state.email}
                                  onChange={e => this.setState({email: e.target.value})}
                                  type="email"
                                  className="form-control m-1"
                                  id="exampleInputEmail"
                                  aria-describedby="emailHelp"
                                  placeholder="Digite o Email..."
                                />
                              </FormGroup>
    
                              <FormGroup label="Senha: *" htmlFor="">
                              <input
                                  value={this.state.senha}
                                  onChange={e => this.setState({senha: e.target.value})}
                                  type="password"
                                  className="form-control m-1"
                                  id="exampleInputPassword"
                                  aria-describedby="emailHelp"
                                  placeholder="Digite sua Senha..."
                                />
                              </FormGroup>
                              <button onClick={this.entrar} className="btn btn-outline-success m-2">
                              <i className="pi pi-sign-in mx-1"></i>
                                Entrar</button>
    
                              <button onClick={this.prepareCadastrar} className="btn btn-outline-info m-2">
                                <i className="pi pi-plus mx-1"></i>
                                Cadastrar</button>
                            </fieldset>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
        )
      }
    }

Login.contextType = AuthContext

export default withRouter( Login )