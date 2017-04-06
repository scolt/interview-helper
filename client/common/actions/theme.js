export function nextTheme(dispatch, getState) {
    let {activeThemeId, appliedThemes, activeTopicId} = getState().interview;
    const allChosenThemes = Object.keys(appliedThemes).reduce((prev, current) => {
        if (appliedThemes[current]) prev.push(current);
        return prev;
    }, []);

    const currentThemeIndex = allChosenThemes.indexOf(activeThemeId);
    const possibleNextThemeId = allChosenThemes[currentThemeIndex + 1];
    if (possibleNextThemeId) {
        dispatch({
            type: 'openNextTheme',
            themeId: possibleNextThemeId
        });
        dispatch({
            type: 'redirect',
            path: 'topics'
        });
    } else {
        dispatch({
            type: 'redirect',
            path: 'result'
        });
    }
}
