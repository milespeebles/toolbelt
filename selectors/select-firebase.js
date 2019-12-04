import path from 'ramda/src/path'

export const selectAuth =
  state => path (['firebase', 'auth'], state)

