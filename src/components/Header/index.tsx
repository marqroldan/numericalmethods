import './styles.scss';
import React from 'react';

export default class Header extends React.PureComponent {
  render() {
    return <header className={'headerMain'}>{this.props.children}</header>;
  }
}
