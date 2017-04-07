import update from 'react-addons-update';

export default function (state, action) {
    if (action.type === 'startProcessing' && action.reqData.model === 'themes') {
        return update(state, {$merge: {isLoading: true}});
    }

    if (action.type === 'endProcessing' && action.reqData.model === 'themes') {
        const appliedThemes = [];
        action.resData.forEach(item => {
            appliedThemes.push(item.id);
        });

        return update(
            state,
            {
                $merge: {
                    isLoading: false,
                    themes: [...action.resData],
                    appliedThemes: appliedThemes,
                    activeThemeId: appliedThemes[0]
                }
            });
    }

    if (action.type === 'selectTheme') {
        let {appliedThemes, activeThemeId, themes} = state;

        const tmpAppliedThemes = [];

        if (action.value) {
            appliedThemes.push(action.field);
        } else {
            const indexToDelete = appliedThemes.findIndex(item => item === action.field);
            appliedThemes.splice(indexToDelete, 1);
        }


        themes.forEach(item => {
            if (appliedThemes.includes(item.id)) tmpAppliedThemes.push(item.id);
        });

        activeThemeId = tmpAppliedThemes[0];

        return update(
            state,
            {
                $merge: {
                    appliedThemes: tmpAppliedThemes,
                    activeThemeId: activeThemeId
                }
            });
    }

    return false;
}
