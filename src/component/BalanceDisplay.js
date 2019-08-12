import React from 'react'

const coinTypesImageUrl = {
    customToken: "https://cdn.investinblockchain.com/wp-content/uploads/2017/12/eos-3-300x300.png",
    ethereum: "http://www.bitsnow.co.kr/Upload/UserEvent/Contents/bitsnow2/FOHXRPKG38TH0QWQX7T4.png",
    bitcoin: "data:image/png;base64,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"
};

const coinTypesPrifix = {
    customToken: "WTN",
    ethereum: "ETH",
    bitcoin: "BTC"
};


class BalanceDisplay extends React.Component{

    render() {
        return (
            <div className="balance-display">
                <img title={this.props.tokenAddress} alt={this.props.tokenAddress} id="coinIcon" src={coinTypesImageUrl[this.props.type]}/>
                <div id="balance">
                    {this.props.balance + " "+ coinTypesPrifix[this.props.type]}
                </div>
            </div>
        );
    }

}

export default BalanceDisplay