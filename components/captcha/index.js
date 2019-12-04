import React, { useEffect, useRef } from 'react'
import { Box } from 'rebass'
import { useFormContext } from 'react-hook-form'
import prop from 'ramda/src/prop'
import { useFirebase } from 'react-redux-firebase'

import ErrorMessage from '../error-message'
import processValidation from '../../util/process-validation'
import noop from '../../util/noop'

const useCaptcha =
  ({
    size = 'normal',
    callback = noop,
    expiredCallback = noop,
  } = {}) => {
    const firebase = useFirebase ()
    const ref = useRef (null)

    useEffect (() => {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier (
        ref.current,
        {
          size,
          callback,
          'expired-callback': expiredCallback,
        },
      )

      window.recaptchaVerifier
        .render ()
        .then (id => window.recaptchaWidgetId = id)
    }, [])

    return ref
  }

const CAPTCHA_VALIDATION = {
  required: {
    value: true,
    message: 'Captcha is required.',
  },
}

export const CAPTCHA = 'captcha'

const Captcha =
  ({
    onSuccess = noop,
    onExpire = noop,
    variant = 'form-captcha',
    ...props
  } = {}) => {
    const {
      register,
      setValue = noop,
      triggerValidation = noop,
      errors = {},
    } = useFormContext () || {}

    const setCaptcha =
      isChecked => () => {
        isChecked ? onSuccess () : onExpire ()
        setValue (CAPTCHA, isChecked, true)
      }

    const { rules, messages } = processValidation (CAPTCHA_VALIDATION)

    useEffect (() => {
      if (register) register ({ name: CAPTCHA }, rules)
    }, [])

    const captcha = useCaptcha ({
      callback: setCaptcha (true),
      expiredCallback: setCaptcha (false),
    })

    return (
      <>
        <Box
          variant={
            !prop (CAPTCHA, errors)
              ? variant
              : `${variant}_error`
          }
          {...props}
        >
          <Box ref={captcha} />
          <ErrorMessage
            name={CAPTCHA}
            errors={errors}
            messages={messages}
          />
        </Box>
      </>
    )
  }

export default Captcha
