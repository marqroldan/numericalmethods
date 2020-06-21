import './styles.scss';
import React from 'react';
import { IterationObject, MethodSettings } from '@Methods/NumericalMethod';
import IterationRow from '@Components/IterationRow';

interface Props {
  data: IterationObject[];
  settings: MethodSettings;
}

export default class IterationTable extends React.PureComponent<Props> {
  render() {
    const data = this.props.data || [];
    return (
      <div className={'IterationTable'}>
        <div className={'IterationRow IterationRow--header'}>
          <div className={'IterationRow__col'}>
            <span className={'IterationRow__col--big'}>Iteration Number</span>
            <span className={'IterationRow__col--small'}>#</span>
          </div>
          <div className={'IterationRow__col'}>x0</div>
          <div className={'IterationRow__col'}>x2</div>
          <div className={'IterationRow__col'}>x1</div>
          <div className={'IterationRow__col'}>f(x0)</div>
          <div className={'IterationRow__col'}>f(x2)</div>
          <div className={'IterationRow__col'}>f(x1)</div>
        </div>

        {data.map((item, index) => {
          return (
            <IterationRow
              key={`${index}__`}
              {...item}
              settings={this.props.settings}
            >
              {JSON.stringify(item)}
            </IterationRow>
          );
        })}
      </div>
    );
  }
}
