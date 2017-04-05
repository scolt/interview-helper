import update from 'react-addons-update';
export default function (state, action) {
    if (action.type === 'endProcessing' && action.reqData.model === 'email') {
        return update(state, {
            $merge: {
                emailSend: true
            }
        });
    }

    if (action.type === 'preparePayload') {
        const {candidateName, activePositionId, positions, themes, topics, interviewerEmail} = state;

        // Position Name:
        const positionName = positions.find(item => item.id === activePositionId).title;

        const sorted = {
            good: [],
            bad: []
        };

        const appliedResultThemes = [];

        let totalMarks = 0, totalResult = 0;
        themes.forEach(theme => {
            if (topics[theme.id] && typeof topics[theme.id].averageMark === 'number') {
                totalMarks++;
                totalResult += +topics[theme.id].averageMark;
                appliedResultThemes.push({
                    id: theme.id,
                    title: theme.title,
                    themeMark: topics[theme.id].averageMark,
                    topics: topics[theme.id].entities.filter(topic =>
                        typeof topic.mark === 'number'
                    ).map(topic => {
                        if (topic.mark >= 2) {
                            sorted.good.push(topic.title);
                        } else if (topic.mark <= 1) {
                            sorted.bad.push(topic.title);
                        }

                        return {
                            title: topic.title,
                            topicMark: topic.mark
                        };
                    })
                });
            }
        });

        const globalMark = Math.round(totalResult / totalMarks * 10) / 10;

        let qualification = 'no';

        if (globalMark > 2) {
            qualification =  'high';
        } else if (globalMark > 1.5) {
            qualification = 'medium';
        } else if (globalMark > 0.8) {
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
