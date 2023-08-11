import classNames from 'classnames';
import { forwardRef } from 'react';
import { ImageBaseProps } from 'src/core/interfaces/components';

export interface CardImageProps extends Partial<ImageBaseProps> {
  position?: 'top' | 'bottom' | 'overlay';
}

/**
 * CardImage component
 *
 */
const CardImage = forwardRef(
  (
    {
      className,
      alt,
      position = 'top',
      children,
      ...otherProps
    }: CardImageProps,
    ref
  ) => {
    let bsPrefix = position === 'overlay' ? `card-img` : `card-img-${position}`;
    return (
      <>
        {position === 'overlay' ? (
          <>
            <img
              {...otherProps}
              ref={ref as any}
              alt={alt}
              className={classNames(bsPrefix, className)}
            />
            <div className={`${bsPrefix}-overlay`}>{children}</div>
          </>
        ) : (
          <img
            {...otherProps}
            ref={ref as any}
            alt={alt}
            className={classNames(bsPrefix, className)}
          />
        )}
      </>
    );
  }
);

export default CardImage;
