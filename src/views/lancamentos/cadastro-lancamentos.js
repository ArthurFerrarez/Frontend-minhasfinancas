import React,{ Component } from 'react'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'

import { withRouter } from 'react-router-dom'
import * as toastr from '../../components/toastr'

import LancamentoService from '../../app/service/lancamentoService'
import LocalStorageService from '../../app/service/localstorageService'

class CadastroLancamentos extends Component {


    constructor(){
      super();
      this.service = new LancamentoService();
    }
  
    state = {
      id: null,
      descricao: '',
      valor: '',
      mes: '',
      ano:'',
      tipo: '',
      status: '',
      usuario: null,
      atualizando: false
    }
  
    handleChange = (event) => {
      const value = event.target.value;
      const name = event.target.name;
  
      this.setState({ [name]: value });
    }
  
  
    componentDidMount(){
      const params = this.props.match.params
      if(params.id){
        this.service.obterPorId(params.id)
                    .then(resp => {
                      this.setState( {...resp.data, atualizando: true} )
                    }).catch(err => {
                      toastr.mensagemErro(err.response.data)
                    })
      }
    }
  
  
    submit = () => {
      const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
  
      const { descricao, valor, mes, tipo, ano  } = this.state;
      const lancamento = {descricao, ano, valor, mes, tipo, usuario: usuarioLogado.id}
  
      try {
        this.service.validar(lancamento)
      } catch (erro) {
        const mensagens = erro.mensagens;
        mensagens.forEach(msg => toastr.mensagemErro(msg))
        return false;
      }
  
      this.service.salvar(lancamento)
                  .then(resp => {
                    this.props.history.push('/consulta-lancamentos')
                    toastr.mensagemSucesso("Lançamento cadastrado com sucesso!")
                  }).catch(err => {
                    toastr.mensagemErro(err.response.data)
                  })
    }
  
    atualizar = () => {
      const { descricao, valor, mes, tipo, ano, usuario, id, status  } = this.state;
      const lancamento = {descricao, ano, valor, mes, tipo, usuario, id, status}
  
      this.service.atualizar(lancamento)
                  .then(resp => {
                    this.props.history.push('/consulta-lancamentos')
                    toastr.mensagemSucesso("Lançamento atualizado com sucesso!")
                  }).catch(err => {
                    toastr.mensagemErro(err.response.data)
                  })
    }
  
  
    render() {
  
      const tipos = this.service.obterListaTipos();
      const meses = this.service.obterListaMeses();
  
      return (
        <Card title={this.state.atualizando ? 'Atualização de Lançamento' : 'Cadastro de Lançamento'}>
          <div className="row">
            <div className="col-md-12">
              <FormGroup id="inputDecricao" label="Descrição: *">
                <input
                  id="inputDecricao"
                  type="text"
                  name='descricao'
                  value={this.state.descricao}
                  onChange={this.handleChange}
                  className='form-control m-1'
                  placeholder='Informe a decrição...'
                  />
              </FormGroup>
            </div>
          </div>
  
          <div className="row">
            <div className="col-md-6">
              <FormGroup label="Ano: *" id="inputAno">
                <input
                  id="inputAno"
                  type="text"
                  value={this.state.ano}
                  name="ano"
                  onChange={this.handleChange}
                  className="form-control m-1"
                  placeholder="Digite o Ano..." 
                  />
              </FormGroup>
            </div>
  
            <div className="col-md-6">
                <FormGroup label="Mês: *" id="inputMes">
                  <SelectMenu
                    lista={meses}
                    className="form-control m-1" 
                    name="mes"
                    value={this.state.mes}
                    onChange={this.handleChange}
                  />
                </FormGroup>
            </div>
          </div>
  
          <div className="row">
            <div className="col-md-4">
                <FormGroup label="Valor: *" id="inputValor">
                  <input
                    id="inputValor"
                    type="text"
                    name="valor"
                    value={this.state.valor}
                    onChange={this.handleChange}
                    className="form-control m-1"
                    placeholder="Informe o Valor..." 
                    />
                </FormGroup>
            </div>
  
            <div className="col-md-4">
            <FormGroup label="Tipos: *" id="inputMes">
                  <SelectMenu
                    lista={tipos}
                    className="form-control m-1" 
                    name="tipo"
                    value={this.state.tipo}
                    onChange={this.handleChange}  
                />
                </FormGroup>
            </div>
  
            <div className="col-md-4">
                <FormGroup label="Status: " id="inputStatus">
                  <input
                    type="text"
                    id="inputStatus"
                    className="form-control"
                    disabled 
                    name="status"
                    value={this.state.status}
                    />
                </FormGroup>
            </div>
  
          </div>
  
  
            <div className="row">
              <div className="col-md-6">
                { this.state.atualizando ? 
                  (
                    <button onClick={this.atualizar} type="button" className="btn btn-outline-warning m-2">
                      <i className="pi pi-refresh mx-1"></i>
                      Atualizar
                    </button>
                  ) : 
                  (
                    <button type="button"
                        className="btn btn-outline-success m-2"
                        onClick={this.submit} >
                        <i className="pi pi-save mx-1" style={{'fontSize': '13px'}}></i>
                        Salvar
                    </button>
                  )
                }
  
                  <button onClick={e => this.props.history.push('/consulta-lancamentos')} type="button" className="btn btn-outline-danger m-2">
                  <i className="pi pi-times mx-1"></i>
                    Cancelar
                  </button>
              </div>
            </div>
        </Card>
      )
    }
  }
  
  export default withRouter(CadastroLancamentos);