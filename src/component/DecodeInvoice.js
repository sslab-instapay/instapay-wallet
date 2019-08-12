import React from 'react'
import Dialog from "@material-ui/core/Dialog";
import {DialogTitle} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import QrReader from "react-qr-reader";

class DecodeInvoice extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
        };
    }

    render() {
        return (
            <div className="grid-half">
                <button className="bordered-button" id="shareButton" onClick={this.openModal}>DecodeInvoice</button>
                <DecodeModal open={this.state.isModalOpen}
                           closeModal={() => this.closeModal()}
                           send={() => this.send()}/>
            </div>
        );
    }

    openModal = () => {
        this.setState({isModalOpen: true})
    };

    closeModal = () => {
        this.setState({isModalOpen: false})
    };
}

class DecodeModal extends React.Component {

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
        fetch(process.env.REACT_APP_RAIDEN_NODE_ADDRESS + "/api/v1/payments/" + this.props.tokenAddress + "/" + this.state.sendAddress, {
            method: 'POST',
            body: JSON.stringify({amount: this.state.amount})
        }).then(function (response) {
            if (!response.ok){
                throw Error(response.statusText);
            }else{
                return response.json()
            }
        }).then((data) => {
            alert('payment success to ' + data['target_address'] + ' amount : ' + data['amount'])
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
            var Invoice = require('.././service/invoice');
            var decodedInvoice = Invoice.decodeInvoice(data);
            this.setState({
                amount: decodedInvoice['amount'],
                sendAddress: decodedInvoice['sendAddress']
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
                <DialogTitle style={{textAlign: "center"}}>Decode Invoice</DialogTitle>
                <DialogContent style={{textAlign: "center"}}>
                    <div className="content qr row" style={{cursor: "pointer"}}>
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


export default DecodeInvoice