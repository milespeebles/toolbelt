import React from 'react'
import { Box } from 'rebass'
import { useFormContext } from 'react-hook-form'
import mirrorKeys from 'object-key-mirror'

import Slider from '../slider'
import getVariants from '../../util/get-variants'

const SLIDER_GROUP_DEFAULT_VARIANTS = mirrorKeys ([
  'form-slider',
  'form-group',
  'form-group-item',
])

const SliderGroup =
  ({ name, items, variants, ...props }) => {
    const {
      variantFormSlider,
      variantFormGroup,
      variantFormGroupItem,
    } = getVariants (SLIDER_GROUP_DEFAULT_VARIANTS, variants)

    return (
      <Box
        id={name}
        variant={variantFormGroup}
        {...props}
      >
        {
          items.map (
            ({
              id,
              label,
              defaultValue = 50,
              ...props
            } = {}) => (
              <Box variant={variantFormGroupItem} key={id}>
                <Slider
                  id={id}
                  name={id}
                  defaultValue={defaultValue}
                  label={label}
                  variant={variantFormSlider}
                  {...props}
                />
              </Box>
            )
          )
        }
      </Box>
    )
  }

export default SliderGroup
