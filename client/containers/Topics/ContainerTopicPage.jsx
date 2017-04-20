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
    green400,
    teal300
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
        value: 1,
        iconName: 'not_interested',
        activeColor: pink300
    },
    {
        value: 2,
        iconName: 'star_border',
        activeColor: yellow700
    },
    {
        value: 3,
        iconName: 'star_half',
        activeColor: teal300
    },
    {
        value: 4,
        iconName: 'star',
        activeColor: indigo300
    },
    {
        value: 5,
        iconName: 'stars',
        activeColor: green400
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

    setThemeMark(value) {
        this.props.store.dispatch({
            type: 'setThemeMark',
            value
        });
    },

    setTopicMark(value) {
        this.props.store.dispatch({
            type: 'setTopicMark',
            value
        });
    },

    render() {
        const {topics} = this.props.data.interview;
        const themeId = this.props.data.interview.activeThemeId;
        const topicId = this.props.data.interview.activeTopicId;

        const topic = topics[themeId] ?
            topics[themeId].entities.find(item => item.id == topicId) : {};

        const theme = this.props.data.interview.themes.find(item => item.id == themeId);

        const content = <div className="screen-container">
            <h3>{theme && theme.title}: {topic && topic.title}</h3>
            {topic ? <div>
                <p className="topic-description">
                    {topic && topic.description}
                </p>

                <Questions topicId={topicId}/>

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
            </div> : <div>
                <div className="no-message">There are no topics, please try to set global mark for this theme and finish
                    this theme
                </div>
                <div className="marks">
                    {
                        marks.map(item =>
                            <RaisedButton
                                key={`set-mark-${item.value}`}
                                id={`set-mark-${item.value}`}
                                onTouchTap={() => this.setThemeMark(item.value)}
                                backgroundColor={topics[theme.id] && topics[theme.id].averageMark === item.value ? item.activeColor : null}
                                style={commonButtonStyles}
                                icon={<FontIcon className="material-icons mark-text">{item.iconName}</FontIcon>}
                            />
                        )
                    }
                </div>
            </div>}

            <RaisedButton fullWidth={true} primary={true} label="Go Next" onTouchTap={this.openNext}/>
        </div>;

        return <div>
            {this.props.data.interview.isLoading ? <LinearProgress mode="indeterminate"/> : content}
        </div>;
    }
});

export default withStore(TopicPage);
