import React from 'react'
import Dialog from "@material-ui/core/Dialog";
import {DialogTitle} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import QrReader from 'react-qr-reader'

class Send extends React.Component {

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
                <SendModal open={this.state.isModalOpen}
                           closeModal={() => this.closeModal()}
                           send={() => this.send()} />
            </div>
        )
    }

}

class SendModal extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            open: props.open,
            sendAddress: '',
            amount: 0
        };
    }

    send = () => {
        fetch(process.env.REACT_APP_INSTA_NODE_ADDRESS + "/channel/request/server", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({addr: this.state.sendAddress, amount: Number(this.state.amount)})
        }).then(function (response) {
            if (!response.ok){
                throw Error(response.statusText);
            }else{
                return response.json()
            }
        }).then((data) => {
            alert('payment success to ' + this.state.sendAddress + ' amount : ' + this.state.amount)
        }).catch(err => console.log(err));
        this.props.closeModal()
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleScan = (data) => {
        if (data) {
            this.setState({
                sendAddress: data
            })
        }
    };

    handleError = (err) => {
        console.error(err)
    };

    render() {
        return (
            <Dialog open={this.props.open}>
                <button className="close-button" onClick={this.props.closeModal}>Close</button>
                <DialogTitle style={{textAlign: "center"}}>Send To Address</DialogTitle>
                <DialogContent style={{textAlign: "center"}}>
                    <div className="content qr row" style={{cursor: "pointer"}}>
                        <label htmlFor="amount_input">To Address</label>
                        <QrReader
                            delay={300}
                            onError={this.handleError}
                            onScan={this.handleScan}
                            style={{ width: '100%' }}
                        />
                        <p>{this.state.result}</p>
                        <div className="input-group">
                            <input name="sendAddress" type="text" className="address-input" placeholder="0x..."
                                   value={this.state.sendAddress} onChange={this.handleChange}/>
                        </div>
                        <label htmlFor="amount_input">Send Amount</label>
                        <div className="input-group">
                            <input name="amount" type="number" className="address-input" placeholder="0.00"
                            onChange={this.handleChange}/>
                        </div>
                    </div>
                    <button id="tokenSendButton" onClick={this.send}>Send</button>
                </DialogContent>
            </Dialog>
        );
    }


}


export default Send
