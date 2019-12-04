import path from 'ramda/src/path'

export const selectData =
  state => path (['firestore', 'data'], state)

export const selectOrdered =
  state => path (['firestore', 'ordered'], state)

