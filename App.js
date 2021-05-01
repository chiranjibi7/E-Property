import React from 'react';
import RootNavigator from './navigation/RootNavigator';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {rootReducer} from './store';
import thunk from 'redux-thunk';
import {Provider as PaperProvider} from 'react-native-paper';

const store=createStore(rootReducer,applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <RootNavigator/>
      </PaperProvider>
    </Provider>
  );
}


