import './styles.scss';
import React from 'react';

interface State {
  expanded: boolean;
}

export default class Options extends React.PureComponent<{}, State> {
  state = {
    expanded: false,
  };

  toggle = () => {
    this.setState((state) => ({
      expanded: !state.expanded,
    }));
  };

  render() {
    const className = this.state.expanded
      ? 'Options Options--expanded'
      : 'Options';

    return (
      <div className={className} onClick={this.toggle}>
        asd
      </div>
    );
  }
}
