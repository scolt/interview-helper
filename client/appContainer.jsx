import React from 'react';
import {Router as ReactRouter, Route, Redirect, useRouterHistory} from 'react-router';

import NotFound from 'containers/404/Container404';

import NameScreenPage from 'containers/NameScreen/ContainerStartScreenPage';
import PositionsScreenPage from 'containers/PositionsScreen/ContainerPositionsScreenPage';
import SelectThemesScreen from 'containers/SelectThemesScreen/ContainerSelectThemesScreenPage';
import TopicsPage from 'containers/Topics/ContainerTopicPage';
import IntermediateResultPage from 'containers/IntermediateResult/ContainerIntermediateResultPage';
import ResultPage from 'containers/Result/ContainerResultPage';

import Layout from 'common/components/layout/ContainerLayout';
import withStore from 'common/components/withStore/withStore';
import {restoreLastPage} from 'common/actions/interview';

import baseTheme from 'common/theme/cTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const muiTheme = getMuiTheme(baseTheme);

const views = {
    'main': <NameScreenPage />,
    'positions': <PositionsScreenPage />,
    'themes': <SelectThemesScreen />,
    'topics': <TopicsPage />,
    'progress': <IntermediateResultPage />,
    'result': <ResultPage />,
    '404': <NotFound />
};

const AppContainer = React.createClass({
    componentDidMount() {
        this.props.store.dispatch(restoreLastPage);
    },

    render() {
        const {currentRoute} = this.props.data.main;
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Layout>
                    {views[currentRoute] || views['404']}
                </Layout>
            </MuiThemeProvider>
        );
    }
});

export default withStore(AppContainer);
