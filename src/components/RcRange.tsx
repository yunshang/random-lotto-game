import { Range } from "antd-mobile";
import React from "react";

export interface RcRangeProps {
  value?: number[];
  defaultValue?: number[];
  count?: number;
  min?: number;
  max?: number;
  allowCross?: boolean;
  pushable?: boolean;
  onChange?: (value: number[]) => void;
  onBeforeChange?: (value: number[]) => void;
  onAfterChange?: (value: number[]) => void;
  reverse?: boolean;
  vertical?: boolean;
  marks?: Record<number, React.ReactNode>;
  step?: number;
  threshold?: number;
  prefixCls?: string;
  included?: boolean;
  disabled?: boolean;
  trackStyle?: React.CSSProperties;
  handleStyle?: React.CSSProperties;
  tabIndex?: number;
  ariaLabelGroupForHandles?: string;
  ariaLabelledByGroupForHandles?: string;
  ariaValueTextFormatterGroupForHandles?: string;
  style?: React.CSSProperties;
  // handle: RcRangeSliderProps['handle'];
}

export function RcRange(props: RcRangeProps) {
  return <Range {...props as any}></Range>
}