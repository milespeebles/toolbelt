import React, { useEffect } from 'react'
import { Radio as ReRadio } from '@rebass/forms'
import { useFormContext } from 'react-hook-form'
import mirrorKeys from 'object-key-mirror'

import Label from '../label'
import getVariants from '../../util/get-variants'

const RADIO_DEFAULT_VARIANTS = mirrorKeys ([
  'form-radio',
  'form-label',
  'form-label-symbol',
])

const Radio =
  ({
    id,
    name,
    label,
    symbol,
    isDefault,
    variants,
    ...props
  }) => {
    const { register, setValue = noop } = useFormContext () || {}

    useEffect (() => {
      if (isDefault) setValue (name, id)
    }, [])

    const {
      variantFormRadio,
      variantFormLabel,
      variantFormLabelSymbol,
    } = getVariants (RADIO_DEFAULT_VARIANTS, variants)

    return (
      <Label
        name={id}
        text={label}
        symbol={symbol}
        variants={{
          'form-label': variantFormLabel,
          'form-label-symbol': variantFormLabelSymbol,
        }}
        side='right'
      >
        <ReRadio
          ref={register}
          id={id}
          name={name}
          value={id}
          variant='form-radio'
          {...props}
        />
      </Label>
    )
  }

export default Radio
