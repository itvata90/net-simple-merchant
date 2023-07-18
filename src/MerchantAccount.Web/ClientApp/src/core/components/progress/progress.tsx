import classNames from 'classnames';
import { forwardRef } from 'react';
import { Color, ProgressBaseProps } from 'src/core/interfaces/components';

export interface ProgressProps extends Partial<ProgressBaseProps> {
  label?: string;
  color?: Color;
  variant?: 'stripped' | 'standard';
  barClassName?: string;
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
      ...otherProps
    }: ProgressProps,
    ref,
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
              className={classNames(bsPrefixBar, color && `${colorPrefix}-${color}`, barClassName)}
            />
          </div>
        }
      </>
    );
    return <>{component}</>;
  },
);

export default Progress;
