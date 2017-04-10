import React from 'react';
import 'icon.png';

import MaterialModal from '../modal/MaterialModal';

const Layout = React.createClass({
    render () {
        return (
            <div className="main-content" id="app">
                {this.props.children}
                <MaterialModal />
            </div>
        );
    }
});

export default Layout;
