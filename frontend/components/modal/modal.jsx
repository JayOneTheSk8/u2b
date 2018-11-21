import React from 'react';

class Modal extends React.Component {
  render() {
    return (
      <div onClick={this.props.clearScreen} className={`modal-${this.props.status}`}></div>
    );
  }
}

export default Modal;
