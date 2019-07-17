import React from 'react'

class Request extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false,
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        console.log("helloword")
    }

    render() {
        return (
            <div className="grid-double-wider">
                <button id="requestButton" onClick={this.openModal}>Request</button>
            </div>
        )
    }

    openModal(){
        this.setState({ isModalOpen: true });
    }

    closeModal(){
        this.setState({ isModalOpen: false });
    }
}

export default Request