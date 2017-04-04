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
    shouldComponentUpdate() {
        return false;
    },

    finishInterview() {
        this.props.store.dispatch({
            type: 'clearStorageAndGoHome'
        });
    },

    getLevel(mark) {
        if (mark > 2) {
            return 'high';
        } else if (mark > 1.5) {
            return 'medium';
        } else if (mark > 0.8) {
            return 'low';
        } else {
            return 'no';
        }
    },

    sortAllTopicsByMark() {
        const {themes, topics} = this.props.data.interview;
        const sorted = {
            good: [],
            bad: []
        };

        themes.forEach(item => {
            if (topics[item.id] && typeof topics[item.id].averageMark === 'number') {
                topics[item.id].entities.forEach(topic => {
                    if (topic.mark >= 2) {
                        sorted.good.push(topic.title);
                    } else if (topic.mark <= 1) {
                        sorted.bad.push(topic.title);
                    }
                });
            }
        });

        return sorted;
    },

    render() {
        const {candidateName, activePositionId, positions, appliedThemes, themes, topics} = this.props.data.interview;
        const positionName = positions.find(item => item.id === activePositionId).title;
        const sorted = this.sortAllTopicsByMark();


        let totalMarks = 0, totalResult = 0;
        themes.forEach(item => {
            if (topics[item.id] && typeof topics[item.id].averageMark === 'number') {
                totalMarks++;
                totalResult += +topics[item.id].averageMark;
            }
        });

        const globalMark = Math.round(totalResult / totalMarks * 10) / 10;

        return <div className="screen-container">
            <h3>Summary result for <i>{candidateName}</i>:</h3>
            <p>
                Target position: <strong>{positionName}</strong>
            </p>
            <p>Applied themes: {themes.map(item => appliedThemes[item.id] &&
            <span key={item.id}><strong>{item.title}</strong>, &nbsp;</span>)} </p>

            <p>
                <strong>What was good:</strong><br />
                <i>{candidateName}</i> shown himself as specialist with good understanding in next topics:&nbsp;
                {sorted.good.map(goodItem => `"${goodItem}", `)}
            </p>

            <p>
                <strong>What should be improved:</strong><br />
                <i>{candidateName}</i> have a lot of gaps in next topics:&nbsp;
                {sorted.bad.map(badItem => `"${badItem}", `)}
            </p>

            <p>
                <strong>Summary:</strong><br />
                <i>{candidateName}</i> shown himself as specialist with {this.getLevel(globalMark)} qualification.
            </p>

            <h3>Report in numbers</h3>

            <List>
                <Divider />
                {themes.map(item => appliedThemes[item.id] &&
                <div key={item.id} id={`theme-${item.title.replace(' ', '')}`}>
                    <Divider />
                    <ListItem
                        leftAvatar={<span className="list-mark"
                                          style={{color: getParams(topics[item.id].averageMark).color}}>{topics[item.id].averageMark || '-'}</span>}
                        primaryText={item.title}
                        nestedItems={topics[item.id].entities.map(topic => typeof topic.mark === 'number' &&
                            <ListItem key={topic.id}
                                      primaryText={topic.title}
                                      leftAvatar={<span
                                          className="list-mark">{typeof topic.mark === 'number' ? topic.mark : '-'}</span>}
                            />
                        )}
                    />
                </div>)
                }
            </List>

            <div className="progress-summary">
                <div className="av-mark" style={{borderColor: getParams(globalMark).color}}>
                    {globalMark}
                </div>
                <div className="nextThemeButton">
                    <RaisedButton label="Finish" primary={true} onTouchTap={this.finishInterview}/>
                </div>
            </div>
        </div>;
    }
});

export default withStore(IntermediateResultPage);
