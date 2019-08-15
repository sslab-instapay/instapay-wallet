import React from 'react';
import './App.css';
import Wallet from './component/Wallet.js';

const balance = 50000;
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            address: process.env.REACT_APP_TEST_ADDRESS,
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
        const urls = [
            process.env.REACT_APP_INSTA_NODE_ADDRESS + '/accounts/balances',
            process.env.REACT_APP_INSTA_NODE_ADDRESS + '/accounts'
        ];


        Promise.all([
            fetch(urls[0], urls[1]),
        ])
            .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
            .then(([data1, data2]) => {
                this.setState({
                        balance: data1,
                        address: data2
                    }
                );
            })
            .catch(
                (err) => console.log(err)
            );
    }

}

export default App;
