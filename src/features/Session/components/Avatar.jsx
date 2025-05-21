export const Avatar = ({ initials = 'NC', url }) => {
  return url ? <img src={url} /> : <div>{initials}</div>;
};
