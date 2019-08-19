import React from 'react';
import './App.css';
import Wallet from './component/Wallet.js';

const balance = 50000;
const TEST_ADDRESS= "0x000999";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // address: process.env.REACT_APP_TEST_ADDRESS,
            address: TEST_ADDRESS,
            balance: balance
        };

    }

    componentDidMount() {
        this._getWalletInformation();
    }

    render() {
        return (
            <div className="app">
                {this.state.address ? this._renderWallet() : <div>Loading...</div>}
                <div className="app-qr">
                    <div className="app-inner-qr">
                        <a className="app-inner-qr-url" href="#">
                            <img className="app-inner-qr-image" src={process.env.PUBLIC_URL + '/qrcode.png'}/>
                        </a>
                    </div>
                </div>
            </div>

        );
    }

    _renderWallet = () => {
        return <Wallet address={this.state.address} balance={this.state.balance}/>
    };

    _getWalletInformation = () => {
        console.log(process.env.REACT_APP_INSTA_NODE_ADDRESS);
        const url = process.env.REACT_APP_INSTA_NODE_ADDRESS + '/account/list';

        fetch(url)
            .then(res1 => res1.json())
            .then(data => {
                this.setState({
                        address: data.address,
                        balance: data.balance
                    }
                );
            })
            .catch(
                (err) => console.log(err)
            );
    }

}

export default App;
