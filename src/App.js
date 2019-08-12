import React from 'react';
import './App.css';
import Wallet from './component/Wallet.js';
import Web3 from 'web3';

const tokenAddresses = ["0xq2erq", "0xqiwjertijqwi"];
const balance = 50000;
const minABI = [
    {
        "constant": true,
        "inputs": [{"name": "_owner", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"name": "balance", "type": "uint256"}],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [{"name": "", "type": "uint8"}],
        "type": "function"
    }
];

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            address: process.env.REACT_APP_TEST_ADDRESS,
            tokenAddresses: tokenAddresses,
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
        return <Wallet address={this.state.address} tokenAddress={this.state.tokenAddresses[0]} balance={this.state.balance}/>
    };

    _getWalletInformation = () => {
        // Wallet Address, token address list, balance 정보
        const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_NODE_ADDRESS));
        const urls = [
            process.env.REACT_APP_RAIDEN_NODE_ADDRESS + '/api/v1/tokens',
            process.env.REACT_APP_RAIDEN_NODE_ADDRESS + '/api/v1/address'
        ];

        Promise.all([
            fetch(urls[0]),
            fetch(urls[1]),
        ])
            .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
            .then(([data1, data2]) => {
                this.setState({
                        tokenAddresses: data1,
                        address: data2['our_address']
                    }
                );
                let contract = new web3.eth.Contract(minABI, this.state.tokenAddresses[0]);
                console.log(this.state.address);
                contract.methods.balanceOf(this.state.address).call((err, result) => {
                    this.setState({
                        balance: result
                    })
                });
            })
            .catch(
                (err) => console.log(err)
            );
    }

}

export default App;
