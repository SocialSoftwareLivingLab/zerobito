import React from 'react';
import { Redirect, Route } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PrivateRoute = ({ component: Component, ...rest }: any) => (
    <Route
        {...rest}
        render={(props) =>
            localStorage.getItem('token') ? <Component {...props} /> : <Redirect to="/login" />
        }
    />
);

export default PrivateRoute;
