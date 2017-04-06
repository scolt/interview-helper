import React from 'react';
import 'icon.png';

const Layout = React.createClass({
    render () {
        return (
            <div className="main-content" id="app">
                {this.props.children}
            </div>
        );
    }
});

export default Layout;
