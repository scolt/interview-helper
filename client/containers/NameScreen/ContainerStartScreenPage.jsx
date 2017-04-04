import React from 'react';
import withStore from 'common/components/withStore/withStore';
import {TextField, RaisedButton} from 'material-ui';
import FontIcon from 'material-ui/FontIcon';

import 'screen-logo.png';
import './startScreen.styl';

const MainPage = React.createClass({
    openPositionsPage() {
        this.props.store.dispatch({
            type: 'redirect',
            path: 'positions'
        });
    },

    nameChange(e) {
        this.props.store.dispatch({
            type: 'setAttribute',
            field: 'candidateName',
            value: e.target.value
        });
    },

    render() {
        return <div className="screen-container">
            <div className="logo-wrapper">
                <img src="/images/screen-logo.png" alt="Interview Helper"/>
            </div>
            <div className="align-center">
                <TextField
                    className="name-input"
                    onChange={this.nameChange}
                    hintText="Interviewee Name"
                />
                <div className="button-action">
                    <RaisedButton
                        onTouchTap={this.openPositionsPage}
                        primary={true}
                        icon={<FontIcon className="material-icons">arrow_forward</FontIcon>}
                    />
                </div>
            </div>
        </div>;
    }
});

export default withStore(MainPage);
