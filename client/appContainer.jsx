import React from 'react';
import {Router as ReactRouter, Route, Redirect, useRouterHistory} from 'react-router';

import NotFound from 'containers/404/Container404';
import MainPage from 'containers/Main/ContainerMainPage';

import Layout from 'common/components/layout/ContainerLayout';
import {createHashHistory} from 'history';

const appHistory = useRouterHistory(createHashHistory)();

const views = {
    '/': MainPage,
    '/404': NotFound
};

const AppContainer = React.createClass({
    render() {
        return (
            <ReactRouter history={appHistory}>
                <Route component={Layout}>
                    {Object.keys(views).map(key => <Route key={key} path={key} component={views[key]}/>)}
                </Route>
                <Redirect from="/" to="/main"/>
                <Redirect from="*" to="/404"/>
            </ReactRouter>
        );
    }
});

export default AppContainer;
