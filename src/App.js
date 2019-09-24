import React from 'react';
import './App.css';
import Wallet from './component/Wallet.js';

const balance = 50000;


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            address: '',
            //address: TEST_ADDRESS,
            balance: balance
        };

    }

    componentDidMount() {
        this.getWalletInformation();
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
        return <Wallet address={this.state.address} balance={this.state.balance} reloadWallet={() => this.getWalletInformation()} />
    };

    getWalletInformation = () => {
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
