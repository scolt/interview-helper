import React from 'react';
import {Router as ReactRouter, Route, Redirect, useRouterHistory} from 'react-router';

import NotFound from 'containers/404/Container404';

import NameScreenPage from 'containers/NameScreen/ContainerStartScreenPage';
import PositionsScreenPage from 'containers/PositionsScreen/ContainerPositionsScreenPage';
import SelectThemesScreen from 'containers/SelectThemesScreen/ContainerSelectThemesScreenPage';
import TopicsPage from 'containers/Topics/ContainerTopicPage';
import IntermediateResultPage from 'containers/IntermediateResult/ContainerIntermediateResultPage';

import Layout from 'common/components/layout/ContainerLayout';
import {createHashHistory} from 'history';

import baseTheme from 'common/theme/cTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const muiTheme = getMuiTheme(baseTheme);

const appHistory = useRouterHistory(createHashHistory)();

const views = {
    '/': NameScreenPage,
    '/positions': PositionsScreenPage,
    '/themes': SelectThemesScreen,
    '/topics': TopicsPage,
    '/progress': IntermediateResultPage,
    '/404': NotFound
};

const AppContainer = React.createClass({
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <ReactRouter history={appHistory}>
                    <Route component={Layout}>
                        {Object.keys(views).map(key => <Route key={key} path={key} component={views[key]}/>)}
                    </Route>
                    <Redirect from="/" to="/main"/>
                    <Redirect from="*" to="/404"/>
                </ReactRouter>
            </MuiThemeProvider>
        );
    }
});

export default AppContainer;
