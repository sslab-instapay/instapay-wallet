import React from 'react'


class AccountDisplay extends React.Component{

    render() {
        return(
            <div className="App-wallet-accountDisplay">
                <img id="accountImage" src={process.env.PUBLIC_URL + '/favicon.ico'}/>
                <div id="accountName">0xd9nreoqwei2020dDiqoelqDnq02</div>
            </div>
        )
    }
}

export default AccountDisplay;