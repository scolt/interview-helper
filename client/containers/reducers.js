import model from './common/ModelInterview';

import interviewReducer from './common/interviewReducer';
import themeReducer from './SelectThemesScreen/themeReducer';
import positionReducer from './PositionsScreen/positionReducer';
import topicReducer from './Topics/topicReducer';
import intermediateReducer from './IntermediateResult/intermediateReducer';
import storageReducer from 'common/reducers/storageReducer';

const STORAGE_KEY = 'intrvw-main';

const reducers = [
    interviewReducer,
    themeReducer,
    positionReducer,
    topicReducer,
    intermediateReducer
];

const storage = storageReducer(STORAGE_KEY, ['setAttribute', 'redirect', 'selectTheme', 'setTopicMark', 'goToNext']);

function interview(state = model, action) {
    const candidate = reducers.reduce((prevValue, current) => {
        if (prevValue) return prevValue;
        return current(state, action, STORAGE_KEY);
    }, false);

    storage(candidate ? candidate : state, action);

    if (action.type === 'clearStorageAndGoHome') {
        return {
            inProgress: false,
            isLoading: false,
            candidateName: 'Candidate',
            activePositionId: null,
            activeThemeId: null,
            activeTopicId: null,

            appliedThemes: [],

            positions: [],
            themes: [],

            topics: {},
            questions: {}
        };
    }

    return candidate ? candidate : state;
}

export default interview;
