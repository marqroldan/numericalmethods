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
      <>
        <div className={'IterationRowHeader'}>
          <div className={'IterationRow__col'}></div>
          <div className={'IterationRow__col'}></div>
          <div className={'IterationRow__col'}></div>
          <div className={'IterationRow__col'}></div>
          <div className={'IterationRow__col'}></div>
          <div className={'IterationRow__col'}></div>
          <div className={'IterationRow__col'}></div>
        </div>

        {data.map((item, index) => {
          return (
            <IterationRow key={`${index}__`} {...item}>
              {JSON.stringify(item)}
            </IterationRow>
          );
        })}
      </>
    );
  }
}
