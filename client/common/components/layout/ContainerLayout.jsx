import React from 'react';
import withStore from 'common/components/withStore/withStore';
import 'icon.png';

const Layout = React.createClass({
    componentWillMount() {
        this.props.store.dispatch({
            type: 'tryToRestore'
        });
    },
    render () {
        return (
            <div className="main-content" id="app">
                {this.props.children}
            </div>
        );
    }
});

export default withStore(Layout);
