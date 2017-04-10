import React from 'react';
import './modal.styl';
import withStore from '../withStore/withStore';
import {FontIcon, FlatButton} from 'material-ui';

const Modal = React.createClass({
    render () {
        const {modal} = this.props.data;
        return <div>
            {modal.open ?
                <div className="modal-overlay">
                    <div className={`modal ${modal.modalType}`}>
                        <div className="modal-header">{modal.modalType}<FontIcon className="material-icons" onTouchTap={modal.modalClose}>close</FontIcon></div>
                        <div className="modal-body">
                            <div className="main-message">
                                <div className="icon"><FontIcon className="material-icons">{modal.modalType}</FontIcon></div>
                                <div className="text">{modal.modalText}</div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            {modal.confirmText ? <FlatButton label={modal.confirmText } onTouchTap={modal.modalSubmit}/> : null}
                            {modal.cancelText ? <FlatButton secondary={true} label={modal.cancelText } onTouchTap={modal.modalClose}/> : null}
                        </div>
                    </div>
                </div> : null }
        </div>;
    }
});

export default withStore(Modal);
