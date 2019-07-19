import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import {DialogTitle} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import QRCode from 'qrcode.react'

class Receive extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
        };

    }

    openModal = () => {
        this.setState({isModalOpen: true})
    };

    closeModal = () => {
        this.setState({isModalOpen: false})
    };

    render() {
        return (
            <div className="grid-half">
                <button className="colored-button" id="receiveButton" onClick={this.openModal}>Receive</button>
                <ReceiveModal open={this.state.isModalOpen} closeModal={() => this.closeModal()} address={this.props.address}/>
            </div>
        )
    }
}

class ReceiveModal extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            open: props.open
        };
    }

    render() {
        let qrSize = Math.min(document.documentElement.clientWidth, 512) - 90;
        return (
            <Dialog open={this.props.open}>
                <DialogTitle>Receive
                </DialogTitle>
                <DialogContent style={{textAlign: "center"}}>
                    <div className="content qr row" style={{cursor: "pointer"}}>
                        <QRCode value={this.props.address} size={qrSize}/>
                        <div className="input-group">
                            <input type="text" className="address-input" value={this.props.address} disabled/>
                            {/*<div className="input-group-append">*/}
                            {/*        <span className="input-group-text"><i style={{color: "#999999"}}*/}
                            {/*                                              className="fas fa-copy"/></span>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                    <button onClick={this.props.closeModal} >CLOSE</button>
                </DialogContent>
            </Dialog>
        );
    }

}

export default Receive