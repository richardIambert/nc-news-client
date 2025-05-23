export const Avatar = ({ initials = 'NC' }) => {
  return (
    <div className="size-12 rounded-full flex items-center justify-center bg-neutral-200 text-neutral-600 text-lg font-semibold hover:bg-neutral-300 transition-colors">
      {initials}
    </div>
  );
};
