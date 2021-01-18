import React from 'react';

import { Switch } from 'react-router-dom';
import Route from './Route';

import Signin from '../pages/signin';
import Signup from '../pages/signup';
import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
    <Switch>
        <Route path='/' exact component={Signin}></Route>
        <Route path='/signup'  component={Signup}></Route>

        <Route path='/dashboard' component={Dashboard} isPrivate ></Route>        
    </Switch>
);

export default Routes;
