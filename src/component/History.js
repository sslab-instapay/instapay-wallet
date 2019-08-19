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
                <HistoryItem key={index} sendAddress={history.sendAddress} receiveAddress={history.receiveAddress} amount={history.amount}/>
            )

        });
        return histories;
    }

    _getHistoryData = () => {
        fetch(process.env.REACT_APP_INSTA_OPERATOR_SERVER_ADDRESS + "/payment")
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
        console.log(this.props.sendAddress);

        return (
            <tr>
                <td><span className='history-item-event'>{this._cutEthereumAddress(this.props.sendAddress)}</span></td>
                <td><span className='history-item-target'>{this._cutEthereumAddress(this.props.receiveAddress)}</span></td>
                <td><span className='history-item-amount'>{this.props.amount}</span></td>
            </tr>
        )
    }

    _cutEthereumAddress(address) {
        if (address) {
            return address.substring(0, 8);
        }
        return '';
    }


}

export default History
