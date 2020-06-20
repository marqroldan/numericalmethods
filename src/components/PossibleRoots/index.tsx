import './styles.scss';
import React from 'react';
import { countPossibleRoots, coefficientsFactory } from '@Utils/math';

interface Props {
  coefficients: string;
}

export default class PossibleRoots extends React.Component<Props> {
  render() {
    return (
      <div>
        Possible Roots:{' '}
        {JSON.stringify(
          countPossibleRoots(coefficientsFactory(this.props.coefficients))
        )}
      </div>
    );
  }
}
