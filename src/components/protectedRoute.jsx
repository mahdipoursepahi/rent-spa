import React from 'react';
import { Redirect, Route } from "react-router-dom";
import { getCurrentUser } from '../services/authService';

const ProtectdRoute = ({ path, component: Component }) => {
    const user = getCurrentUser()
    return (
        <Route
            path={path}
            render={props =>
                user ? <Component user={user} {...props} /> : <Redirect to="/login" />
            }
        />
    );
}

export default ProtectdRoute;