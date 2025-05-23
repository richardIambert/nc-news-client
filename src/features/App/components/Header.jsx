import { useLocation } from 'react-router-dom';
import { ArticlesSearch } from '../../Article';
import { LogoLink } from './LogoLink';
import { Session } from '../../Session';

export const Header = () => {
  const location = useLocation();
  return (
    <header className="bg-white shadow">
      <div className="px-6 py-2 flex items-center justify-between">
        <LogoLink />
        <Session />
      </div>
      {location.pathname === '/articles' && <ArticlesSearch />}
    </header>
  );
};
