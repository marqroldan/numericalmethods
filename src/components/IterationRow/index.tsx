import './styles.scss';
import React from 'react';
import * as MathUtils from '@Utils/math';
import {
  IterationObject,
  MethodSettings,
  AbsoluteErrors,
} from '@Methods/NumericalMethod';

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

const typeHandlers = {
  errorValues: (data: AbsoluteErrors, settings: MethodSettings) => {
    const roundedLargest = MathUtils.round(
      data.largest,
      settings.decimalNumbers
    );
    const roundedSmallest = MathUtils.round(
      data.smallest,
      settings.decimalNumbers
    );

    return (
      <>
        Smallest ({roundedSmallest}):{' '}
        {MathUtils.mathOperators[settings.terminatingCondition](
          roundedSmallest,
          settings.terminatingConditionValue
        )
          ? 'YES'
          : 'No'}
        <br />
        Largest ({roundedLargest}):{' '}
        {MathUtils.mathOperators[settings.terminatingCondition](
          roundedLargest,
          settings.terminatingConditionValue
        )
          ? 'YES'
          : 'No'}
      </>
    );
  },
} as { [key: string]: any };

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
                  ? typeHandlers[key]
                    ? typeHandlers[key](this.props[key], this.props.settings)
                    : JSON.stringify(this.props[key])
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
