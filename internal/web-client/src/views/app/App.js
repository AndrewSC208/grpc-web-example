import React from 'react';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from '../../store/configureStore'

// import SignUpView from '../signup/SignUp.container';
import ViewportView from '../viewport/Viewport.container';

const store = configureStore({})

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ViewportView />
        </ConnectedRouter>
      </Provider>
    </div>
  );
}

export default App;
