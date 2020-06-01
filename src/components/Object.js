/*this file which contains the object moving with the timmer of 2000ms
importing the react from react module */
import React, { Component } from "react";
// component tocheck the current route, destionation is correct or not 
export default class Object extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRouteIndex: 0,
      isDestinationReached: false,
      cssStyle: {}
    };
  }
  isComponentMounted = false;
/* taking the current route index and current route object and upadting with the top and left 
top is the source of the (1-100) down rows of grid (0,1,2,3,......)
left is the source left side robots start moving 
calculation  of top = (routeCordinates[0] + 1) * 30 + 5; 
here it is taking the route cordinate of current route index adding one is that row 0 is the white grid to aviod it adding one 
multiplication with 30 is the px value of robot with 5 is the padding value 
calculation of left = routeCordinates[1] * 30 + 5;
here robots are moving left side so it take the routcordinate as a 1  and 30 is the px value of robots and 5 is the padding vaue 
here 
*/
  updateStyle = () => {
    let currentRouteInx = this.state.currentRouteIndex;
    let routeCordinates = this.props.object.routes[
      this.state.currentRouteIndex
    ];
    let top = (routeCordinates[0] + 1) * 30 + 5;
    let left = routeCordinates[1] * 30 + 5;
    this.setState({
      cssStyle: {
        position: "absolute",
        left: left + "px",
        top: top + "px"
      }
    });
// to check the destionation 
    if (currentRouteInx === this.props.object.routes.length - 1) {
      this.setState({
        isDestinationReached: true
      });
/*once reached the destination it has wait for 2000 ms  it has to come back with source position with same route revsering route  
*/
      clearInterval(this.timer);
      setTimeout(() => {
        this.startTimer();
      }, 2000);
    } else if (
      this.state.isDestinationReached === true &&
      currentRouteInx === 0
    ) {
      clearInterval(this.timer);

      setTimeout(() => {
        if (this.isComponentMounted) {
          this.setState({
            cssStyle: {
              position: "absolute",
              left: routeCordinates[1] * 30 + 5 + "px",
              top: routeCordinates[0] * 30 + 5 + "px"
            }
          });
        }
      }, 400);
    }
    if (this.state.isDestinationReached) {
      this.setState({
        currentRouteIndex: currentRouteInx - 1
      });
    } else {
      this.setState({
        currentRouteIndex: currentRouteInx + 1
      });
    }
  };
  startTimer = () => {
    if (this.isComponentMounted) {
      this.timer = setInterval(() => this.updateStyle(), 400);
    }
  };

  componentDidMount() {
    this.isComponentMounted = true;
    if (this.isComponentMounted) {
      this.setState({
        cssStyle: {
          position: "absolute",
          left: this.props.index * 30 + 5 + "px",
          top: "6px"
        }
      });
      this.startTimer();
    }
  }
  componentWillUnmount() {
    this.isComponentMounted = false;
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
// to show the object name in the grid moving item 
  render() {
    return (
      <div className="grid-moving-item" style={this.state.cssStyle}>
        <h6>{this.props.object.objectName}</h6>
      </div>
    );
  }
}
