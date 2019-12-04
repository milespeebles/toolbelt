const noMessageError =
  key => `Validation property '${key}' must contain a 'message' property.`

const noValueError =
  key => `Validation property '${key}' must contain a 'value' property.`

const processValidation =
  validation => {
    const messages = []
    const rules = {}

    if (!validation) return {
      messages,
      rules,
    }

    Object.keys (validation).forEach (key => {
      const v = validation[key]
      const { message, value } = v

      if (key === 'validate' && !message && !value) {
        rules.validate = {}

        return Object.keys (v).forEach ((key, x, y) => {
          const { message, value } = v[key]

          if (!message)
            throw Error (noMessageError (key))

          if (!value)
            throw Error (noValueError (key))

          rules.validate[key] = value

          messages.push ({
            message,
            type: key,
          })
        })
      }

      if (!message)
        throw Error (noMessageError (key))

      if (!value)
        throw Error (noValueError (key))

      rules[key] = value

      messages.push ({
        message,
        type: key,
      })
    })

    return {
      messages,
      rules,
    }
  }

export default processValidation
