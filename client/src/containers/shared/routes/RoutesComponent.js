import React from 'react';
import {Switch, Route} from 'react-router-dom';
import routes from '../../routes';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import AuthRoute from './AuthRoute';
import CustomLoadable from '../CustomLoadable';

const RoutesComponent = () => (
    <Switch>
        {routes.publicRoutes.map(route => (
            <PublicRoute
                key={route.path}
                exact
                path={route.path}
                component={CustomLoadable({ loader: route.loader })}
            />
        ))}

        {routes.privateRoutes.map(route => (
            <PrivateRoute
                key={route.path}
                path={route.path}
                component={CustomLoadable({ loader: route.loader })}
                exact={!!route.exact}
            />
        ))}

        {routes.authRoutes.map(route => (
            <AuthRoute
                key={route.path}
                exact
                path={route.path}
                component={CustomLoadable({ loader: route.loader })}
            />
        ))}

        {routes.errorRoutes.map(route => (
            <Route
                key={route.path}
                exact
                path={route.path}
                component={CustomLoadable({ loader: route.loader })}
            />
        ))}
    </Switch>
);

export default RoutesComponent;
