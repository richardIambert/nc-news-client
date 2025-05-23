export const FlexGroup = ({ children, className, vertical }) => {
  return (
    <div className={`flex gap-1 items-center ${vertical ? 'flex-col' : 'flex-row'} ${className}`}>
      {children}
    </div>
  );
};
