import update from 'react-addons-update';

export default function (state, action) {
    function storeThemesInRightOrder(appliedThemes, themes) {
        const tmpAppliedThemes = [];
        themes.forEach(item => {
            if (appliedThemes.includes(item.id)) tmpAppliedThemes.push(item.id);
        });
        return tmpAppliedThemes;

    }

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

    if (action.type === 'addNewTheme') {
        let {appliedThemes, activeThemeId, themes} = state;
        const tmpAppliedThemes = appliedThemes.slice();
        const tmpThemes = themes.slice();
        const id = 'custom' + (new Date()).getTime();
        tmpAppliedThemes.push(id);
        tmpThemes.push({
            id: id,
            title: action.name
        });

        return update(
            state,
            {
                $merge: {
                    appliedThemes: tmpAppliedThemes,
                    themes: tmpThemes
                }
            });

    }

    if (action.type === 'moveItem') {
        let {themes, appliedThemes} = state;
        const tmpThemes = themes.slice();
        const currentIndex = themes.findIndex(item => item.id == action.id);
        let indexForSwap = 0;
        if (action.direction === 'up') {
            indexForSwap = currentIndex - 1 > -1 ? currentIndex - 1 : -1;
        } else {
            indexForSwap = currentIndex + 1 < tmpThemes.length ? currentIndex + 1 : -1;
        }

        if (indexForSwap > -1) {
            const tmpLinkValue = tmpThemes[currentIndex];
            tmpThemes[currentIndex] = tmpThemes[indexForSwap];
            tmpThemes[indexForSwap] = tmpLinkValue;
        }

        const tmpAppliedThemes = storeThemesInRightOrder(appliedThemes, tmpThemes);
        const activeThemeId = tmpAppliedThemes[0];

        return update(
            state,
            {
                $merge: {
                    appliedThemes: tmpAppliedThemes,
                    themes: tmpThemes,
                    activeThemeId: activeThemeId
                }
            });
    }

    if (action.type === 'selectTheme') {
        let {appliedThemes, activeThemeId, themes} = state;

        if (action.value) {
            appliedThemes.push(action.field);
        } else {
            const indexToDelete = appliedThemes.findIndex(item => item === action.field);
            appliedThemes.splice(indexToDelete, 1);
        }

        const tmpAppliedThemes = storeThemesInRightOrder(appliedThemes, themes);
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
