import './styles.scss';
import React from 'react';
import { IterationObject } from '@Methods/NumericalMethod';
import IterationRow from '@Components/IterationRow';

interface Props {
  data: IterationObject[];
}

export default class IterationTable extends React.PureComponent<
  Props & IterationObject
> {
  render() {
    const data = this.props.data || [];
    return (
      <div className={'IterationTable'}>
        <div className={'IterationRow IterationRow--header'}>
          <div className={'IterationRow__col'}>Iteration Number</div>
          <div className={'IterationRow__col'}>x0</div>
          <div className={'IterationRow__col'}>x2</div>
          <div className={'IterationRow__col'}>x1</div>
          <div className={'IterationRow__col'}>f(x0)</div>
          <div className={'IterationRow__col'}>f(x2)</div>
          <div className={'IterationRow__col'}>f(x1)</div>
        </div>

        {data.map((item, index) => {
          return (
            <IterationRow key={`${index}__`} {...item}>
              {JSON.stringify(item)}
            </IterationRow>
          );
        })}
      </div>
    );
  }
}
