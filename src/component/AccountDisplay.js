import React from 'react'


class AccountDisplay extends React.Component{

    render() {
        return(
            <div className="App-wallet-accountDisplay">
                <img id="accountImage" src={process.env.PUBLIC_URL + '/favicon.ico'}/>
                <div id="accountName">{this.props.address}</div>
            </div>
        )
    }
}

export default AccountDisplay;