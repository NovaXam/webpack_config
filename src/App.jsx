import { hot } from "react-hot-loader/root";
import React, { PureComponent, Fragment } from "react";
import classes from "./app.sass";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      countGreen: 0,
      countRed: 0
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    if (evt.target.id === "red") {
      this.setState({
        countRed: this.state.countRed + 1
      });
    }
    if (evt.target.id === "green") {
      this.setState({
        countGreen: this.state.countGreen + 1
      });
    }
  }

  render() {
    return (
      <Fragment>
        <ul className={classes.listDots}>
          <li className={classes.dots}>
            <div
              className={classes.mainAppRed}
              onClick={this.handleClick}
            >
              <main id="red" className={classes.textBlock}>{`_CLICK_${
                this.state.countRed
              }`}</main>
            </div>
          </li>
          <li className={classes.dots}>
            <div
              className={classes.mainAppGreen}
              onClick={this.handleClick}
            >
              <main id="green" className={classes.textBlock}>{`_CLICK_${
                this.state.countGreen
              }`}</main>
            </div>
          </li>
        </ul>
      </Fragment>
    );
  }
}

export default hot(App);
