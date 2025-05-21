export const Spinner = ({ className }) => {
  return (
    <div
      className={`rounded-full border-2 border-t-transparent animate-spin ${
        className ? className : 'size-4 border-black'
      }`}
    ></div>
  );
};
