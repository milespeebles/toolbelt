import { ThemeProvider } from 'emotion-theming'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'

import Site from '../components/site'

const createApp =
  ({ theme = {}, middlewares = [], reducers = {} } = {}) => {
    const logger = createLogger ()

    const persistConfig = {
      key: 'root',
      storage,
    }

    const reducer = persistReducer (
      persistConfig,
      combineReducers ({
        ...reducers,
      }),
    )

    const middleware = composeWithDevTools (
      applyMiddleware (logger),
      ...middlewares,
    )

    const state = {}

    const store = createStore (reducer, state, middleware)
    const persistor = persistStore (store)

    const App =
      ({ Component, pageProps }) => (
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <PersistGate persistor={persistor}>
              <Site>
                <Component {...pageProps} />
              </Site>
            </PersistGate>
          </ThemeProvider>
        </Provider>
      )

    return { App, store }
  }

export default createApp
