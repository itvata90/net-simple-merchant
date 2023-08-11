import classNames from 'classnames';
import { Breakpoints, NavbarBaseProps } from 'src/core/interfaces/components';

export interface NavbarProps extends Partial<NavbarBaseProps> {
  variant?: 'dark' | 'light';
  expand?: keyof Breakpoints<string>;
}
export interface NavbarBrandProps extends Partial<NavbarBaseProps> {}
export interface NavbarToggleProps extends Partial<NavbarBaseProps> {
  for?: string;
}
export interface NavbarCollapseProps extends Partial<NavbarBaseProps> {}

const NavbarCollapse = ({
  className,
  as: Component = 'div',
  ...otherProps
}: NavbarCollapseProps) => {
  let bsPrefix = 'navbar-collapse collapse';
  return (
    <Component
      {...otherProps}
      className={classNames(bsPrefix, className)}
    ></Component>
  );
};

const NavbarToggle = ({
  className,
  as: Component = 'button',
  for: controlFor,
  ...otherProps
}: NavbarToggleProps) => {
  let bsPrefix = 'navbar-toggler';
  return (
    <Component
      {...otherProps}
      type="button"
      data-bs-toggle="collapse"
      className={classNames(bsPrefix, className)}
      aria-controls={controlFor}
      data-bs-target={`#${controlFor}`}
    >
      <span className="navbar-toggler-icon"></span>
    </Component>
  );
};

const NavbarBrand = ({
  className,
  as: Component = 'a',
  ...otherProps
}: NavbarBrandProps) => {
  let bsPrefix = 'navbar-brand';
  return (
    <Component {...otherProps} className={classNames(bsPrefix, className)} />
  );
};

/**
 * Navbar component
 *
 */
const Navbar = ({
  className,
  as: Component = 'nav',
  background,
  variant,
  expand,
  ...otherProps
}: NavbarProps) => {
  let bsPrefix = 'navbar';
  return (
    <Component
      {...otherProps}
      className={classNames(
        bsPrefix,
        background && `bg-${background}`,
        variant === 'dark' && `${bsPrefix}-dark`,
        expand && `${bsPrefix}-expand-${expand}`,
        className
      )}
    />
  );
};

export default Object.assign(Navbar, {
  Brand: NavbarBrand,
  Toggle: NavbarToggle,
  Collapse: NavbarCollapse,
});
