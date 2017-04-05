import update from 'react-addons-update';

export default function (state, action) {
    if (action.type === 'startProcessing' && action.reqData.model === 'questions') {
        return update(state, {$merge: {questionIsLoading: true}});
    }

    if (action.type === 'endProcessing' && action.reqData.model === 'questions') {

        const {questions} = state;
        questions[action.reqData.id] = {
            currentActiveIndex: 0,
            entities: [...action.resData]
        };

        return update(
            state,
            {
                $merge: {
                    questionIsLoading: false,
                    questions: {...questions}
                }
            });
    }

    if (action.type === 'selectQuestion') {
        const {questions, activeTopicId} = state;
        if (questions[activeTopicId].entities[action.value]) {
            questions[activeTopicId].currentActiveIndex = action.value;
            update(
                state,
                {
                    $merge: {
                        questions: {...questions}
                    }
                });
        }
    }
}
