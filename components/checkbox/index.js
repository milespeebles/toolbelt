import React, { useEffect } from 'react'
import { Checkbox as ReCheckbox } from '@rebass/forms'
import { useFormContext } from 'react-hook-form'
import mirrorKeys from 'object-key-mirror'

import Label from '../label'
import getVariants from '../../util/get-variants'

const CHECKBOX_DEFAULT_VARIANTS = mirrorKeys ([
  'form-checkbox',
  'form-label',
])

const Checkbox =
  ({
    id,
    isDefault,
    label,
    variants,
    ...props
  }) => {
    const { register, setValue = noop } = useFormContext () || {}

    useEffect (() => {
      setValue (id, isDefault)
    }, [])

    const {
      variantFormCheckbox,
      variantFormLabel,
    } = getVariants (CHECKBOX_DEFAULT_VARIANTS, variants)

    return (
      <Label
        name={id}
        text={label}
        variant={variantFormLabel}
        side='right'
      >
        <ReCheckbox
          ref={register}
          id={id}
          name={id}
          variant={variantFormCheckbox}
          {...props}
        />
      </Label>
    )
  }

export default Checkbox
