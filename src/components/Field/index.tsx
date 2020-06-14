import './styles.scss';
import React from 'react';
import Text from '@Components/Text';

interface Props {
  label: string;
}

export default class Field extends React.PureComponent<
  Props & React.HTMLAttributes<HTMLDivElement>
> {
  render() {
    return (
      <div className={'field'}>
        <div className={'field__labelHolder'}>
          <Text className={'label'}>{this.props.label}</Text>
        </div>
        <div className={'field__childrenHolder'}>{this.props.children}</div>
      </div>
    );
  }
}
