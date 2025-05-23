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

// Pluralisation
// FIXME: Refactor to account for irregular plurals
export const pluralise = (count, word) => (count === 1 ? word : `${word}s`);

// Time
export function getTimeElapsed(createdAt) {
  const now = new Date();
  const created = new Date(createdAt);
  const diffMs = now - created;

  const seconds = Math.floor(diffMs / 1000);
  if (seconds < 60) return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days !== 1 ? 's' : ''} ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months !== 1 ? 's' : ''} ago`;

  const years = Math.floor(days / 365);
  return `${years} year${years !== 1 ? 's' : ''} ago`;
}
