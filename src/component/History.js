import React from 'react'
import Dialog from "@material-ui/core/Dialog";
import {DialogTitle} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";


class History extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
        };
    }

    render() {
        return (
            <div className="grid-double-wider">
                <button onClick={this.openModal} className="bordered-button" id="historyButton">History</button>
                <HistoryModal open={this.state.isModalOpen}
                              closeModal={() => this.closeModal()}
                              send={() => this.send()}/>
            </div>
        );
    }

    openModal = () => {
        this.setState({isModalOpen: true});
    };

    closeModal = () => {
        this.setState({isModalOpen: false});
    };

}

class HistoryModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
            histories: []
        };
    }

    componentDidMount() {
        this._getHistoryData();
    }

    render() {
        return (
            <Dialog open={this.props.open}>
                <button className="close-button" onClick={this.props.closeModal}>Close</button>
                <DialogTitle style={{textAlign: "center"}}>Payment History</DialogTitle>
                <DialogContent style={{textAlign: "center"}}>
                    <table id='historyTable'>
                        <thead>
                        <tr>
                            <th className='history-table-head'>Event</th>
                            <th className='history-table-head'>Target</th>
                            <th className='history-table-head'>Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.histories ? this._renderHistory() : "Loading"}
                        </tbody>
                    </table>
                </DialogContent>
            </Dialog>
        );
    }

    _renderHistory() {
        const histories = this.state.histories.map((history, index) => {
            return (
                <HistoryItem key={index} event={history.event} target={history.target} amount={history.amount}/>
            )

        });
        return histories;
    }

    _getHistoryData = () => {
        //process.env.REACT_APP_RAIDEN_NODE_ADDRESS +"/api/v1/payments/"+ this.props.tokenAddress)
        fetch(process.env.REACT_APP_RAIDEN_NODE_ADDRESS + "/api/v1/payments/0x4f50C3bCbAC121D1C1f7E2Eee408e63D0F2fc6cB")
            .then(res => res.json())
            .then((data) => {
                this.setState({
                        histories: data
                    }
                );
            }).catch(err => console.log(err))
    }

}

class HistoryItem extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        console.log(this.props.event);

        return (
            <tr>
                <td><span className='history-item-event'>{this._convertEventString(this.props.event)}</span></td>
                <td><span className='history-item-target'>{this._cutEthereumAddress(this.props.target)}</span></td>
                <td><span className='history-item-amount'>{this.props.amount}</span></td>
            </tr>
        )
    }

    _convertEventString(eventString) {
        console.log(eventString);
        switch (eventString) {
            case 'EventPaymentReceivedSuccess':
                return 'Receive';
            case 'EventPaymentSentSuccess':
                return 'Send';
            default:
                return '';
        }
    }

    _cutEthereumAddress(address) {
        if (address) {
            return address.substring(0, 8);
        }
        return '';
    }


}

export default History