export function nextTheme(dispatch, getState) {
    let {activeThemeId, appliedThemes, activeTopicId} = getState().interview;

    const currentThemeIndex = appliedThemes.indexOf(activeThemeId);
    const possibleNextThemeId = appliedThemes[currentThemeIndex + 1];
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
