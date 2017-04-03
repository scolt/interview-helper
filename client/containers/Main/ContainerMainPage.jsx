import React from 'react';
import restApi from 'common/actions/restApi';
import withStore from 'common/components/withStore/withStore';

import NewsGrid from './components/newsGrid/ComponentNewsGrid';

const MainPage = React.createClass({

    componentWillMount() {
        this.request = this.props.store.dispatch(restApi({
            model: 'articles',
            params: {
                source: 'mtv-news'
            }
        }));
    },

    render() {
        const news = this.props.data.news;
        return <div className="landing-page">
            {news.isLoading ? 'Loading...': <NewsGrid />}
        </div>;
    }
});

export default withStore(MainPage);
