import * as React from 'react';

interface Props {
  color?: string;
}

function SvgComponent(props: Props) {
  return (
    <svg
      width={'100%'}
      height={'100%'}
      viewBox="0 0 16 10"
      fill="none"
      {...props}
    >
      <path
        d="M15 1L8 9 1 1"
        stroke={props.color ? props.color : '#fff'}
        strokeOpacity={0.9}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;
