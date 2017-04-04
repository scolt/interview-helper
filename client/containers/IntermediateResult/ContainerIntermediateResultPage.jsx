import React from 'react';
import withStore from 'common/components/withStore/withStore';
import {RaisedButton, List, Subheader, ListItem, Divider} from 'material-ui';

import './result.styl';

import {
    pink300,
    yellow700,
    indigo300,
    green600
} from 'material-ui/styles/colors';

function getParams(value) {
    let color = pink300;
    if (value > 2.5) {
        color = green600;
    } else if (value > 1.9) {
        color = indigo300;
    } else if (value > 1.2) {
        color = yellow700;
    } else {
        color = pink300;
    }
    return {
        color
    };
}

const IntermediateResultPage = React.createClass({
    openNextTheme() {
        this.props.store.dispatch({
            type: 'goToTheNextTheme'
        });
    },

    render() {
        const {activeThemeId: themeId} = this.props.data.interview;
        const theme = this.props.data.interview.themes.find(item => item.id == themeId);
        const topics = this.props.data.interview.topics[themeId];
        const averageMark = topics && topics.averageMark;
        const params = getParams(averageMark);

        return <div className="screen-container">
            <h3>Progress result for <i>{theme.title}</i></h3>
            <div className="progress-details">
                <div className="av-mark" style={{borderColor: params.color}}>
                    {averageMark}
                </div>
                <div className="nextThemeButton">
                    <RaisedButton label="Next step" primary={true} onTouchTap={this.openNextTheme}/>
                </div>
            </div>
            <List>
                <Subheader>General</Subheader>
                <Divider />
                {topics && topics.entities.map(item => item.mark !== undefined &&
                <div key={item.id} id={`topic-${item.title.replace(' ', '')}`}>
                    <Divider />
                    <ListItem
                        leftAvatar={<span className="list-mark">{item.mark}</span>}
                        primaryText={item.title}
                    />
                </div>)
                }
            </List>
        </div>;
    }
});

export default withStore(IntermediateResultPage);
