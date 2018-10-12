import React from 'react';
import {getTimezone} from "../utils/utils";
import Moment from "react-moment";

export default class TZ extends React.PureComponent {

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({...this.state, props})
  }

  render() {
    let { time, format, short } = this.props;
    if (!format) {
      format = short ? "YY-MM-DD HH:mm" : "YYYY-MM-DD HH:mm zz";
    }
    return (
      <Moment format={format} tz={getTimezone()}>{time}</Moment>
    );
  }
}




