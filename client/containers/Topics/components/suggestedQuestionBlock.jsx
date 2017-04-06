import React from 'react';
import restApi from 'common/actions/restApi';
import withStore from 'common/components/withStore/withStore';
import ReactMarkdown from 'react-markdown';

import {LinearProgress, FlatButton } from 'material-ui';
import FontIcon from 'material-ui/FontIcon';

import './questions.styl';

const QuestionBlock = React.createClass({
    loadQuestions() {
        const {topicId} = this.props;
        const {questions} = this.props.data.interview;
        if (!topicId || questions[topicId]) return;

        this.props.store.dispatch(restApi({
            model: 'questions',
            id: topicId
        }));
    },

    selectQuestion(next, index) {
        this.props.store.dispatch({
            type: 'selectQuestion',
            value: next ? ++index : --index
        });
    },

    componentDidUpdate(prevProps) {
        if (this.props.topicId !== prevProps.topicId) {
            this.loadQuestions();
        }
    },

    componentWillMount() {
        this.loadQuestions();
    },

    render() {
        const {topicId} = this.props;
        const questions = this.props.data.interview.questions[topicId];
        const {questionIsLoading} = this.props.data.interview;
        const currentQuestionId = questions && typeof questions.currentActiveIndex === 'number' ? questions.currentActiveIndex : 0;
        const content = questions && questions.entities[currentQuestionId] && <div className="questions-block">
            <div className="question">
                <ReactMarkdown source={questions.entities[currentQuestionId].question} />
            </div>
            <div className="questions-nav">
                <FlatButton
                    key="prev-question"
                    id="prev-question"
                    disabled={currentQuestionId === 0}
                    onTouchTap={() => this.selectQuestion(false, currentQuestionId)}
                    primary={true}
                    icon={<FontIcon className="material-icons">skip_previous</FontIcon>}
                />
                <FlatButton
                    key="next-question"
                    id="next-question"
                    disabled={currentQuestionId === questions.entities.length - 1}
                    onTouchTap={() => this.selectQuestion(true, currentQuestionId)}
                    primary={true}
                    icon={<FontIcon className="material-icons">skip_next</FontIcon>}
                />
            </div>
        </div>;


        return <div>
            {questionIsLoading ? <div className="question-space"><LinearProgress /></div> : content}
        </div>;
    }
});

export default withStore(QuestionBlock);
