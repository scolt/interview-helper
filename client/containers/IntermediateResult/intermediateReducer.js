import update from 'react-addons-update';

export default function (state, action) {
    if (action.type === 'openNextTheme') {
        let activeThemeId = action.themeId;
        let activeTopicId = null;
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
