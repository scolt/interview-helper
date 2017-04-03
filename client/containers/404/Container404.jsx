import React from 'react';
import './404.styl';

const NotFound = React.createClass({
    render() {
        return <div className="not-found-page">
            This page not exist. Try to return on main page and search again.
        </div>;
    }
});

export default NotFound;
