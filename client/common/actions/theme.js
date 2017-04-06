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
        setTimeout(() => window.location.hash = 'topics');
    } else {
        setTimeout(() => window.location.hash = 'result');
    }
}
