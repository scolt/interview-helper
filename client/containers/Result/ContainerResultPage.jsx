import React from 'react';
import withStore from 'common/components/withStore/withStore';
import {finishInterview} from 'common/actions/interview';
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
    if (value > 4) {
        color = green600;
    } else if (value > 3) {
        color = indigo300;
    } else if (value > 1.5) {
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
        this.props.store.dispatch(finishInterview);
    },

    emailChange(e, newValue) {
        this.props.store.dispatch({
            type: 'setAttribute',
            field: 'interviewerEmail',
            value: newValue
        });
    },

    restoreEmail() {
        this.props.store.dispatch({
            type: 'restoreEmail'
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

    getDirectLink() {
        this.props.store.dispatch({
            type: 'preparePayload'
        });

        this.props.store.dispatch(restApi({
            method: 'post',
            model: 'report'
        }));
    },

    render() {
        const {payload, interviewerEmail, emailSend, validators, directLink} = this.props.data.interview;
        const content = payload && <div>
                <h3>Summary result for <i>{payload.candidateName}</i>:</h3>
                <p>
                    Target position: <strong>{payload.positionName}</strong>
                </p>
                <p>Applied themes: {payload.appliedResultThemes.map(item =>
                    <span key={item.title.toLowerCase()}><strong>{item.title}</strong>, &nbsp;</span>)} </p>

                {payload.sorted.good.length ? <div>
                    <p>
                        <strong>What was good:</strong><br />
                        <i>{payload.candidateName}</i> shown himself as specialist with good understanding in next
                        topics:&nbsp;
                    </p>
                    <ul>
                        {payload.sorted.good.map(goodItem => goodItem.topics.length > 0 &&
                            <li
                                id={`theme-${goodItem.title.replace(' ', '')}`}
                                key={`theme-${goodItem.title.replace(' ', '')}`}>
                                <strong>{goodItem.title}:</strong> "{goodItem.topics.join('", "')}"
                            </li>)}
                    </ul>
                </div> : null}

                {payload.sorted.poor.length ? <div>
                    <p>
                        <strong>What should be improved:</strong><br />
                        <i>{payload.candidateName}</i> have poor knowledge and some misunderstandings in next topics:&nbsp;
                    </p>
                    <ul>
                        {payload.sorted.poor.map(poorItem => poorItem.topics.length > 0 &&
                        <li
                            id={`theme-${poorItem.title.replace(' ', '')}`}
                            key={`theme-${poorItem.title.replace(' ', '')}`}>
                            <strong>{poorItem.title}:</strong> "{poorItem.topics.join('", "')}"
                        </li>)}
                    </ul>
                </div> : null}

                {payload.sorted.bad.length ? <div>
                    <p>
                        <i>{payload.candidateName}</i> have a lot of gaps in next topics:&nbsp;
                    </p>
                    <ul>
                        {payload.sorted.bad.map(badItem => badItem.topics.length > 0 &&
                        <li
                            id={`theme-${badItem.title.replace(' ', '')}`}
                            key={`theme-${badItem.title.replace(' ', '')}`}>
                            <strong>{badItem.title}:</strong> "{badItem.topics.join('", "')}"
                        </li>)}
                    </ul>
                </div> : null}

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
                                primaryTogglesNestedList={true}
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
                </div>

                <br/>

                <h3>Save the report</h3>
                {emailSend ? <div className="success-email-send">
                    <FontIcon className="material-icons">email</FontIcon>
                    <span>Your email was sent.</span>
                    <a className="action"><FontIcon className="material-icons" onTouchTap={this.restoreEmail}>settings_backup_restore</FontIcon></a>
                </div> : <div>
                    <div className="align-center">
                        <TextField
                            className="name-input"
                            onChange={this.emailChange}
                            fullWidth={true}
                            value={interviewerEmail}
                            hintText="Interviewer Email"
                        />
                        <div className="button-action">
                            <RaisedButton
                                fullWidth={true}
                                label="Send the report to email"
                                disabled={validators.interviewerEmail.error}
                                onTouchTap={this.sendToEmail}
                                primary={true}
                                icon={<FontIcon className="material-icons">email</FontIcon>}
                            />
                        </div>
                    </div>
                </div>}

                <br />
                {directLink ? <div className="success-email-send">
                    <FontIcon className="material-icons">link</FontIcon>
                    <a href={directLink} target="_blank">Direct link to the report</a>
                </div> : <RaisedButton
                    fullWidth={true}
                    secondary={true}
                    onTouchTap={this.getDirectLink}
                    label="Get direct link to report"
                    icon={<FontIcon className="material-icons">link</FontIcon>}
                />}

                <div>
                    <br />
                    <h3>Finish the interview</h3>
                    <RaisedButton fullWidth={true} label="Finish" primary={true} onTouchTap={this.finishInterview}/>
                </div>


            </div>;

        return <div className="screen-container">
            {!payload ? 'Loading' : content}
        </div>;
    }
});

export default withStore(IntermediateResultPage);
