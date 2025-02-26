import React from 'react';
import {  Route as ReactDOMRoute , 
    RouteProps as ReactRouterProps, Redirect } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';


interface RouteProps extends ReactRouterProps {
    isPrivate?: boolean;

    component: React.ComponentType;
}; 


const Route: React.FC <RouteProps> = ({ isPrivate = false, component: Component, ...rest }) => {
    const { user } = useAuth();

    return (
    <ReactDOMRoute 
    {...rest} 
    render={({ location }) => {
        return isPrivate === !!user ? (
            <Component />
        ) : (
            < Redirect  to={{ 
                pathname: isPrivate ? '/' : '/dashboard',
                state: { from: location },
            }}/>
        )
    }}
    />

    );
};

export default Route;