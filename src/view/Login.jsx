import { Component } from "react";
import Card from "../components/Card";
import FormGroup from "../components/FormGroup";

class Login extends Component {

  state = {
    email: "",
    senha: ""
  }

  Entrar = () => {
    console.log('Email: ', this.state.email)
    console.log('Senha: ', this.state.senha)
  }

  render(){

    return(
        <div className="container">
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
                          <button onClick={this.Entrar} className="btn btn-success m-2">Entrar</button>
                          <button className="btn btn-danger m-2">Cadastrar</button>
                        </fieldset>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default Login;