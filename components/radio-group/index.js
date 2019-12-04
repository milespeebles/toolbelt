import React, { useEffect } from 'react'
import { Box } from 'rebass'
import { useFormContext } from 'react-hook-form'
import mirrorKeys from 'object-key-mirror'
import prop from 'ramda/src/prop'

import Radio from '../radio'
import ErrorMessage from '../error-message'
import processValidation from '../../util/process-validation'
import getVariants from '../../util/get-variants'
import getErrorMessageKey from '../../util/get-error-message-key'

const RADIO_GROUP_DEFAULT_VARIANTS = mirrorKeys ([
  'form-radio',
  'form-label',
  'form-label-symbol',
  'form-group',
  'form-group-item',
  'form-error',
])

const RadioGroup =
  ({
    items,
    name,
    validation,
    symbol,
    defaultValue,
    variants,
    ...props
  }) => {
    const { errors = {} } = useFormContext () || {}
    const { rules, messages } = processValidation (validation)

    const isValid = !prop (name, errors)

    const {
      variantFormRadio,
      variantFormLabel,
      variantFormLabelSymbol,
      variantFormGroup,
      variantFormGroupItem,
      variantFormError,
    } = getVariants (RADIO_GROUP_DEFAULT_VARIANTS, variants)

    return (
      <Box
        aria-invalid={!isValid ? 'true' : 'false'}
        aria-describedby={
          messages.map (
            ({ type }) => getErrorMessageKey (name, type)
          ).join (', ')
        }
        variant={
          isValid
            ? variantFormGroup
            : `${variantFormGroup}_error`
        }
        {...props}
      >
        {
          items.map (
            ({ id, label, isDefault, ...props }) => (
              <Box key={id} variant={variantFormGroupItem}>
                <Radio
                  id={id}
                  name={name}
                  value={id}
                  label={label}
                  isDefault={isDefault}
                  variants={{
                    'form-radio': variantFormRadio,
                    'form-label': variantFormLabel,
                    'form-label-symbol': variantFormLabelSymbol,
                  }}
                  {...props}
                />
              </Box>
            )
          )
        }
        <ErrorMessage
          name={name}
          errors={errors}
          messages={messages}
          variant={variantFormError}
        />
      </Box>
    )
  }

export default RadioGroup
