import React from 'react';
import './App.css';
import Wallet from './component/Wallet.js'

class App extends React.Component{
  render (){
      return (
          <div className="App">
              <Wallet/>
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
