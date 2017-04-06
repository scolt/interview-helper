import model from './common/ModelInterview';

import interviewReducer from './common/interviewReducer';
import themeReducer from './SelectThemesScreen/themeReducer';
import positionReducer from './PositionsScreen/positionReducer';
import topicReducer from './Topics/topicReducer';
import intermediateReducer from './IntermediateResult/intermediateReducer';
import questionReducer from './Topics/components/questionsReducer';
import resultReducer from './Result/resultReducer';
import storageReducer from 'common/reducers/storageReducer';

import config from 'common/config/config';
export const STORAGE_KEY = 'intrvw-main-' + config.version;

const reducers = [
    interviewReducer,
    themeReducer,
    positionReducer,
    topicReducer,
    intermediateReducer,
    questionReducer,
    resultReducer
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
