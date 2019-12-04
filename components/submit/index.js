import React from 'react'
import { Button } from 'rebass'
import { useFormContext } from 'react-hook-form'

import noop from '../../util/noop'

const Submit =
  ({ text = 'Submit', variant = 'submit', ...props }) => {
    const { errors = {} } = useFormContext () || {}

    const isDisabled = !!Object.keys (errors).length

    return (
      <Button
        variant={!isDisabled ? variant : `${variant}_disabled`}
        disabled={isDisabled}
        {...props}
      >
        {text}
      </Button>
    )
  }

export default Submit
