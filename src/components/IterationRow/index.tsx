import './styles.scss';
import React from 'react';
import * as MathUtils from '@Utils/math';
import { IterationObject, MethodSettings } from '@Methods/NumericalMethod';
import { ERROR_CONSTANTS, ERROR_MESSAGES } from '@Methods/constants';
import Text from '@Components/Text';

interface Props {
  [key: string]: any;
  settings: MethodSettings;
  error?: keyof typeof ERROR_CONSTANTS;
}

const INVALIDVALUES = [undefined, null];

const rowArrangement = [
  'iterationNumber',
  'smallestNumber',
  'derivedNumber',
  'largestNumber',
  'f_smallestNumber',
  'f_derivedNumber',
  'f_largestNumber',
];

const errorVMap = {
  largestNumber: 'largest',
  smallestNumber: 'smallest',
} as { [key: string]: string };

const trackVMap = {
  right: 'largestNumber',
  left: 'smallestNumber',
  center: 'derivedNumber',
} as { [key: string]: string };

const derivedHandler = (key: string, data: Props, settings: MethodSettings) => {
  const roundedValue = MathUtils.round(
    data.f_derivedNumber,
    settings.f_derivedNumber
  );
  const satisfied = Math.abs(roundedValue) == 0;

  const style = !satisfied
    ? ['label', 'error', 'opacity07', 'status']
    : ['label', 'success', 'status'];

  return (
    <>
      {data[key].toFixed(settings[key])}
      <Text className={style.join(' ')}>
        {satisfied ? 'This is a root' : ''}
      </Text>
    </>
  );
};

const SLHandler = (key: string, data: Props, settings: MethodSettings) => {
  const errorValues = data.errorValues;
  const onSameTrack = trackVMap[data.track] === key;

  const roundedValue = MathUtils.round(
    errorValues[errorVMap[key]],
    settings.decimalNumbers
  );

  const satisfied = MathUtils.mathOperators[settings.terminatingCondition](
    roundedValue,
    settings.terminatingConditionValue
  );

  const style = !satisfied
    ? ['label', 'status']
    : ['label', 'success', 'status'];

  return (
    <>
      <Text className={onSameTrack ? 'onSameTrack' : ''}>
        {data[key].toFixed(settings[key])}
      </Text>
      <Text className={style.join(' ')}>(eA: {roundedValue})</Text>
    </>
  );
};

const fDerivedHandler = (
  key: string,
  data: Props,
  settings: MethodSettings
) => {
  const roundedValue = MathUtils.round(data[key], settings[key]);
  const satisfied = Math.abs(roundedValue) == 0;

  const style = !satisfied
    ? ['label', 'error', 'opacity07', 'status']
    : ['label', 'success', 'status'];

  return (
    <>
      {roundedValue.toFixed(settings[key])}
      <Text className={style.join(' ')}>{satisfied ? 'Satisfied' : ''}</Text>
    </>
  );
};

const typeHandlers = {
  f_derivedNumber: fDerivedHandler,
  derivedNumber: derivedHandler,
  smallestNumber: SLHandler,
  largestNumber: SLHandler,
  errorValues: (key: string, data: Props, settings: MethodSettings) => {
    const errorValues = data[key];
    const roundedLargest = MathUtils.round(
      errorValues.largest,
      settings.decimalNumbers
    );
    const roundedSmallest = MathUtils.round(
      errorValues.smallest,
      settings.decimalNumbers
    );
    /*
    const roundedFromZero = MathUtils.round(
      data.fromZero,
      settings.decimalNumbers + 3
    );
    */

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
    const containerStyle = [
      'IterationRowContainer',
      ...(this.props.error ? ['IterationRowContainer--error'] : []),
    ].join(' ');

    return (
      <div className={containerStyle}>
        <div className={'IterationRow'}>
          {rowArrangement.map((key, index) => (
            <div className={'IterationRow__col'} key={`${index}_`}>
              {!INVALIDVALUES.includes(this.props[key])
                ? typeHandlers[key]
                  ? typeHandlers[key](key, this.props, this.props.settings)
                  : this.props.settings[key]
                  ? MathUtils.round(
                      this.props[key],
                      this.props.settings[key]
                    ).toFixed(this.props.settings[key])
                  : typeof this.props[key] === 'object'
                  ? JSON.stringify(this.props[key])
                  : this.props[key]
                : 'Unknown'}
            </div>
          ))}
        </div>
        {this.props.error ? (
          <div className={'IterationRowErrorText'}>
            {ERROR_MESSAGES[this.props.error]
              ? ERROR_MESSAGES[this.props.error]
              : this.props.error}
          </div>
        ) : null}
      </div>
    );
  }
}
