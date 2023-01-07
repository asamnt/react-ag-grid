import React, { Component } from "react";

class NameFieldComponent extends Component {
  constructor(props) {
    super(props);
    this.value = this.props.value;
    this.rowIndex = this.props.rowIndex;
    //we are keeping track of internal state of the component, but we are using data from other parts of the grid
    this.id = this.props.data.id;
    //we have access to all of the rows data, and not just the value we are passing in field
    this.api = props.api;
    this.state = {
      flaggedForReview: false,
    };
  }

  flag = () => {
    //this fn will be called when flag for review button is clicked
    alert(`${this.value} is flagged for review! (id: ) ${this.id}`);
    this.setState({ flaggedForReview: true });
    //we could call an api here that would actually update the state in the backend
  };

  render() {
    return (
      <div>
        <span style={{ color: this.state.flaggedForReview ? "red" : "black" }}>
          {this.value}!!!
        </span>
        <button
          type="button"
          style={{ marginLeft: "5px" }}
          onClick={this.flag}
          disabled={this.state.flaggedForReview}
        >
          Flag for Review!
        </button>
      </div>
    );
  }
}

export default NameFieldComponent;
