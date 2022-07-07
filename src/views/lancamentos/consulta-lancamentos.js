import React from "react";
import { withRouter } from "react-router-dom";

import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import LancamentosTable from "./lancamentosTable";
import LancamentoService from "../../app/service/lancamentoService";
import LocalStorageService from "../../app/service/localstorageService";

import * as messages from "../../components/toastr";
import Swal from "sweetalert2";

class ConsultaLancamentos extends React.Component {
  state = {
    ano: "",
    mes: "",
    tipo: "",
    descricao: "",
    lancamentoDeletar: {},
    lancamentos: [],
  };

  constructor() {
    super();
    this.service = new LancamentoService();
  }

  buscar = () => {
    if (!this.state.ano) {
      messages.mensagemErro("O preenchimento do campo Ano é obrigatório.");
      return false;
    }

    const usuarioLogado = LocalStorageService.obterItem("_usuario_logado");

    const lancamentoFiltro = {
      ano: this.state.ano,
      mes: this.state.mes,
      tipo: this.state.tipo,
      descricao: this.state.descricao,
      usuario: usuarioLogado.id,
    };

    this.service
      .consultar(lancamentoFiltro)
      .then((resposta) => {
        const lista = resposta.data;

        if (lista.length < 1) {
          messages.mensagemAlert("Nenhum resultado encontrado.");
        }
        this.setState({ lancamentos: lista });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  editar = (id) => {
    this.props.history.push(`/cadastro-lancamentos/${id}`);
  };

  abrirConfirmacao = (lancamento) => {
    this.setState({ showConfirmDialog: true, lancamentoDeletar: lancamento });
  };

  cancelarDelecao = () => {
    this.setState({ showConfirmDialog: false, lancamentoDeletar: {} });
  };

  deletar = (lancamento) => {
    Swal.fire({
      title: "Tem certeza que quer deletar o lançamento?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.service
          .deletar(lancamento.id)
          .then((resp) => {
            Swal.fire(
              "Lançamento deletado com sucesso!",
              "",
              "success"
            );
            const lancamentos = this.state.lancamentos;
            const index = lancamentos.indexOf(lancamento);
            lancamentos.splice(index, 1);
            this.setState(lancamentos);
          });
      }
    });
  };

  preparaFormularioCadastro = () => {
    this.props.history.push("/cadastro-lancamentos");
  };

  alterarStatus = (lancamento, status) => {
    this.service.alterarStatus(lancamento.id, status).then((response) => {
      const lancamentos = this.state.lancamentos;
      const index = lancamentos.indexOf(lancamento);
      if (index !== -1) {
        lancamento["status"] = status;
        lancamentos[index] = lancamento;
        this.setState({ lancamento });
      }
      messages.mensagemSucesso("Status atualizado com sucesso!");
    });
  };

  render() {
    const meses = this.service.obterListaMeses();

    const tipos = this.service.obterListaTipos();

    return (
      <Card title="Consulta Lançamentos">
        <div className="row">
          <div className="col-md-6">
              <FormGroup label="Ano: *" htmlFor="inputAno">
                <input
                  type="text"
                  className="form-control m-1"
                  id="inputAno"
                  value={this.state.ano}
                  onChange={(e) => this.setState({ ano: e.target.value })}
                  placeholder="Digite o Ano..."
                />
            <FormGroup label="Descrição: *" htmlFor="inputDescricao">
              <input
                type="text"
                className="form-control m-1"
                id="inputDescricao"
                value={this.state.descricao}
                onChange={(e) => this.setState({ descricao: e.target.value })}
                placeholder="Digite a descrição..."
              />
            </FormGroup>
            </FormGroup>
            <FormGroup label="Mês: *" htmlFor="inputMes">
              <SelectMenu
                lista={meses}
                className="form-control m-1"
                id="inputMes"
                value={this.state.mes}
                onChange={(e) => this.setState({ mes: e.target.value })}
              />
            </FormGroup>

            <FormGroup label="Tipo: *" htmlFor="inputTipo">
              <SelectMenu
                lista={tipos}
                className="form-control m-1"
                id="inputTipo"
                value={this.state.tipo}
                onChange={(e) => this.setState({ tipo: e.target.value })}
              />
            </FormGroup>

            <button
              onClick={this.buscar}
              type="button"
              className="btn btn-outline-success m-2"
            >
              <i className="pi pi-search mx-1" style={{'fontSize': '13px'}}></i>
              Buscar
            </button>
            <button  onClick={this.preparaFormularioCadastro} type="button" className="btn btn-outline-info m-2">
              <i className="fa fa-plus mx-1"></i>
              Cadastrar
            </button>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-12">
            <div className="bs-component">
              <LancamentosTable
                lancamentos={this.state.lancamentos}
                deleteAction={this.deletar}
                editAction={this.editar}
                alterarStatus={this.alterarStatus}
              />
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default withRouter(ConsultaLancamentos);
