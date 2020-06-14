import './styles.scss';
import React from 'react';

interface Props {
  type?: string;
  className?: string;
}

const ComponentName = 'Input';
type ClassProps = Props & React.HTMLAttributes<HTMLDivElement>;

export default class Input extends React.PureComponent<ClassProps> {
  state = {
    className: ComponentName,
    type: this.props?.type ?? 'text',
  };

  componentDidMount() {
    this.recheckClassName(null, true);
  }

  recheckClassName = (prevProps: Readonly<ClassProps>, override = false) => {
    if (
      (prevProps && prevProps.className !== this.props.className) ||
      override
    ) {
      if (this.props.className) {
        const capitalizedType = this.state.type.replace(
          /^./,
          this.state.type[0].toUpperCase()
        );
        this.setState({
          className: this.props.className
            .split(' ')
            .map(
              (classItem) => `${ComponentName}${capitalizedType}__${classItem}`
            ),
        });
      } else {
        if (this.state.className !== ComponentName) {
          this.setState({
            className: ComponentName,
          });
        }
      }
    }
  };

  componentDidUpdate(prevProps: Readonly<ClassProps>) {
    if (this.props.type !== prevProps.type && this.props.type) {
      this.setState(
        {
          type: this.props.type,
        },
        () => {
          this.recheckClassName(prevProps);
        }
      );
    } else {
      this.recheckClassName(prevProps);
    }
  }

  render() {
    return (
      <input type={this.state.type} className={this.state.className} required />
    );
  }
}
