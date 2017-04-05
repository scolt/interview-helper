const interview = {
    inProgress: false,
    isLoading: false,
    questionIsLoading: false,

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

export default interview;
