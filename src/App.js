import React from 'react';
import './App.css';
import Wallet from './component/Wallet.js'

const address = "0xd9nreoqwei2020dDiqoelqDnq02";

class App extends React.Component{
  render (){
      return (
          <div className="App">
              <Wallet address={address}/>
              <div className="App-qr">
                  <div className="App-inner-qr">
                      <a className="App-inner-qr-url" href="#">
                        <img className="App-inner-qr-image" src={process.env.PUBLIC_URL + '/qrcode.png'}/>
                      </a>
                  </div>
              </div>
          </div>

      );
  }
}

export default App;
