import React from 'react'
import Dialog from "@material-ui/core/Dialog";
import {DialogTitle} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";


class Send extends React.Component{

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
                <button className="colored-button" id="sendButton" onClick={this.openModal}>Send</button>
                <SendModal open={this.state.isModalOpen} closeModal={() => this.closeModal()}/>
            </div>
        )
    }

}

class SendModal extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            open: props.open
        };
    }

    render() {
        let size = Math.min(document.documentElement.clientWidth, 512) - 90;
        return (
            <Dialog fullWidth={size} maxWidth={size} open={this.props.open}>
                <DialogTitle>Send To Address</DialogTitle>
                <DialogContent style={{textAlign: "center"}}>
                    <div className="content qr row" style={{cursor: "pointer"}}>
                        <label htmlFor="amount_input">To Address</label>
                        <div className="input-group">
                            <input type="text" className="address-input" placeholder="0x..."/>
                        </div>
                        <label htmlFor="amount_input">Send Amount</label>
                        <div className="input-group">
                            <input type="number" className="address-input" placeholder="0.00"/>
                        </div>
                    </div>
                    <button onClick={this.props.closeModal} >CLOSE</button>
                </DialogContent>
            </Dialog>
        );
    }

}


export default Send