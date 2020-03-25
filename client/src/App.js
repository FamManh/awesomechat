import React, {Suspense, useEffect} from 'react';
import {Provider, useDispatch} from 'react-redux';
import {configStore, getHistory} from './containers/configureStore';
import { ConnectedRouter } from 'connected-react-router';
import RoutesComponent from './containers/shared/routes/RoutesComponent';
import {GlobalStyles} from './components/styles/GlobalStyles';
import { isAuthenticated } from './containers/shared/routes/permissionChecker';
import {configSocket} from "./containers/rootSocket";
const endpoint = process.env.REACT_APP_SOCKET_ENDPOINT;


const store = configStore();
function App() {
  useEffect(() => {
    configSocket();
  }, [])
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
