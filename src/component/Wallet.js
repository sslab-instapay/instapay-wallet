import React from 'react'
import AccountDisplay from './AccountDisplay'
import Send from './Send'
import Receive from './Receive'
import BalanceDisplay from './BalanceDisplay'
import Request from "./Request"
import History from "./History"
import DecodeInvoice from "./DecodeInvoice"


class Wallet extends React.Component{

    render() {
        return(
            <div className="wallet">
                <AccountDisplay address={this.props.address}/>

                <div className="wallet-body">
                    <BalanceDisplay type="ethereum" balance={this.props.balance} />
                    <hr className="border-line"/>

                    <div className="wrapper">
                        <div className="grid-row">
                            <Receive address={this.props.address}/>
                            <Send reloadWallet={this.props.reloadWallet}/>
                        </div>
                        <div className="grid-row">
                            <Request address={this.props.address}/>
                            <DecodeInvoice/>
                        </div>
                        <div className="grid-row">
                            <History address={this.props.address}/>
                        </div>
                    </div>

                </div>

            </div>
        )
    }

}

export default Wallet
