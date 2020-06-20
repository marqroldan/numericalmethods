import './styles.scss';
import React from 'react';
import { countPossibleRoots, coefficientsFactory } from '@Utils/math';
import Text from '@Components/Text';

interface Props {
  coefficients: string;
}

export default class PossibleRoots extends React.Component<Props> {
  render() {
    const possibleRoots = countPossibleRoots(
      coefficientsFactory(this.props.coefficients)
    );

    return (
      <div className={'PossibleRoots'}>
        <Text className={'heading3'}>Possible Roots</Text>
        {possibleRoots.map((roots) => {
          return (
            <div className={'PossibleRootsContainer'}>
              <div className={'PossibleRoots__values'}>
                <Text className={'label'}>Positive</Text>
                <div className={'PossibleRoots__value'}>{roots.positive}</div>
              </div>
              <div className={'PossibleRoots__values'}>
                <Text className={'label'}>Negative</Text>
                <div className={'PossibleRoots__value'}>{roots.negative}</div>
              </div>
              <div className={'PossibleRoots__values'}>
                <Text className={'label'}>Complex</Text>
                <div className={'PossibleRoots__value'}>{roots.complex}</div>
              </div>
              <div className={'PossibleRoots__values'}>
                <Text className={'label'}>Zero</Text>
                <div className={'PossibleRoots__value'}>{roots.zero}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
