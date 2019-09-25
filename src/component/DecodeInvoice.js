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
                <button className="bordered-button" id="shareButton" onClick={this.openModal}>Send via invoice</button>
                <DecodeModal open={this.state.isModalOpen}
                           closeModal={() => this.closeModal()}
                           send={() => this.send()}
                           reloadWallet={this.props.reloadWallet}/>
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
        this.state = {
            open: props.open,
            sendAddress: '',
            amount: 0
        };
    }

    send = () => {
        var sendAddress = document.getElementById("sendAddress").value;
        var amount = document.getElementById("amount").value;
        let formData = new FormData();
        formData.append('amount', amount);
        formData.append('addr', sendAddress);

        fetch(process.env.REACT_APP_INSTA_NODE_ADDRESS + "/channels/requests/server", {
            method: 'POST',
            body: formData
        }).then(function (response) {
            if (!response.ok){
                throw Error(response.statusText);
            }else{
                return response.json()
            }
        }).then((data) => {
            alert('payment success to ' + data['sendAddress'] + ' amount : ' + data['amount']);
            this.props.reloadWallet();
        }).catch(err => console.log(err));
        this.props.closeModal()
    };

    handleInvoiceChange = (e) => {
        console.log(e.target.value);
        var data = e.target.value;
        if(data.length > 15){
            var Invoice = require('.././service/invoice');

            var decodedInvoice = Invoice.decodeInvoice(data);
            this.setState({
                amount: decodedInvoice['amount'],
                sendAddress: decodedInvoice['publicKey']
            });
            console.log("--END--");
            console.log(this.state.amount);
        }
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
                <DialogTitle style={{textAlign: "center"}}>Send via invoice</DialogTitle>
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
                            <input name="invoice" type="text" className="address-input" placeholder="INSTA..."
                                   onChange={this.handleInvoiceChange}/>
                        </div>
                        <div className="input-group">
                            <input id="sendAddress" name="sendAddress" type="text" className="address-input" placeholder="0x..."
                                   value={this.state.sendAddress} onChange={this.handleChange}/>
                        </div>
                        <div className="input-group">
                            <input id="amount" name="amount" type="number" className="address-input" placeholder="0.00"
                                   value={this.state.amount} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <button id="tokenSendButton" onClick={this.send}>Send</button>
                </DialogContent>
            </Dialog>
        );
    }


}


export default DecodeInvoice
