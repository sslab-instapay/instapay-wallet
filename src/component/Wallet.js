import React from 'react'
import AccountDisplay from './AccountDisplay'
import Send from './Send'
import Receive from './Receive'
import BalanceDisplay from './BalanceDisplay'
import Request from "./Request"
import LinkButton from "./LinkButton"
import Share from "./Share"


class Wallet extends React.Component{

    render() {
        return(
            <div className="App-wallet">
                <AccountDisplay/>

                <div className="App-wallet-body">
                    <BalanceDisplay>

                    </BalanceDisplay>
                    <hr className="border-line"/>

                    <div className="wrapper">
                        <div className="grid-row">
                            <Receive/>
                            <Send/>
                        </div>

                        <div className="grid-row">
                            <LinkButton/>
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