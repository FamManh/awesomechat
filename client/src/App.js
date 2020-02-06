import React, {Suspense} from 'react';
import {Provider} from 'react-redux';
import {configStore, getHistory} from './containers/configureStore';
import { ConnectedRouter } from 'connected-react-router';
import RoutesComponent from './containers/shared/routes/RoutesComponent';
import {GlobalStyles} from './components/styles/GlobalStyles';

const store = configStore();
function App() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
          <Provider store={store}>
            <ConnectedRouter history={getHistory()}>
              <RoutesComponent/>
            </ConnectedRouter>
          </Provider>
          <GlobalStyles/>
      </Suspense>
  );
}

export default App;
