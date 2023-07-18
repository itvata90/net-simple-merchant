import { forwardRef, ReactNode } from 'react';
import classNames from 'classnames';
import { BadgeBaseProps, Color, Placement } from 'src/core/interfaces/components';

export interface BadgeProps extends Partial<BadgeBaseProps> {
  placement?: Placement;
  background?: Color;
  pill?: boolean;
  value?: ReactNode;
  invisible?: boolean;
}

const Badge = forwardRef(
  (
    {
      className,
      as: Component = 'span',
      color,
      background,
      placement,
      pill,
      children,
      invisible,
      value,
      ...otherProps
    }: BadgeProps,
    ref,
  ) => {
    let bsPrefix = `badge`;

    const placementCases = {
      center: 'start-50',
      left: 'start-0',
      right: 'start-100',
      middle: 'top-50',
      top: 'top-0',
      bottom: 'top-100',
    };

    return (
      <>
        {!invisible && (
          <Component
            {...otherProps}
            ref={ref}
            children={!pill && value}
            className={classNames(
              pill ? 'border border-light rounded-circle p-2' : bsPrefix,
              color && `text-bg-${color}`,
              background && `bg-${background}`,
              placement && 'position-absolute',
              placement &&
                placementCases[placement.vertical || 'top'] +
                  ' translate-middle ' +
                  placementCases[placement.horizontal || 'right'],
              className,
            )}
          />
        )}
      </>
    );
  },
);

export default Object.assign(Badge);
