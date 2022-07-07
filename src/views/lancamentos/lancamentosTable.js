import React from 'react'
import currencyFormatter from 'currency-formatter'

export default function LancamentosTable(props) {
  
    const rows = props.lancamentos.map( (lancamento, key) => {
      return (
        <tr key={key}>
          <td>{lancamento.descricao}</td>
          <td>{currencyFormatter.format(lancamento.valor, { locale:'pt-BR' }) }</td>
          <td>{lancamento.tipo}</td>
          <td>{lancamento.mes}</td>
          <td>{lancamento.status}</td>
          <td>
              <button
                className='btn btn-outline-success mx-2' title='Efetivar'
                disabled={lancamento.status !== 'PENDENTE'}
                onClick={e => props.alterarStatus(lancamento, 'EFETIVADO')}
                type='button'
                >
                  <i className="fa fa-check"></i></button>
  
              <button
                className='btn btn-outline-warning mx-2' title='Cancelar'
                disabled={lancamento.status !== 'PENDENTE'}
                onClick={e => props.alterarStatus(lancamento, 'CANCELADO')}
                type='button'
                >
                  <i className="pi pi-times"></i></button>
  
              <button
                className='btn btn-outline-info mx-2' title='Editar'
                onClick={e => props.editAction(lancamento.id)}>
                  <i className="fa fa-pen"></i></button>
  
              <button
                className='btn btn-outline-danger' title='Deletar'
                onClick={e => props.deleteAction(lancamento)}>
                  <i className="fa fa-trash"></i></button>
          </td>
        </tr>
      )
    } )
    
    return (
      <table className='table table-hover'>
        <thead>
          <tr>
            <th scope='col'>Descrição</th>
            <th scope='col'>Valor</th>
            <th scope='col'>Tipo</th>
            <th scope='col'>Mês</th>
            <th scope='col'>Situação</th>
            <th scope='col'>Ações</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }