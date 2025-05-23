import { Link } from 'react-router-dom';

export const LogoLink = () => {
  return (
    <Link
      to="/articles"
      className="group relative text-4xl font-nunito font-semibold hover:-rotate-6 hover:scale-105 transition-transform cursor-pointer outline-0"
    >
      <div className="z-[-10] absolute top-1/2 left-1/2 -translate-1/2 w-[45px] h-[45px] bg-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <span className="z-20">n!</span>
    </Link>
  );
};
