import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import {DialogTitle} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import QRCode from 'qrcode.react'
class Receive extends React.Component {

    constructor(props){
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
                <ReceiveModal open={this.state.isModalOpen}/>
            </div>
        )
    }
}

class ReceiveModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    render() {
        let qrSize = Math.min(document.documentElement.clientWidth, 512) - 90;
        let qrValue = "0xqwe23024j2ijtql2ntkq2tn4oq2keo2";
        return (
            <div>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>Receive</DialogTitle>
                    <DialogContent>
                        <div className="content qr row" style={{cursor: "pointer"}}>
                            <QRCode value={qrValue} size={qrSize}/>
                            <div className="input-group">
                                <input type="text" className="form-control" style={{color: "#999999"}}
                                       value="0xqwjeirji23232" disabled/>
                                <div className="input-group-append">
                                    <span className="input-group-text"><i style={{color: "#999999"}}
                                                                          className="fas fa-copy"/></span>
                                </div>
                            </div>
                        </div>
                        <div style={{width: "100%", textAlign: 'center', padding: 20}}>
                            <a href={"https://blockscout.com/poa/dai/address/transactions"} target="_blank">
                                View on Blockscout
                            </a>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }

    handleClose = () => {
        this.setState({open: false})
    };

}

export default Receive