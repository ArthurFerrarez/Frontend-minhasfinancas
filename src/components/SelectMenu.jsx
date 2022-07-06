import React from 'react'

export default function SelectMenu(props) {

  const options = props.lista.map((option, key) => {
    return (
      <option key={key} value={option.value}>{option.label}</option>
    )
  })

  return (
    <select {...props}>
      {options}
    </select>
  )
}
