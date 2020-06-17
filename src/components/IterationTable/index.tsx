import './styles.scss';
import React from 'react';
import { IterationObject } from '@Methods/NumericalMethod';

interface Props {
  data: IterationObject[];
}

export default class IterationRow extends React.PureComponent<
  Props & IterationObject
> {
  render() {
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
        <div className={'IterationRow'}>
          <div className={'IterationRow__col'}></div>
          <div className={'IterationRow__col'}></div>
          <div className={'IterationRow__col'}></div>
          <div className={'IterationRow__col'}></div>
          <div className={'IterationRow__col'}></div>
          <div className={'IterationRow__col'}></div>
          <div className={'IterationRow__col'}></div>
        </div>
      </>
    );
  }
}
