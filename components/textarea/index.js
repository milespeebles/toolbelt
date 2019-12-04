import React from 'react'
import { Textarea as ReTextarea } from '@rebass/forms'
import { useFormContext } from 'react-hook-form'
import mirrorKeys from 'object-key-mirror'
import prop from 'ramda/src/prop'

import ErrorMessage from '../error-message'
import processValidation from '../../util/process-validation'
import getVariants from '../../util/get-variants'
import getErrorMessageKey from '../../util/get-error-message-key'

const TEXTAREA_DEFAULT_VARIANTS = mirrorKeys ([
  'form-textarea',
  'form-error',
])

const Textarea =
  ({ name, validation, variants, ...props }) => {
    const { register, errors = {} } = useFormContext () || {}
    const { rules, messages } = processValidation (validation)

    const isValid = !prop (name, errors)

    const {
      variantFormTextarea,
      variantFormError,
    } = getVariants (TEXTAREA_DEFAULT_VARIANTS, variants)

    return (
      <>
        <ReTextarea
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
              ? variantFormTextarea
              : `${variantFormTextarea}_error`
          }
          {...props}
        />
        <ErrorMessage
          name={name}
          errors={errors}
          messages={messages}
          variant={variantFormError}
        />
      </>
    )
  }

export default Textarea
