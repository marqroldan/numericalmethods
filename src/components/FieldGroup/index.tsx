import 'styles.scss';
import React from 'react';

export default class FieldGroup extends React.PureComponent {
  render() {
    return <div className={'fieldGroup'}>{this.props.children}</div>;
  }
}
