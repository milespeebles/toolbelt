import React from 'react'
import { Text } from 'rebass'
import { Label as ReLabel } from '@rebass/forms'
import { useFormContext } from 'react-hook-form'
import mirrorKeys from 'object-key-mirror'
import prop from 'ramda/src/prop'

import getVariants from '../../util/get-variants'

const LABEL_DEFAULT_VARIANTS = mirrorKeys (
  [
    'form-label',
    'form-label-symbol',
  ]
)

const Label =
  ({
    children,
    name,
    text,
    symbol,
    variants,
    side = 'left',
    ...props
  } = {}) => {
    const { errors } = useFormContext () || {}
    const error = prop (name, errors)

    const {
      variantFormLabel,
      variantFormLabelSymbol,
    } = getVariants (LABEL_DEFAULT_VARIANTS, variants)

    return (
      <ReLabel
        htmlFor={name}
        variant={variantFormLabel}
        {...props}
      >
        {children && side === 'right' ? children : null}
        {text}
        <Text
          as='span'
          variant={
            !error
              ? variantFormLabelSymbol
              : `${variantFormLabelSymbol}_error`
          }
        >
          {symbol}
        </Text>
        {children && side === 'left' ? children : null}
      </ReLabel>
    )
  }

export default Label
