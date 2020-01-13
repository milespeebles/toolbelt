import { ThemeProvider } from 'emotion-theming'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider, firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore, createFirestoreInstance, firestoreReducer } from 'redux-firestore'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'

import Site from '../components/site'
import getFirebase from './get-firebase'

const createApp =
  ({ theme = {}, middlewares = [], reducers = {}, firebaseConfig = {} } = {}) => {
    const rrfConfig = {
      userProfile: 'users',
      useFirestoreForProfile: true,
    }

    const firebase = getFirebase (firebaseConfig)

    const logger = createLogger ()

    const persistConfig = {
      key: 'root',
      storage,
    }

    const reducer = persistReducer (
      persistConfig,
      combineReducers ({
        firebase: firebaseReducer,
        firestore: firestoreReducer,
        ...reducers,
      }),
    )

    const middleware = composeWithDevTools (
      applyMiddleware (logger),
      ...middlewares,
      reduxFirestore (firebase),
    )

    const state = {}

    const store = createStore (reducer, state, middleware)
    const persistor = persistStore (store)

    const rrfProps = {
      firebase,
      config: rrfConfig,
      dispatch: store.dispatch,
      createFirestoreInstance,
    }

    const App =
      ({ Component, pageProps }) => (
        <Provider store={store}>
          <ReactReduxFirebaseProvider {...rrfProps}>
            <ThemeProvider theme={theme}>
              <PersistGate persistor={persistor}>
                <Site>
                  <Component {...pageProps} />
                </Site>
              </PersistGate>
            </ThemeProvider>
          </ReactReduxFirebaseProvider>
        </Provider>
      )

    const preload =
      queries => Promise.all (
        queries.map (query => store.firestore.get (query))
      ).then (() => store.getState ())

    const firestore = store.firestore

    return { App, preload, store, firebase, firestore }
  }

export default createApp
