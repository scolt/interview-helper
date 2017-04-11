import React from 'react';
import restApi from 'common/actions/restApi';

import {openMarkHelpModal} from 'common/actions/modals';

import {nextTopic} from 'common/actions/topic';
import withStore from 'common/components/withStore/withStore';
import {LinearProgress, RaisedButton} from 'material-ui';
import FontIcon from 'material-ui/FontIcon';
import {
    pink300,
    yellow700,
    indigo300,
    green600
} from 'material-ui/styles/colors';

import './topics.styl';

import Questions from './components/suggestedQuestionBlock';

const commonButtonStyles = {
    width: '23%',
    minWidth: '0',
    margin: '0 1%',
    height: '50px'
};

const marks = [
    {
        value: 0,
        iconName: 'star_border',
        activeColor: pink300
    },
    {
        value: 1,
        iconName: 'star_half',
        activeColor: yellow700
    },
    {
        value: 2,
        iconName: 'star',
        activeColor: indigo300
    },
    {
        value: 3,
        iconName: 'star star',
        activeColor: green600
    }
];

const TopicPage = React.createClass({
    componentWillMount() {
        const themeId = this.props.data.interview.activeThemeId;
        if (!themeId) {
            this.props.store.dispatch({type: 'clearStorageAndGoHome'});
        } else {
            if (this.props.data.interview.topics[themeId]) return;
            this.props.store.dispatch(restApi({
                model: 'topics',
                id: themeId
            }));
        }
    },

    openNext() {
        this.props.store.dispatch(nextTopic);
    },

    openMarkHelp() {
        this.props.store.dispatch(openMarkHelpModal);
    },

    setTopicMark(value) {
        this.props.store.dispatch({
            type: 'setTopicMark',
            value
        });
    },

    render() {
        const themeId = this.props.data.interview.activeThemeId;
        const topicId = this.props.data.interview.activeTopicId;

        const topic = this.props.data.interview.topics[themeId] ?
            this.props.data.interview.topics[themeId].entities.find(item => item.id == topicId) : {};

        const theme = this.props.data.interview.themes.find(item => item.id == themeId);

        const content = <div className="screen-container">
            <h3>{theme && theme.title}: {topic && topic.title}</h3>
            {topic ? <div>
                <p className="topic-description">
                    {topic && topic.description}
                </p>

                <Questions topicId={topicId} />

                <div className="align-center mark-container">
                    <h4 onTouchTap={this.openMarkHelp}>
                        <FontIcon className="material-icons">help_outline</FontIcon>
                        Set a mark for this topic:
                    </h4>
                    <div className="marks">
                        {
                            marks.map(item =>
                                <RaisedButton
                                    key={`set-mark-${item.value}`}
                                    id={`set-mark-${item.value}`}
                                    onTouchTap={() => this.setTopicMark(item.value)}
                                    backgroundColor={topic && topic.mark === item.value ? item.activeColor : null}
                                    style={commonButtonStyles}
                                    icon={<FontIcon className="material-icons mark-text">{item.iconName}</FontIcon>}
                                />
                            )
                        }
                    </div>
                </div>
            </div> : <div className="no-message">There are no topics, please try to finish this theme</div>}

            <RaisedButton fullWidth={true} primary={true} label="Go Next" onTouchTap={this.openNext}/>
        </div>;

        return <div>
            {this.props.data.interview.isLoading ? <LinearProgress mode="indeterminate"/> : content}
        </div>;
    }
});

export default withStore(TopicPage);
