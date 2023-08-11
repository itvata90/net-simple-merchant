const TableHead = ({ children, ...props }: any) => {
  return <thead {...props}>{children}</thead>;
};

export default TableHead;
