import './styles.scss';
import React from 'react';
import Text from '@Components/Text';
import { isNonNullOrUndefined } from '@Utils';

interface Props {
  type?: string;
  className?: string;
  sublabel?: string | Function | JSX.Element;
  onChangeValue: Function;
  value: string | number;
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

  recheckClassName = (
    prevProps: Readonly<ClassProps> | null,
    override = false
  ) => {
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
            )
            .join(' '),
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

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if ((event?.target?.value && this.props.onChangeValue) || true) {
      this.props.onChangeValue(event.target.value);
    }
  };

  render() {
    const { sublabel } = this.props;
    return (
      <div className={'Input'}>
        <input
          type={this.state.type}
          className={this.state.className}
          value={this.props.value}
          onChange={this.onChange}
          required
        />
        {isNonNullOrUndefined(sublabel) ? (
          <div className={'Input__sublabel'}>
            <Text className={'sublabel'}>
              {typeof sublabel === 'function' ? sublabel() : sublabel}
            </Text>
          </div>
        ) : null}
      </div>
    );
  }
}
