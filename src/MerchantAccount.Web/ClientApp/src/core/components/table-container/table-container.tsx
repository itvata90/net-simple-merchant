import { ReactNode } from 'react';
import Card from 'src/core/components/card/card';

export interface TableContainerProps {
  children?: ReactNode;
  className?: string;
}
const TableContainer = ({ children, className }: TableContainerProps) => {
  return <Card className={className}>{children}</Card>;
};

export default TableContainer;
