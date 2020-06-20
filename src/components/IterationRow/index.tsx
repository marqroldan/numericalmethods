import './styles.scss';
import React from 'react';
import * as MathUtils from '@Utils/math';
import { IterationObject, MethodSettings } from '@Methods/NumericalMethod';

interface Props {
  [key: string]: any;
  settings: MethodSettings;
}

const INVALIDVALUES = [undefined, null];

const rowArrangement = [
  'iterationNumber',
  'smallestNumber',
  'derivedNumber',
  'largestNumber',
  'errorValues',
  'f_smallestNumber',
  'f_derivedNumber',
  'f_largestNumber',
];

export default class IterationRow extends React.PureComponent<
  Props & IterationObject
> {
  render() {
    if (this.props.error) {
      return <div className={'IterationRowError'}>error</div>;
    } else {
      return (
        <div className={'IterationRow'}>
          {rowArrangement.map((key, index) => (
            <div className={'IterationRow__col'} key={`${index}_`}>
              {!INVALIDVALUES.includes(this.props[key])
                ? typeof this.props[key] === 'object'
                  ? JSON.stringify(this.props[key])
                  : this.props.settings[key]
                  ? MathUtils.round(
                      this.props[key],
                      this.props.settings[key]
                    ).toFixed(this.props.settings[key])
                  : this.props[key]
                : 'Unknown'}
            </div>
          ))}
        </div>
      );
    }
  }
}
