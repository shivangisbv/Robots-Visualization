/* this file contains the grid layout no of rows and its iterations 
importing the react module from react, 
importing the object from components module
importing config from object routes*/
import React, { Component } from "react";
import Object from "../components/Object";
import config from "../object-routes";

// Grid Items is each item of the grid layout. to create a grid 
const GridItem = props => {
  console.log(props);
  return (
    <div className="grid-item">
      {props.rowIndex === 0 && props.type === "robot" ? (
        <h6>{props.index + 1}</h6>
      ) : (
        ""
      )}
    </div>
  );
};
/* grid rows contains the 45 number of rows which inculding white and gray rows white rows is used for moving 
gray rows is used for destionation */
export default class GridLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: ["row1", "row2", "row3", "row4", "row5", "row6", "row7", "row8", "row9", "row10",
      "row11","row12","row13","row14","row15", "row16","row17","row18","row19","roe20", "row21",
      "row22","row23","row24","row25","row26","row27","row28","row29","row30", "row31",
      "row32","row33","row34","row35",'row36',"row37","row38","row39","row40",
      "row41","row42","row43","row44","row45"],
      objects: [],
      objectsCopy: []
    };
  }
  //this is the function when on click button the object will be appear with blue color 
  onStart = () => {
    console.log("on start");
    this.setState({
      objects: []
    });
    let ob = this.state.objectsCopy;
// on the start the blue color robots will be appear in the source when click to start it will be taking time to move 
    setTimeout(() => {
      this.setState({
        objects: ob
      });
    },100);
  };
// looping for moving 100 robots 
  renderGridItem(index, type) {
    let gridRowItems = [];
    for (let i = 0; i < 100; i++) {
      gridRowItems.push(
        <GridItem key={i} index={i} rowIndex={index} type={type} />
      );
    }
    return (
      <div className="grid-row" key={type + "" + index}>
        {gridRowItems}
      </div>
    );
  }
  // storing the route in objectCopy 
  componentDidMount() {
    console.log(config, "config");
    this.setState({
      objectsCopy: config
    });
  }
//html for viewing the grid layout, robots movement, button for clicking 
  render() {
    return (
      <div className="container">
        <h6 className="text-center">Robots Movement Tracker</h6>
        <h6 className="text-center">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={this.onStart}
          >
            Start Moving
          </button>
        </h6>
        <div className="grid-layout">
          <div className="grid-robot">{this.renderGridItem(0, "robot")}</div>
          {this.state.objects.map((object, i) => (
            <Object key={i} object={object} index={i} />
          ))}
          <div className="grid-box">
            {this.state.rows.map((row, i) => this.renderGridItem(i, "box"))}
          </div>
         
        </div>
      </div>
    );
  }
}
