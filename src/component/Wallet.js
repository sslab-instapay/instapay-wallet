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
        console.log(this.props.tokenAddress);
        return(
            <div className="wallet">
                <AccountDisplay address={this.props.address}/>

                <div className="wallet-body">
                    <BalanceDisplay type="customToken" balance={this.props.balance} tokenAddress={this.props.tokenAddress} />
                    <hr className="border-line"/>

                    <div className="wrapper">
                        <div className="grid-row">
                            <Receive address={this.props.address}/>
                            <Send tokenAddress={this.props.tokenAddress}/>
                        </div>
                        <div className="grid-row">
                            <Request address={this.props.address} tokenAddress={this.props.tokenAddress}/>
                            <DecodeInvoice/>
                        </div>
                        <div className="grid-row">
                            <History address={this.props.address} tokenAddress={this.props.tokenAddress}/>
                        </div>
                    </div>

                </div>

            </div>
        )
    }

}

export default Wallet