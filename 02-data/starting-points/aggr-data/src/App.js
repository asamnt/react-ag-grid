import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import NameFieldComponent from "./NameFieldComponent";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modelVisibility: true,
      columnDefs: [
        {
          headerName: "Name",
          field: "name",
          cellRenderer: "nameFieldComponent", //we can use cellRenderer to render a React component
        },
        {
          headerName: "Avatar",
          field: "avatar",
          width: 100,
          //we use cellRenderer when we want an html to be rendered
          cellRenderer: ({ value }) =>
            `<img style="height:14px width:14px src=${value}></img>`,
        },
        {
          headerName: "Address",
          //we use valueGetter when we just want to derive a new field from an existing field
          valueGetter: ({ data }) => {
            return `${data.address.city} ${data.address.street1} ${data.address.state} ${data.address.zip}`;
          },
        },
        // { headerName: "City", field: "address.city" },
        // { headerName: "State", field: "address.state" },
      ],
      defaultColDef: {
        resizable: true,
        sortable: true,
        filter: true,
      },
      rowData: [],
      frameworkComponents: {
        //this is all framework components that we want to use within ag-grid , for example a React framework component or a Angular framework component
        //we create a new state variable  that will hold the component . this is registering the component
        nameFieldComponent: NameFieldComponent,
        //we can other components here below...
      },
    };
  }

  componentDidMount() {
    fetch("/api/customers")
      .then((result) => result.json())
      .then((rowData) => this.setState({ rowData }));
  }

  onGridReady = (params) => {
    //this is a callback passed to the AgGrid so that we get the grid api access
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  };

  render() {
    return (
      <div className="ag-theme-balham" style={{ height: "800px" }}>
        <AgGridReact
          onGridReady={this.onGridReady}
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          defaultColDef={this.state.defaultColDef}
          frameworkComponents={this.state.frameworkComponents}
          // we need to pass frameworkComponents as a prop to Ag grid..we need to register the framework components with ag-grid
        ></AgGridReact>
      </div>
    );
  }
}

export default App;
