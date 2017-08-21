import React, { Component } from 'react';
import './Modal.css'

class Modal extends Component {
  render() {
    if(!this.props.show) {
      return null;
    }
    return (
        <div onClick={this.props.onClose}  className={"modal-outer " + (this.props.msg ? 'shown' : null)}>
           <div className="modal-inner" onClick={(e)=>{e.stopPropagation()}}>
              <h4>{this.props.msg}</h4>
              <div className="close" onClick={this.props.onClose}><h5>X</h5></div>
              <button className="btn btn-default modal-btn" onClick={this.props.onClose}>CLOSE</button> 
          </div>
        </div>

    );
  }
}


export default Modal