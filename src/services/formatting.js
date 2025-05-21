// Name
export const getInitials = (name) =>
  name
    .toUpperCase()
    .trim()
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');

export const getFirstName = (name) => name.split(' ').at(0);

export const getLastName = (name) => name.split(' ').at(-1);

export const getFirstLastNames = (name) => [getFirstName(name), getLastName(name)];

// Email Address
export const normaliseEmail = (email) => email.toLowerCase();
