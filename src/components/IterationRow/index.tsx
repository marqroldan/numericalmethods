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
          <div className={'IterationRow__col'}>
            {this.props.iterationNumber}
          </div>
          <div className={'IterationRow__col'}>{this.props.smallestNumber}</div>
          <div className={'IterationRow__col'}>{this.props.derivedNumber}</div>
          <div className={'IterationRow__col'}>{this.props.largestNumber}</div>
          <div className={'IterationRow__col'}>
            {this.props.f_smallestNumber}
          </div>
          <div className={'IterationRow__col'}>
            {this.props.f_derivedNumber}
          </div>
          <div className={'IterationRow__col'}>
            {this.props.f_largestNumber}
          </div>
        </div>
      );
    }
  }
}
