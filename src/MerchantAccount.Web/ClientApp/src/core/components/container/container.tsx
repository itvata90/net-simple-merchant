import classNames from 'classnames';
import { forwardRef } from 'react';
import { ContainerBaseProps } from 'src/core/interfaces/components';

export type ContainerProps = Partial<ContainerBaseProps>;

/**
 * Container component
 *
 */
const Container = forwardRef(
  ({ className, as: Component = 'div', sm, md, lg, xl, xxl, fluid, ...otherProps }: ContainerProps, ref) => {
    let bsPrefix = 'container';
    // Breakpoint width
    return (
      <Component
        {...otherProps}
        ref={ref}
        className={classNames(
          bsPrefix,
          sm && `${bsPrefix}-sm`,
          md && `${bsPrefix}-md`,
          lg && `${bsPrefix}-lg`,
          xl && `${bsPrefix}-xl`,
          xxl && `${bsPrefix}-xxl`,
          fluid && `${bsPrefix}-fluid`,
          className,
        )}
      />
    );
  },
);

export default Container;
