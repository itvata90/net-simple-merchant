import { ReactNode } from 'react';
import Card from 'src/core/components/card/card';

export interface TableContainerProps {
  children?: ReactNode;
}
const TableContainer = ({ children }: TableContainerProps) => {
  return <Card style={{ position: 'relative', overflow: 'auto' }}>{children}</Card>;
};

export default TableContainer;
