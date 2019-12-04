import React from 'react'
import { Box } from 'rebass'
import { Input as ReInput } from '@rebass/forms'
import { useFormContext } from 'react-hook-form'
import mirrorKeys from 'object-key-mirror'
import prop from 'ramda/src/prop'

import ErrorMessage from '../error-message'
import processValidation from '../../util/process-validation'
import getVariants from '../../util/get-variants'
import getErrorMessageKey from '../../util/get-error-message-key'
import noop from '../../util/noop'

const INPUT_DEFAULT_VARIANTS = mirrorKeys (
  [
    'form-input',
    'form-error',
  ]
)

const Input =
  ({ name, validation, variants, value, onChange = noop, ...props } = {}) => {
    const { register, errors = {} } = useFormContext () || {}
    const { rules, messages } = processValidation (validation)

    const isValid = !prop (name, errors)

    const {
      variantFormInput,
      variantFormError,
    } = getVariants (INPUT_DEFAULT_VARIANTS, variants)

    return (
      <Box {...props}>
        <ReInput
          name={name}
          ref={rules && register ? register (rules) : register}
          value={value}
          onChange={onChange}
          aria-invalid={!isValid ? 'true' : 'false'}
          aria-describedby={
            messages.map (
              ({ type }) => getErrorMessageKey (name, type)
            ).join (', ')
          }
          variant={
            isValid
              ? variantFormInput
              : `${variantFormInput}_error`
          }
        />
        <ErrorMessage
          name={name}
          errors={errors}
          messages={messages}
          variant={variantFormError}
        />
      </Box>
    )
  }

export default Input
