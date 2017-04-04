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

    if (action.type === 'goToNext') {
        let {activeTopicId, activeThemeId} = state;
        const topics = state.topics;
        const currentTopicIndex = topics[activeThemeId].entities.findIndex(item => item.id == activeTopicId);
        const possibleNextTopic = topics[activeThemeId].entities[currentTopicIndex + 1];
        if (possibleNextTopic) {
            activeTopicId = possibleNextTopic.id;
        } else {
            let totalMarks = 0, totalResult = 0;
            topics[activeThemeId].entities.map(item => {
                if (item.mark !== undefined) {
                    totalMarks++;
                    totalResult += parseInt(item.mark);
                }
            });

            topics[activeThemeId].averageMark = Math.round(totalResult / totalMarks * 100) / 100;
            setTimeout(() => window.location.hash = 'progress');
        }

        return update(
            state,
            {
                $merge: {
                    topics,
                    activeTopicId
                }
            });
    }

    return false;
}