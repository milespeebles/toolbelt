import React from 'react'
import { Box } from 'rebass'
import { useFormContext } from 'react-hook-form'
import mirrorKeys from 'object-key-mirror'
import prop from 'ramda/src/prop'

import Checkbox from '../checkbox'
import getVariants from '../../util/get-variants'

const CHECKBOX_GROUP_DEFAULT_VARIANTS = mirrorKeys ([
  'form-checkbox',
  'form-label',
  'form-group',
  'form-group-item',
])

const CheckboxGroup =
  ({ name, items, variants, ...props }) => {
    const {
      variantFormCheckbox,
      variantFormLabel,
      variantFormGroup,
      variantFormGroupItem,
    } = getVariants (CHECKBOX_GROUP_DEFAULT_VARIANTS, variants)

    return (
      <Box
        id={name}
        variant={variantFormGroup}
        {...props}
      >
        {
          items.map (
            ({ id, label, isDefault, ...props } = {}) => (
              <Box key={id} variant={variantFormGroupItem}>
                <Checkbox
                  id={id}
                  name={id}
                  label={label}
                  isDefault={isDefault}
                  variants={{
                    'form-checkbox': variantFormCheckbox,
                    'form-label': variantFormLabel,
                  }}
                  {...props}
                />
              </Box>
            )
          )
        }
      </Box>
    )
  }

export default CheckboxGroup
