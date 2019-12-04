const PHONE_REQUIRED_ERROR = 'Phone number is required.'
const PHONE_INVALID_ERROR = 'Phone number must be valid.'

const PHONE_VALIDATION = {
  required: {
    value: true,
    message: PHONE_REQUIRED_ERROR,
  },
  minLength: {
    value: 4,
    message: PHONE_INVALID_ERROR,
  },
  maxLength: {
    value: 22,
    message: PHONE_INVALID_ERROR,
  },
  pattern: {
    value: /^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/,
    message: PHONE_INVALID_ERROR,
  },
}

export default PHONE_VALIDATION
