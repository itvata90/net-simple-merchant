import classNames from 'classnames';

export const createBreakpointsClassName = (bsPrefix: string, breakpointObject: any) => {
  if (typeof breakpointObject !== 'object') {
    return `${bsPrefix}-${breakpointObject}`;
  }
  return classNames(
    breakpointObject.xs && `${bsPrefix}-${breakpointObject.xs}`,
    breakpointObject.sm && `${bsPrefix}-sm-${breakpointObject.sm}`,
    breakpointObject.md && `${bsPrefix}-md-${breakpointObject.md}`,
    breakpointObject.lg && `${bsPrefix}-lg-${breakpointObject.lg}`,
    breakpointObject.xl && `${bsPrefix}-xl-${breakpointObject.xl}`,
    breakpointObject.xxl && `${bsPrefix}-xxl-${breakpointObject.xxl}`,
  );
};
