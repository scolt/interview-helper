export function nextTopic(dispatch, getState) {
    let {activeTopicId, activeThemeId, topics} = getState().interview;
    const currentTopicIndex = topics[activeThemeId].entities.findIndex(item => item.id == activeTopicId);
    const possibleNextTopic = topics[activeThemeId].entities[currentTopicIndex + 1];
    if (possibleNextTopic) {
        dispatch({
            type: 'openNextTopic',
            topicId: possibleNextTopic.id
        });
    } else {
        dispatch({
            type: 'prepareIntermediateResult'
        });
        dispatch({
            type: 'redirect',
            path: 'progress'
        });
    }
}
