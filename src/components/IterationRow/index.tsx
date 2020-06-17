import './styles.scss';
import React from 'react';
import { IterationObject } from '@Methods/NumericalMethod';

interface Props {
  [key: string]: any;
}

export default class IterationRow extends React.PureComponent<
  Props & IterationObject
> {
  render() {
    if (this.props.error) {
      return <div className={'IterationRowError'}>error</div>;
    } else {
      return (
        <div className={'IterationRow'}>
          <div className={'IterationRow__col'}></div>
          <div className={'IterationRow__col'}></div>
          <div className={'IterationRow__col'}></div>
          <div className={'IterationRow__col'}></div>
          <div className={'IterationRow__col'}></div>
          <div className={'IterationRow__col'}></div>
          <div className={'IterationRow__col'}></div>
        </div>
      );
    }
  }
}
