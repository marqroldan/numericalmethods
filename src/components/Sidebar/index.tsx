import './styles.scss';
import React from 'react';

export default class Sidebar extends React.PureComponent {
  render() {
    return <div className={'Sidebar'}>{this.props.children}</div>;
  }
}
