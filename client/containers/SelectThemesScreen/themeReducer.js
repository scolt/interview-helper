import update from 'react-addons-update';

export default function (state, action) {
    if (action.type === 'startProcessing' && action.reqData.model === 'themes') {
        return update(state, {$merge: {isLoading: true}});
    }

    if (action.type === 'endProcessing' && action.reqData.model === 'themes') {
        const appliedThemes = {};
        action.resData.forEach(item => {
            appliedThemes[item.id] = true;
        });

        return update(
            state,
            {
                $merge: {
                    isLoading: false,
                    themes: [...action.resData],
                    appliedThemes: appliedThemes,
                    activeThemeId: Object.keys(appliedThemes)[0]
                }
            });
    }

    if (action.type === 'selectTheme') {
        let {appliedThemes, activeThemeId} = state;
        activeThemeId = null;
        appliedThemes[action.field] = action.value;
        Object.keys(appliedThemes).forEach(key => {
            if (appliedThemes[key] && activeThemeId === null) {
                activeThemeId = key;
            }
        });
        return update(
            state,
            {
                $merge: {
                    appliedThemes: {...appliedThemes},
                    activeThemeId: activeThemeId
                }
            });
    }

    return false;
}
