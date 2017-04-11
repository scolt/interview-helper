export function openMarkHelpModal(dispatch) {
    dispatch({
        type: 'openModal',
        modalText: `
            <ul class="mark-info">
                <li><strong><i class="material-icons">star_border</i></strong> &mdash; Interviewee has no idea about topic</li>
                <li><strong><i class="material-icons">star_half</i></strong> &mdash; Interviewee has some knowledge with poor understanding</li>
                <li><strong><i class="material-icons">star</i></strong> &mdash; Interviewee has a practice experience and common understanding. can do task without major issues</li>
                <li><strong><i class="material-icons">star star</i></strong> &mdash; Interviewee has a good practice expirience and understand topic in the details. Able to share knowledge in this topic with less experienced colleagues.</li>
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
