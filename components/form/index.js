import React from 'react'
import { FormContext, useForm } from 'react-hook-form'

import noop from '../../util/noop'

const Form =
  ({
    form,
    defaultValues,
    children,
    onSubmit = noop,
  } = {}) => {
    form = form || useForm ({ defaultValues })

    return (
      <FormContext {...form}>
        <form onSubmit={form.handleSubmit (onSubmit)}>
          {children}
        </form>
      </FormContext>
    )
  }

export default Form
