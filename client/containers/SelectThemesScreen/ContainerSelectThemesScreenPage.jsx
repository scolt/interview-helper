import React from 'react';
import restApi from 'common/actions/restApi';
import withStore from 'common/components/withStore/withStore';
import {LinearProgress, RaisedButton, List, ListItem, Checkbox} from 'material-ui';
import FontIcon from 'material-ui/FontIcon';

const PositionsPage = React.createClass({
    componentWillMount() {
        if (this.props.data.interview.themes.length) return;
        this.props.store.dispatch(restApi({
            model: 'themes',
            id: this.props.data.interview.activePositionId
        }));
    },

    selectTheme(id, isInputChecked) {
        this.props.store.dispatch({
            type: 'selectTheme',
            field: id,
            value: isInputChecked
        });
    },

    startInterview() {
        this.props.store.dispatch({
            type: 'redirect',
            path: 'topics'
        });
    },

    render() {
        const interview = this.props.data.interview;
        const mainContent = <div>
            <h3 className="align-center">Choose the suitable topics</h3>
            <List>
                {interview.themes.map(item => <div
                    data-position-id={`position-${item.id}`}
                    key={`position-id-${item.id}`}>
                    <ListItem
                        primaryText={item.title}
                        leftCheckbox={
                            <Checkbox
                                checked={interview.appliedThemes && interview.appliedThemes.indexOf(item.id) > -1}
                                onCheck={(e, isInputChecked) => this.selectTheme(item.id, isInputChecked)}
                            />
                        }
                        secondaryText={item.description}
                        onTouchTap={() => this.positionChange(item.id)}
                    /></div>)}
            </List>
            <div className="align-center">
                <div className="button-action">
                    <RaisedButton
                        fullWidth={true}
                        disabled={interview.activeThemeId === undefined}
                        onTouchTap={() => this.startInterview()}
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
