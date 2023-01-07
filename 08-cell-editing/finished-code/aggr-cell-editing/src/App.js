import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import NumericCellEditor from "./NumericCellEditor";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: true,
      modelVisibility: true,
      columnDefs: [
        {
          headerName: "ID",
          field: "id",
          width: 80,
        },
        {
          headerName: "First",
          field: "firstName",
        },
        {
          headerName: "Last",
          field: "lastName",
          colId: "lastName",
          editable: true,
          cellEditor: "agPopupTextCellEditor",
        },
        {
          headerName: "Acct #",
          field: "accountNumber",
          editable: true,
          cellEditor: "numericCellEditor",
        },
        {
          headerName: "Acct Name",
          field: "accountName",
          colId: "accountName",
          editable: true,
          cellEditor: "agPopupSelectCellEditor",
          cellEditorParams: {
            values: [
              "Checking Account",
              "Money Market Account",
              "Personal Loan Account",
              "Home Loan Account",
              "Credit Card Account",
              "Auto Loan Account",
              "Savings Account",
              "Investment Account",
            ],
          },
        },
        {
          headerName: "Date Opened",
          field: "dateOpened",
          valueFormatter: function (params) {
            return new Date(params.value).toLocaleDateString();
          },
        },
        {
          headerName: "Amount",
          field: "amount",
          width: 140,
          comparator: (valueA, valueB) => {
            return +valueA - +valueB;
          },
        },
      ],
      defaultColDef: {
        resizable: true,
        sortable: true,
        filter: true,
      },
      rowData: [],
      rowSelection: "multiple",
      rowDeselection: true,
      frameworkComponents: {
        numericCellEditor: NumericCellEditor,
      },
      modifiedData: [],
    };
  }

  fetchData = () => {
    console.log("sdsd");
    fetch("/api/accounts")
      .then((result) => result.json())
      .then((rowData) => this.setState({ rowData }));
  };

  componentDidMount() {
    this.fetchData();
  }

  undoEdits = () => {
    console.log("on refresh");
    this.setState({ refresh: !this.state.refresh });
    this.fetchData();
  };

  saveEdits = () => {
    console.log("on saving");
    // this.setState({ refresh: !this.state.refresh });
    // this.fetchData();
    console.log(this.state.rowData);
  };

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  };

  onQuickFilterChanged = () => {
    this.gridApi.setQuickFilter(document.getElementById("quickFilter").value);
  };

  onCellValueChanged = ({ data }) => {
    // console.log(`Update db: ${JSON.stringify(data)}`);
    // this.setState({ modifiedData: [...this.state.modifiedData, data] });
    console.log(this.state.rowData);
  };

  onRowValueChanged = (event) => {
    console.log("ggg");
    // console.log(`Update db: ${JSON.stringify(data)}`);
    // this.setState({ modifiedData: [...this.state.modifiedData, data] });
    // console.log(this.state.modifiedData);
  };

  startEditing = () => {
    this.gridApi.setSortModel([
      {
        colId: "amount",
        sort: "desc",
      },
    ]);
    this.gridApi.startEditingCell({
      rowIndex: 0,
      colKey: "lastName",
    });
  };

  stopEditing = () => {
    this.gridApi.stopEditing(true);
  };

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{ height: "450px", width: "100%" }}
      >
        <input
          type="text"
          onInput={() => this.onQuickFilterChanged()}
          id="quickFilter"
          placeholder="Quick Filter"
        />
        <button type="button" onClick={this.startEditing}>
          Start Editing
        </button>
        <button type="button" onClick={this.stopEditing}>
          Stop Editing
        </button>
        <button type="button" onClick={this.undoEdits}>
          Undo Edits
        </button>
        <button type="button" onClick={this.saveEdits}>
          Save Edits
        </button>
        <AgGridReact
          onGridReady={this.onGridReady}
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          defaultColDef={this.state.defaultColDef}
          rowSelection={this.state.rowSelection}
          rowDeselection={this.state.rowDeselection}
          undoRedoCellEditing={true}
          undoRedoCellEditingLimit={5}
          // editType={"fullRow"}
          onCellValueChanged={this.onCellValueChanged}
          onRowValueChanged={this.onRowValueChanged}
          frameworkComponents={this.state.frameworkComponents}
        ></AgGridReact>
      </div>
    );
  }
}

export default App;
