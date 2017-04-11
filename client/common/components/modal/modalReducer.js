import update from 'react-addons-update';
import model from './ModelModal';


export default function main(state = model, action) {
    if (action.type === 'openModal') {
        const {modalText, showIcon, modalType, modalSubmit, modalClose, confirmText, cancelText} = action;
        return update(state, {
            $merge: {
                open: true,
                showIcon: showIcon || false,
                modalText: modalText || '',
                modalType: modalType || 'info',
                confirmText: confirmText || '',
                cancelText: cancelText || '',
                modalSubmit: modalSubmit || (() => {}),
                modalClose: modalClose || (() => {})
            }
        });
    }

    if (action.type === 'closeModal') {
        return update(state, {
            $merge: {
                open: false
            }
        });
    }

    return state;
}
