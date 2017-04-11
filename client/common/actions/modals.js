export function openMarkHelpModal(dispatch) {
    dispatch({
        type: 'openModal',
        modalText: `
            <ul class="mark-info">
                <li><strong><i class="material-icons">not_interested</i></strong> &mdash; has no idea about topic</li>
                <li><strong><i class="material-icons">star_border</i></strong> &mdash; has some superficial knowledge, without any details</li>
                <li><strong><i class="material-icons">star_half</i></strong> &mdash; has some knowledge with a little understanding, can do task with supervising</li>
                <li><strong><i class="material-icons">star</i></strong> &mdash; has a practice experience and understanding. can do task without major issues</li>
                <li><strong><i class="material-icons">stars</i></strong> &mdash; has a good practice experience and understand topic in the details. Able to share knowledge in this topic with less experienced colleagues.</li>
            </ul>
        `,
        modalType: 'info',
        modalClose: () => {
            dispatch({
                type: 'closeModal'
            });
        }
    });
}
