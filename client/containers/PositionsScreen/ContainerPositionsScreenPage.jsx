import React from 'react';
import restApi from 'common/actions/restApi';
import withStore from 'common/components/withStore/withStore';
import {LinearProgress, RaisedButton, List, ListItem, Divider} from 'material-ui';
import FontIcon from 'material-ui/FontIcon';

import 'screen-logo.png';

const activeStyle = {
    'background': '#eeeeee'
};

const PositionsPage = React.createClass({
    componentWillMount() {
        if (this.props.data.interview.positions.length) return;
        this.props.store.dispatch(restApi({
            model: 'positions'
        }));
    },

    positionChange(id) {
        this.props.store.dispatch({
            type: 'setAttribute',
            field: 'activePositionId',
            value: id
        });
    },

    openThemes() {
        this.props.store.dispatch({
            type: 'redirect',
            path: 'themes'
        });
    },

    render() {
        const interview = this.props.data.interview;

        const mainContent = <div>
            <h3 className="align-center">Choose a position</h3>
            <List>
                <Divider />
                {interview.positions.map(item => <div
                    data-position-id={`position-${item.id}`}
                    key={`position-id-${item.id}`}>
                    <ListItem
                        style={item.id === interview.activePositionId ? activeStyle : {}}
                        primaryText={item.title}
                        secondaryText={item.description}
                        onTouchTap={() => this.positionChange(item.id)}
                    /><Divider /></div>)}
            </List>
            <div className="align-center">
                <div className="button-action">
                    <RaisedButton
                        onTouchTap={this.openThemes}
                        disabled={!interview.activePositionId}
                        primary={true}
                        icon={<FontIcon className="material-icons">arrow_forward</FontIcon>}
                    />
                </div>
            </div>
        </div>;

        return <div className="screen-container">
            {interview.isLoading ? <LinearProgress mode="indeterminate"/> : mainContent}
        </div>;
    }
});

export default withStore(PositionsPage);
