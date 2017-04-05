const interview = {
    inProgress: false,
    isLoading: false,
    questionIsLoading: false,
    emailSend: false,

    candidateName: 'Candidate',
    interviewerEmail: '',
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
