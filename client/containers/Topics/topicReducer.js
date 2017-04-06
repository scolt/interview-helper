import update from 'react-addons-update';

export default function (state, action) {
    if (action.type === 'startProcessing' && action.reqData.model === 'topics') {
        return update(state, {$merge: {isLoading: true}});
    }

    if (action.type === 'endProcessing' && action.reqData.model === 'topics') {
        const {topics} = state;
        topics[action.reqData.id] = {
            entities: [...action.resData]
        };

        return update(
            state,
            {
                $merge: {
                    isLoading: false,
                    topics: topics,
                    activeTopicId: action.resData[0] ? action.resData[0].id : null
                }
            });
    }

    if (action.type === 'setTopicMark') {
        let {activeTopicId, activeThemeId, topics} = state;
        const currentTopic = topics[activeThemeId].entities.find(item => item.id == activeTopicId);
        currentTopic.mark = action.value;
        return update(
            state,
            {
                $merge: {
                    topics
                }
            });
    }

    if (action.type === 'openNextTopic') {
        let activeTopicId = action.topicId;
        return update(
            state,
            {
                $merge: {
                    activeTopicId
                }
            });
    }

    if (action.type === 'prepareIntermediateResult') {
        let {activeThemeId, topics} = state;
        let totalMarks = 0, totalResult = 0;
        topics[activeThemeId].entities.map(item => {
            if (item.mark !== undefined) {
                totalMarks++;
                totalResult += parseInt(item.mark);
            }
        });

        const mark = Math.round(totalResult / totalMarks * 10) / 10;

        topics[activeThemeId].averageMark = isNaN(mark) ? null : mark;

        return update(
            state,
            {
                $merge: {
                    topics
                }
            });
    }

    return false;
}
