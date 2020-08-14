import React from 'react';
import { Switch, Route } from 'react-router-dom';
import IndexPage from '../pages/Index';
import MapPage from '../pages/Map';

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route exact path="/" component={IndexPage} />
            <Route path="/map" component={MapPage} />
        </Switch>
    );
}

export default Routes;