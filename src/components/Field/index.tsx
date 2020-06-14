import './styles.scss';
import React from 'react';
import Text from '@Components/Text';
import { isNonNullOrUndefined } from '@Utils';

interface Props {
  label?: string | Function | JSX.Element;
}

export default class Field extends React.PureComponent<
  Props & React.HTMLAttributes<HTMLDivElement>
> {
  render() {
    const { label, children } = this.props;
    return (
      <div className={'field'}>
        {isNonNullOrUndefined(label) ? (
          <div className={'field__labelHolder'}>
            <Text className={'label'}>
              {typeof label === 'function' ? label() : label}
            </Text>
          </div>
        ) : null}
        <div className={'field__childrenHolder'}>{children}</div>
      </div>
    );
  }
}
