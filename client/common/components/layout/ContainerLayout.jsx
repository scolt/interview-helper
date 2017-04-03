import React from 'react';
import withStore from 'common/components/withStore/withStore';
import 'icon.png';

const Layout = React.createClass({
    render () {
        return (
            <div>
                <header>
                    <a href="#" className="logo">
                        <img src="images/icon.png"/>
                    </a>
                </header>
                <div className="main-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

export default withStore(Layout);
