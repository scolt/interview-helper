import update from 'react-addons-update';
import mainModel from '../common/mainModel';

export default function main(state = mainModel, action) {
    if (action.type === 'redirect') {
        setTimeout(() => {
            window.location.hash = action.path;
        });
    }

    return state;
}
