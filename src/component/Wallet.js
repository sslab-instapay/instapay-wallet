import React from 'react'
import AccountDisplay from './AccountDisplay'
import Send from './Send'
import Receive from './Receive'
import BalanceDisplay from './BalanceDisplay'
import Request from "./Request"
import Link from "./Link"
import Share from "./Share"


class Wallet extends React.Component{

    render() {
        return(
            <div className="App-wallet">
                <AccountDisplay address={this.props.address}/>

                <div className="App-wallet-body">
                    <BalanceDisplay type="ethereum" balance={100.00}>

                    </BalanceDisplay>
                    <hr className="border-line"/>
                    <BalanceDisplay type="bitcoin" balance={10.00}>

                    </BalanceDisplay>
                    <hr className="border-line"/>

                    <div className="wrapper">
                        <div className="grid-row">
                            <Receive address={this.props.address}/>
                            <Send/>
                        </div>

                        <div className="grid-row">
                            <Link/>
                            <Share/>
                        </div>

                        <div className="grid-row">
                            <Request/>
                        </div>
                    </div>

                </div>

            </div>
        )
    }

}

export default Wallet