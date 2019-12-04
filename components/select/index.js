import React, { useEffect } from 'react'
import { Select as ReSelect } from '@rebass/forms'
import { useFormContext } from 'react-hook-form'
import mirrorKeys from 'object-key-mirror'
import prop from 'ramda/src/prop'

import ErrorMessage from '../error-message'
import processValidation from '../../util/process-validation'
import getVariants from '../../util/get-variants'
import getErrorMessageKey from '../../util/get-error-message-key'

const SELECT_DEFAULT_VARIANTS = mirrorKeys ([
  'form-select',
  'form-error',
])

const Select =
  ({ options, name, validation, ...props }) => {
    const {
      register,
      variants,
      setValue = noop,
      errors = {}
    } = useFormContext () || {}

    useEffect (() => {
      setValue (name, options[0].id)
    }, [])

    const { rules, messages } = processValidation (validation)

    const isValid = !prop (name, errors)
    const {
      variantFormSelect,
      variantFormError,
    } = getVariants (SELECT_DEFAULT_VARIANTS, variants)

    return (
      <>
        <ReSelect
          id={name}
          name={name}
          ref={rules && register ? register (rules) : register}
          aria-invalid={!isValid ? 'true' : 'false'}
          aria-describedby={
            messages.map (
              ({ type }) => getErrorMessageKey (name, type)
            ).join (', ')
          }
          variant={
            isValid
              ? variantFormSelect
              : `${variantFormSelect}_error`
          }
          {...props}
        >
          {
            options.map (
              ({
                id,
                label,
                disabled = false,
              } = {}) => (
                <option key={id ? id : 'default'} value={id} disabled={disabled}>
                  {label}
                </option>
              )
            )
          }
        </ReSelect>
        <ErrorMessage
          name={name}
          errors={errors}
          messages={messages}
          variant={variantFormError}
        />
      </>
    )
  }

export default Select
