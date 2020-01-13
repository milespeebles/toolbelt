import getConfig from 'next/config'
import * as fb from 'firebase'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'

import isBrowser from '../util/is-browser'

const init =
  config => {
    fb.initializeApp (config)
    fb.auth ()
      .useDeviceLanguage ()

    fb.firestore ()

    if (isBrowser) fb.analytics ()

    return fb
  }

const getFirebase =
  config => fb.apps.length
    ? fb
    : init (config)

export default getFirebase
