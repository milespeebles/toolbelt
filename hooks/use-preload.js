import { useSelector } from 'react-redux'
import isNil from 'ramda/src/isnil'

const usePreload =
  (state, selectors) => Object.keys (selectors)
    .reduce ((accumulator, key) => {
      const name = key
      const selector = selectors[key]

      const selected = useSelector (selector)
      const value = isNil (selected) ? state[name] : selected

      accumulator[name] = value

      return accumulator
    }, {})

export default usePreload

