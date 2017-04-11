import update from 'react-addons-update';
export default function (state, action) {
    if (action.type === 'endProcessing' && action.reqData.model === 'email') {
        return update(state, {
            $merge: {
                emailSend: true
            }
        });
    }

    if (action.type === 'endProcessing' && action.reqData.model === 'report') {
        return update(state, {
            $merge: {
                directLink: action.resData.url
            }
        });
    }

    if (action.type === 'restoreEmail') {
        return update(state, {
            $merge: {
                emailSend: false,
                interviewerEmail: ''
            }
        });
    }

    if (action.type === 'preparePayload') {
        const {candidateName, activePositionId, positions, themes, topics, interviewerEmail} = state;

        // Position Name:
        const positionName = positions.find(item => item.id === activePositionId).title;

        const sorted = {
            good: [],
            poor: [],
            bad: []
        };

        const appliedResultThemes = [];

        let totalMarks = 0, totalResult = 0;
        themes.forEach(theme => {
            if (topics[theme.id] && typeof topics[theme.id].averageMark === 'number') {
                totalMarks++;
                totalResult += +topics[theme.id].averageMark;

                const good = {
                    title: theme.title,
                    topics: []
                };
                const bad = {
                    title: theme.title,
                    topics: []
                };
                const poor = {
                    title: theme.title,
                    topics: []
                };

                appliedResultThemes.push({
                    id: theme.id,
                    title: theme.title,
                    themeMark: topics[theme.id].averageMark,
                    topics: topics[theme.id].entities.filter(topic =>
                        typeof topic.mark === 'number'
                    ).map(topic => {
                        if (topic.mark >= 4) {
                            good.topics.push(topic.title);
                        } else if (topic.mark >= 2) {
                            poor.topics.push(topic.title);
                        } else {
                            bad.topics.push(topic.title);
                        }

                        return {
                            title: topic.title,
                            topicMark: topic.mark
                        };
                    })
                });

                if (good.topics.length) sorted.good.push(good);
                if (poor.topics.length) sorted.poor.push(poor);
                if (bad.topics.length) sorted.bad.push(bad);


            }
        });

        const globalMark = Math.round(totalResult / totalMarks * 10) / 10;

        let qualification = 'no';

        if (globalMark >= 4) {
            qualification =  'high';
        } else if (globalMark >= 3) {
            qualification = 'medium';
        } else if (globalMark >= 2) {
            qualification = 'low';
        }

        let payload  = {
            appliedResultThemes,
            globalMark,
            qualification,
            candidateName,
            positionName,
            interviewerEmail,
            sorted
        };

        return update(state, {
            $merge: {
                payload: payload
            }
        });
    }

    return false;
}
