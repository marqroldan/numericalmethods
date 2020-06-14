import './styles.scss';
import React from 'react';
import Text from '@Components/Text';
import { isNonNullOrUndefined } from '@Utils';

interface Props {
  label?: string | Function | JSX.Element;
}

export default class FieldGroup extends React.PureComponent<
  Props & React.HTMLAttributes<HTMLDivElement>
> {
  render() {
    const { label, children } = this.props;
    return (
      <div
        className={
          isNonNullOrUndefined(label)
            ? 'fieldGroup fieldGroup--withLabel'
            : 'fieldGroup'
        }
      >
        {isNonNullOrUndefined(label) ? (
          <div className={'field__labelHolder'}>
            <Text className={'label'}>
              {typeof label === 'function' ? label() : label}
            </Text>
          </div>
        ) : null}
        {isNonNullOrUndefined(label) ? <div>{children}</div> : children}
      </div>
    );
  }
}
