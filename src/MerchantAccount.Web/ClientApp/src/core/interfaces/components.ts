import {
  HTMLAttributes,
  ReactNode,
  FormHTMLAttributes,
  AnchorHTMLAttributes,
  ChangeEvent,
  LabelHTMLAttributes,
  TextareaHTMLAttributes,
  InputHTMLAttributes,
  ButtonHTMLAttributes,
  SelectHTMLAttributes,
  OptionHTMLAttributes,
  OlHTMLAttributes,
  LiHTMLAttributes,
  DetailedHTMLProps,
  ChangeEventHandler,
  ImgHTMLAttributes,
  ElementType,
  CSSProperties,
} from 'react';
import { OptionProperties } from 'src/core/components/form-select/form-select';

// Common props
export interface CommonProps {
  id: string;
  name: string;
  className: string;
  style: CSSProperties;
}
export interface AsProp<As extends ElementType = ElementType> {
  as: As;
}

export type Color =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'light'
  | 'dark';

export type Size = 'sm' | 'lg';
// Base Props
export interface InputBaseProps
  extends Omit<
      Required<
        CommonProps &
          TextareaHTMLAttributes<HTMLTextAreaElement> &
          InputHTMLAttributes<HTMLInputElement>
      >,
      'onChange'
    >,
    AsProp<'input' | 'textarea'> {
  //type: 'email' | 'text' | 'password' | 'number' | 'file' | 'color' | 'date';
  disabled: boolean;
  readOnly: boolean;
  value: any;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export interface ButtonBaseProps
  extends Required<CommonProps & ButtonHTMLAttributes<HTMLButtonElement>>,
    AsProp<'input' | 'button' | 'a'> {
  color: Color;
  variant: 'outline' | 'contained';
  active: boolean;
  disabled: boolean;
  href: string;
  type: 'submit' | 'reset' | 'button';
  size: Size;
}

export interface FormControlBaseProps extends Omit<InputBaseProps, 'size'> {
  type:
    | 'email'
    | 'text'
    | 'password'
    | 'number'
    | 'file'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'image'
    | 'month'
    | 'tel'
    | 'time'
    | 'url'
    | 'week';
  variant: 'outlined' | 'plaintext';
  size: Size;
  htmlSize: number;
}

export interface FormCheckBaseProps extends Omit<InputBaseProps, 'size'> {
  type: 'checkbox' | 'radio';
  color: Color;
  size: Size;
  htmlSize: number;
}

export interface SelectEventTarget extends EventTarget {
  value?: any;
}
export interface SelectChangeEvent extends ChangeEvent<HTMLSelectElement> {
  target: SelectEventTarget & HTMLSelectElement;
}
export interface SelectBaseProps
  extends Omit<
    Required<CommonProps & SelectHTMLAttributes<HTMLSelectElement>>,
    'size'
  > {
  htmlSize: number;
  multiple: boolean;
  size: Size;
  value: any;
  defaultValue: any;
  onChange: (event: SelectChangeEvent) => void;
}

export interface OptionBaseProps
  extends Required<CommonProps & OptionHTMLAttributes<HTMLOptionElement>> {
  selected: boolean;
  value: any;
}

export interface FormLabelBaseProps
  extends Required<CommonProps & LabelHTMLAttributes<HTMLLabelElement>> {}

export interface FormRangeBaseProps
  extends Omit<InputBaseProps, 'type' | keyof AsProp> {
  step: number;
  min: number;
  max: number;
}

export interface FormGroupBaseProps extends CommonProps, AsProp {
  size: Size;
  flexNowrap: boolean;
  children: ReactNode;
}

export interface InputGroupBaseProps extends CommonProps, AsProp {
  size: Size;
  flexNowrap: boolean;
  children: ReactNode;
}

export type FeedbackType = 'is-valid' | 'is-invalid';

export interface FormBaseProps
  extends FormHTMLAttributes<HTMLFormElement>,
    AsProp {
  validated: boolean;
  children: ReactNode;
}

type GridWidth =
  | number
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | 'auto';

export interface GridBaseProps
  extends Required<CommonProps & HTMLAttributes<HTMLElement>>,
    AsProp,
    Breakpoints<GridWidth> {
  direction: 'row' | 'column';
  order: number | string;
  container: boolean;
  item: boolean;
}

export interface ContainerBaseProps
  extends Required<CommonProps & HTMLAttributes<HTMLElement>>,
    AsProp,
    Omit<Breakpoints<boolean>, 'xs'> {
  fluid: boolean;
}

type Only<T, U> = { [P in keyof T]: T[P] } & Omit<
  { [P in keyof U]?: never },
  keyof T
>;

export type Either<T, U> = Only<T, U> | Only<U, T>;

export interface Breakpoints<T> {
  xs: T;
  sm: T;
  md: T;
  lg: T;
  xl: T;
  xxl: T;
}

export type JustifyOptions =
  | 'start'
  | 'end'
  | 'center'
  | 'between'
  | 'around'
  | 'evenly'
  | 'initial'
  | 'inherit';

export type AlignOptions = 'start' | 'end' | 'center' | 'baseline' | 'stretch';

export interface ButtonGroupBaseProps
  extends Required<CommonProps & HTMLAttributes<HTMLElement>>,
    AsProp {
  size: Size;
  flexNowrap: boolean;
}

export interface StackBaseProps
  extends Required<CommonProps & HTMLAttributes<HTMLElement>>,
    AsProp {
  direction: 'row' | 'column';
}
export interface SpinnerBaseProps
  extends Omit<Required<CommonProps & HTMLAttributes<HTMLElement>>, 'color'>,
    AsProp {}

export interface ProgressBaseProps
  extends Omit<Required<CommonProps & HTMLAttributes<HTMLElement>>, 'color'>,
    AsProp {}
export interface CardBaseProps
  extends Omit<Required<CommonProps & HTMLAttributes<HTMLElement>>, 'color'>,
    AsProp {
  color: Color;
  size: Size;
}
export interface ModalBaseProps
  extends Required<CommonProps & HTMLAttributes<HTMLElement>>,
    AsProp {
  open: boolean;
  onClose: Function;
}
export interface AlertBaseProps
  extends Omit<Required<CommonProps & HTMLAttributes<HTMLElement>>, 'color'>,
    AsProp {
  color: Color;
}

export interface ModalBaseProps
  extends Required<CommonProps & HTMLAttributes<HTMLElement>>,
    AsProp {
  open: boolean;
  onClose: Function;
}

export interface AccordionBaseProps
  extends Required<CommonProps & HTMLAttributes<HTMLElement>>,
    AsProp {
  flush: boolean;
  alwayOpen: boolean;
}

export interface Placement {
  vertical: 'top' | 'bottom' | 'middle';
  horizontal: 'left' | 'right' | 'center';
}

export interface BadgeBaseProps
  extends Required<CommonProps & HTMLAttributes<HTMLElement>>,
    AsProp {
  color: Color;
}

export type DataType =
  | 'date'
  | 'decimal'
  | 'integer'
  | 'text'
  | 'datetime'
  | 'option';

export interface Column {
  name?: string;
  field: string;
  renderFunction?: (value: any) => JSX.Element;
  searchable?: boolean;
  filterable?: boolean;
  filterOptions?: Array<OptionProperties>;
  sortable?: boolean;
  colColor?: Color;
  colWidth?: string;
  searchWidth?: string;
  horizonAlign?: 'center' | 'start' | 'end';
  verticalAlign?: 'top' | 'bottom' | 'middle';
  type?: DataType;
  decimalLimit?: number;
  dateFormat?: string;
  nonClickable?: boolean;
  editable?: boolean;
  sticky?: boolean;
}
export interface TableBaseProps
  extends Partial<
    Omit<CommonProps & HTMLAttributes<HTMLTableElement>, 'color'> & AsProp
  > {
  color?: Color;
  striped?: 'row' | 'col' | 'both';
  stripedColumns?: boolean;
  bordered?: boolean;
  borderColor?: Color;
  hover?: boolean;
  responsive?: boolean;
}

export interface TableBaseProps2
  extends Partial<
    Omit<CommonProps & HTMLAttributes<HTMLTableElement>, 'color'> & AsProp
  > {
  color?: Color;
  striped?: 'row' | 'col' | 'both';
  stripedColumns?: boolean;
  bordered?: boolean;
  borderColor?: Color;
  hover?: boolean;
  responsive?: boolean;
}

export interface NavBaseProps
  extends Required<CommonProps & HTMLAttributes<HTMLElement>>,
    AsProp {}

export interface DropdownBaseProps
  extends Required<CommonProps & HTMLAttributes<HTMLElement>>,
    AsProp {}

export interface NavbarBaseProps
  extends Required<CommonProps & HTMLAttributes<HTMLElement>>,
    AsProp {
  background: Color;
}

export interface LinkBaseProps
  extends Required<CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>> {
  to: string;
}

export interface ListBaseProps
  extends Required<CommonProps & OlHTMLAttributes<HTMLUListElement>>,
    AsProp {}
export interface ListItemBaseProps
  extends Required<CommonProps & LiHTMLAttributes<HTMLLIElement>>,
    AsProp {}

export interface HeadingBaseProps
  extends Required<
      CommonProps &
        DetailedHTMLProps<
          HTMLAttributes<HTMLHeadingElement>,
          HTMLHeadingElement
        >
    >,
    AsProp {}

export interface ParagraphBaseProps
  extends Required<
      CommonProps &
        DetailedHTMLProps<
          HTMLAttributes<HTMLParagraphElement>,
          HTMLParagraphElement
        >
    >,
    AsProp {}

export interface DividerBaseProps
  extends Required<
      CommonProps &
        DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement>
    >,
    AsProp {}
export interface ImageBaseProps
  extends Required<CommonProps & ImgHTMLAttributes<HTMLImageElement>> {}
export type SortAction = 'none' | 'asc' | 'desc';
