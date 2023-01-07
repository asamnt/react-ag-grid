import React, { Component } from "react";

class NameFieldComponent extends Component {
  constructor(props) {
    super(props);
    this.value = this.props.value;
    this.rowIndex = this.props.rowIndex;
  }

  render() {
    return (
      <div>
        <span style={{ fontWeight: this.rowIndex % 2 ? "400" : "800" }}>
          {this.value}!!!
        </span>
      </div>
    );
  }
}

export default NameFieldComponent;
