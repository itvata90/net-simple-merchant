import classNames from 'classnames';
import { forwardRef } from 'react';
import { Color, ProgressBaseProps } from 'src/core/interfaces/components';

export interface ProgressProps extends Partial<ProgressBaseProps> {
  label?: string;
  color?: Color;
  variant?: 'striped' | 'standard';
  barClassName?: string;
  animated?: boolean;
  value?: number;
}

/**
 * Progress component
 *
 */
const Progress = forwardRef(
  (
    {
      className,
      as: Component = 'div',
      barClassName,
      children,
      variant = 'standard',
      color,
      animated,
      style,
      value,
      ...otherProps
    }: ProgressProps,
    ref
  ) => {
    let bsPrefix = `progress`;
    let bsPrefixBar = `progress-bar`;
    let colorPrefix = 'bg';
    const component = (
      <>
        {
          <div className={classNames(bsPrefix, className)}>
            <Component
              {...otherProps}
              ref={ref}
              style={{
                width: `${value ?? 0}%`,
                ...style,
              }}
              className={classNames(
                bsPrefixBar,
                color && `${colorPrefix}-${color}`,
                variant && `${bsPrefixBar}-${variant}`,
                animated && `${bsPrefixBar}-animated`,

                barClassName
              )}
            />
          </div>
        }
      </>
    );
    return <>{component}</>;
  }
);

export default Progress;
