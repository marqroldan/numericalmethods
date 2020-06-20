import './styles.scss';
import React from 'react';
import { countPossibleRoots, coefficientsFactory } from '@Utils/math';
import { IPossibleRoots } from '@Utils/math/interfaces';
import Text from '@Components/Text';

interface Props {
  coefficients: string;
}

interface State {
  possibleRoots: IPossibleRoots[];
}

export default class PossibleRoots extends React.Component<Props, State> {
  state = {
    possibleRoots: [] as IPossibleRoots[],
  };

  updateRoots = () => {
    const possibleRoots = countPossibleRoots(
      coefficientsFactory(this.props.coefficients)
    );
    this.setState({ possibleRoots });
  };

  componentDidMount() {
    this.updateRoots();
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    if (this.props.coefficients !== prevProps.coefficients) {
      this.updateRoots();
    }
  }

  render() {
    return (
      <div className={'PossibleRoots'}>
        <Text className={'heading3'}>Possible Roots</Text>
        {this.state.possibleRoots.map((roots, index) => {
          return (
            <div className={'PossibleRootsContainer'} key={`${index}_`}>
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
