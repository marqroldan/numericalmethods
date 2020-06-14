import './styles.scss';
import React from 'react';

export default class Main extends React.PureComponent {
  render() {
    return <main className={'mainPrimary'}>{this.props.children}</main>;
  }
}
