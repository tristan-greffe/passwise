import React from 'react'
import { useTranslation } from 'react-i18next'
import TextField from './TextField'
import PasswordField from './PasswordField'
import TokenField from './TokenField'

function Form ({ fields, onFieldChanged, onSubmit, buttonLabel }) {
  const { t } = useTranslation()

  return (
    <form className="mx-auto">
      {fields.map((field) => {
        if (field.component === 'TextField') {
          return (
            <TextField key={field.id} properties={field} onChange={onFieldChanged} />
          )
        } else if (field.component === 'PasswordField') {
          return (
            <PasswordField key={field.id} properties={field} onChange={onFieldChanged} />
          )
        } else if (field.component === 'TokenField') {
          return (
            <TokenField key={field.id} properties={field} onChange={onFieldChanged} />
          )
        }
      })}
      <div className="buttons mt-6">
        <button onClick={onSubmit}>{ t(buttonLabel)}</button>
      </div>
    </form>
  )
}

export default Form
