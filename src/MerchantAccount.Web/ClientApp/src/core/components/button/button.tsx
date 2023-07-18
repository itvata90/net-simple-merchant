import classNames from 'classnames';
import { forwardRef } from 'react';
import { ButtonBaseProps, Color } from '../../interfaces/components';

interface ButtonProps extends Partial<Omit<ButtonBaseProps, 'color'>> {
  color?: Color | 'link';
}

/**
 * Button component
 *
 */
const Button = forwardRef(
  (
    {
      className,
      color,
      variant,
      active,
      href,
      disabled,
      as = 'button',
      type = 'button',
      size,
      onClick,
      children,
      ...otherProps
    }: ButtonProps,
    ref,
  ) => {
    let bsPrefix = 'btn';
    let Component = href ? 'a' : (as as React.ElementType);

    const handleClick = (event: any) => {
      // if (type === 'button') {
      //   event.preventDefault();
      // }
      onClick && onClick(event);
    };

    let buttonProps = {} as { [key: string]: any };
    if (Component === 'a') {
      buttonProps['children'] = children;
    }
    if (Component === 'input') {
      buttonProps['type'] = type;
      buttonProps['value'] = children;
      buttonProps['disabled'] = disabled;
    }
    if (Component === 'button') {
      buttonProps['children'] = children;
      buttonProps['type'] = type;
      buttonProps['disabled'] = disabled;
    }

    let colorAndVariantClassName = bsPrefix;
    colorAndVariantClassName += variant === 'outline' ? '-' + variant : '';
    colorAndVariantClassName += color ? '-' + color : '';
    return (
      <Component
        {...otherProps}
        {...buttonProps}
        ref={ref}
        onClick={handleClick}
        className={classNames(
          bsPrefix,
          (color || variant) && colorAndVariantClassName,
          active && `active`,
          (href || as === 'a') && disabled && 'disabled',
          size && `${bsPrefix}-${size}`,
          className,
        )}
      />
    );
  },
);

export default Button;
