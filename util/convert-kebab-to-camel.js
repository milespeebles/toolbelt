const convertKebabToCamel =
  string => string.replace (
    /([-_][a-z])/g,
    group => group.toUpperCase ()
      .replace ('-', '')
      .replace ('_', '')
  )

export default convertKebabToCamel
