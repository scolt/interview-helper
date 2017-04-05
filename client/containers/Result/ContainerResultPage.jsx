import React from 'react';
import withStore from 'common/components/withStore/withStore';
import {RaisedButton, List, Subheader, ListItem, Divider, TextField} from 'material-ui';
import restApi from 'common/actions/restApi';

import FontIcon from 'material-ui/FontIcon';

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
    componentWillMount() {
        this.props.store.dispatch({
            type: 'preparePayload'
        });
    },

    finishInterview() {
        this.props.store.dispatch({
            type: 'clearStorageAndGoHome'
        });
    },

    emailChange(e) {
        this.props.store.dispatch({
            type: 'setAttribute',
            field: 'interviewerEmail',
            value: e.target.value
        });
    },

    sendToEmail() {
        this.props.store.dispatch({
            type: 'preparePayload'
        });

        this.props.store.dispatch(restApi({
            method: 'post',
            model: 'email'
        }));
    },

    render() {
        const {payload, interviewerEmail, emailSend} = this.props.data.interview;

        console.log(emailSend);

        const content = payload && <div>
                <h3>Summary result for <i>{payload.candidateName}</i>:</h3>
                <p>
                    Target position: <strong>{payload.positionName}</strong>
                </p>
                <p>Applied themes: {payload.appliedResultThemes.map(item =>
                    <span key={item.title.toLowerCase()}><strong>{item.title}</strong>, &nbsp;</span>)} </p>

                <p>
                    <strong>What was good:</strong><br />
                    <i>{payload.candidateName}</i> shown himself as specialist with good understanding in next
                    topics:&nbsp;
                    {payload.sorted.good.map(goodItem => `"${goodItem}", `)}
                </p>

                <p>
                    <strong>What should be improved:</strong><br />
                    <i>{payload.candidateName}</i> have a lot of gaps in next topics:&nbsp;
                    {payload.sorted.bad.map(badItem => `"${badItem}", `)}
                </p>

                <p>
                    <strong>Summary:</strong><br />
                    <i>{payload.candidateName}</i> shown himself as specialist with {payload.qualification}&nbsp;
                    qualification.
                </p>

                <h3>Report in numbers</h3>

                <List>
                    <Divider />
                    {payload.appliedResultThemes.map(theme =>
                        <div key={theme.title.toLowerCase().replace(' ', '')}
                             id={`theme-${theme.title.toLowerCase().replace(' ', '')}`}>
                            <Divider />
                            <ListItem
                                leftAvatar={<span className="list-mark"
                                                  style={{color: getParams(theme.themeMark).color}}>{theme.themeMark}</span>}
                                primaryText={theme.title}
                                nestedItems={theme.topics.map(topic =>
                                    <ListItem key={topic.title.toLowerCase().replace(' ', '')}
                                              id={topic.title.toLowerCase().replace(' ', '')}
                                              primaryText={topic.title}
                                              leftAvatar={<span
                                                  className="list-mark">{topic.topicMark}</span>}
                                    />
                                )}
                            />
                        </div>)
                    }
                </List>

                <div className="align-center">
                    <div className="av-mark" style={{borderColor: getParams(payload.globalMark).color}}>
                        {payload.globalMark}
                    </div>
                    <div className="nextThemeButton">
                        <RaisedButton fullWidth={true} label="Finish" primary={true} onTouchTap={this.finishInterview}/>
                    </div>
                </div>

                <br/>
                <br/>

                {emailSend ? 'Your email was send.' : <div><h3>Send the report to email</h3>
                    <div className="align-center">
                        <TextField
                            className="name-input"
                            onChange={this.emailChange}
                            fullWidth={true}
                            hintText="Interviewer Email"
                        />
                        <div className="button-action">
                            <RaisedButton
                                disabled={!interviewerEmail}
                                onTouchTap={this.sendToEmail}
                                primary={true}
                                icon={<FontIcon className="material-icons">email</FontIcon>}
                            />
                        </div>
                    </div>
                </div>}

            </div>;

        return <div className="screen-container">
            {!payload ? 'Loading' : content}
        </div>;
    }
});

export default withStore(IntermediateResultPage);
