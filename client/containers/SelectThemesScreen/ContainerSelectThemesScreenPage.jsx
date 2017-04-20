import React from 'react';
import restApi from 'common/actions/restApi';
import withStore from 'common/components/withStore/withStore';
import {
    LinearProgress,
    RaisedButton,
    List,
    ListItem,
    Checkbox,
    TextField,
    IconButton,
    Divider,
    BottomNavigation,
    BottomNavigationItem,
    Paper
} from 'material-ui';
import FontIcon from 'material-ui/FontIcon';
import './themes.styl';

let timeout = null;

const PositionsPage = React.createClass({
    getInitialState() {
        return {
            newThemeName: '',
            swappedItem: null
        };
    },

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

    createNewTheme() {
        this.props.store.dispatch({
            type: 'addNewTheme',
            name: this.state.newThemeName
        });
        this.setState({
            newThemeName: ''
        });
    },

    startInterview() {
        this.props.store.dispatch({
            type: 'redirect',
            path: 'topics'
        });
    },

    themeChanged(e) {
        this.setState({
            newThemeName: e.target.value
        });
    },

    openSwapMenu(id) {
        this.setState({
            swappedItem: id
        });
    },

    moveItem(direction) {
        this.props.store.dispatch({
            type: 'moveItem',
            direction,
            id: this.state.swappedItem
        });
    },

    render() {
        const {newThemeName, swappedItem} =  this.state;
        const interview = this.props.data.interview;
        const mainContent = <div className="list-block">
            <h3 className="align-center">Choose the suitable topics</h3>
            <List>
                <Divider />
                {interview.themes.map(item => <div
                    data-position-id={`position-${item.id}`}
                    key={`position-id-${item.id}`}>

                    <ListItem
                        primaryText={item.title}
                        style={swappedItem === item.id ?
                            {background: '#f44336', transform: 'scale(1.1)'} : {}}
                        rightIcon={
                            <div className="theme-actions">
                                {!swappedItem ? <IconButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                    }}
                                    onTouchTap={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        this.openSwapMenu(item.id);
                                    }}
                                >
                                    <FontIcon className="material-icons top">vertical_align_center</FontIcon>
                                </IconButton> : null}
                            </div>

                        }
                        leftCheckbox={
                            <Checkbox
                                checked={interview.appliedThemes && interview.appliedThemes.indexOf(item.id) > -1}
                                onCheck={(e, isInputChecked) => this.selectTheme(item.id, isInputChecked)}
                            />
                        }
                        secondaryText={item.description}
                    /><Divider /></div>)}
                <br />
                <ListItem
                    innerDivStyle={{paddingTop: 0, paddingBottom: 0}}
                    primaryText={<div className="add-new-theme">
                        <TextField
                            value={newThemeName}
                            className="name-input"
                            onChange={this.themeChanged}
                            fullWidth={true}
                            hintText="Add Extra Theme"
                        />
                        <div>
                            <RaisedButton
                                disabled={!newThemeName}
                                onTouchTap={this.createNewTheme}
                                secondary={true}
                                icon={<FontIcon className="material-icons">add</FontIcon>}
                            />
                        </div>
                    </div>
                    }
                    leftIcon={<FontIcon className="material-icons">plus_one</FontIcon>}
                />
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


            {swappedItem ?
                <Paper zDepth={3} className="bottom-navigation">
                    <BottomNavigation>
                        <BottomNavigationItem
                            label="Move Up"
                            icon={<FontIcon className="material-icons">vertical_align_top</FontIcon>}
                            onTouchTap={() => this.moveItem('up')}
                        />
                        <BottomNavigationItem
                            label="Close"
                            icon={<FontIcon className="material-icons">close</FontIcon>}
                            onTouchTap={() => this.openSwapMenu(null)}
                        />
                        <BottomNavigationItem
                            label="Move Down"
                            icon={<FontIcon className="material-icons">vertical_align_bottom</FontIcon>}
                            onTouchTap={() => this.moveItem('down')}
                        />
                    </BottomNavigation>
                </Paper>
                : null }
        </div>;

        return <div className="screen-container">
            {interview.isLoading ? <LinearProgress mode="indeterminate"/> : mainContent}
        </div>;
    }
});

export default withStore(PositionsPage);
