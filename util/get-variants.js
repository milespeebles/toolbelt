import mergeRight from 'ramda/src/mergeRight'

import convertKebabToCamel from './convert-kebab-to-camel'

const getVariants =
  (defaults, input = {}) => {
    const defaultsList = Object.keys (defaults)

    return Object.keys (
      mergeRight (defaults, input)
    ).reduce (
      (previous, current, index) => {
        const key = convertKebabToCamel (defaultsList[index])

        previous[key] = current

        return previous
      },
      {},
    )
  }

export default getVariants
