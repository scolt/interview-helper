import update from 'react-addons-update';

export default function (state, action) {
    if (action.type === 'goToTheNextTheme') {
        let {activeThemeId, appliedThemes, activeTopicId} = state;
        const allChosenThemes = Object.keys(appliedThemes).reduce((prev, current) => {
            if (appliedThemes[current]) prev.push(current);
            return prev;
        }, []);

        const currentThemeIndex = allChosenThemes.indexOf(activeThemeId);
        const possibleNextThemeId = allChosenThemes[currentThemeIndex + 1];
        if (possibleNextThemeId) {
            activeThemeId = possibleNextThemeId;
            activeTopicId = null;
            setTimeout(() => window.location.hash = 'topics');
        } else {
            alert('all done');
        }

        return update(
            state,
            {
                $merge: {
                    activeThemeId,
                    activeTopicId
                }
            });
    }

    return false;
}
