import React from 'react'
import { Slider as ReSlider } from '@rebass/forms'
import { useFormContext } from 'react-hook-form'

import Label from '../label'

const Slider =
  ({
    id,
    label,
    defaultValue,
    variant = 'form-slider',
    ...props
  }) => {
    const { register } = useFormContext () || {}

    return (
      <>
        <Label name={id} text={label} />
        <ReSlider
          ref={register}
          id={id}
          name={id}
          defaultValue={defaultValue}
          variant={variant}
        />
      </>
    )
  }

export default Slider
