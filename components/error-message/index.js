import React from 'react'
import prop from 'ramda/src/prop'
import { Box } from 'rebass'

import getErrorMessageKey from '../../util/get-error-message-key'

const ErrorMessage =
  ({ name, errors, messages, variant = 'form-error' }) => {
    if (!messages) return null

    const error = prop (name, errors)

    if (!error) return null

    return (
      <Box>
        {
          messages.map (({ type, message }) => {
            const key = getErrorMessageKey (name, type)

            if (prop ('type', error) !== type) return null

            return (
              <Box key={key} id={key} variant={variant}>
                {message}
              </Box>
            )
          })
        }
      </Box>
    )
  }

export default ErrorMessage
