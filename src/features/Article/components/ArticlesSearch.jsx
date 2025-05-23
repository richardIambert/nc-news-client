import { useState } from 'react';
import { supabase } from '../../../configuration/supabase';
import { FilterIcon, SearchIcon } from '../../../components/icons';
import {
  useArticle,
  UPDATE_SEARCH_TERM,
  GET_ARTICLES_START,
  GET_ARTICLES_SUCCESS,
  GET_ARTICLES_ERROR,
} from '../contexts/ArticleContext';
import { FlexGroup } from '../../../components';

export const ArticlesSearch = () => {
  const { searchTerm, isLoading, dispatch } = useArticle();
  const [isOpen, setIsOpen] = useState();

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleInput = (event) => {
    dispatch({ type: UPDATE_SEARCH_TERM, payload: event.target.value });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      dispatch({ type: GET_ARTICLES_START });
      const { data, error } = await supabase
        .from('articles')
        .select()
        .or(`title.ilike.%${searchTerm}%,topic.ilike.%${searchTerm}%,body.ilike.%${searchTerm}%`);
      dispatch({ type: GET_ARTICLES_SUCCESS, payload: data });
      if (error) throw new Error(error);
    } catch (error) {
      dispatch({ type: GET_ARTICLES_ERROR, payload: error });
    }
  };

  return (
    <div className="px-6 py-4 flex flex-col gap-4 items-center justify-center border-t border-neutral-200">
      <FlexGroup className="w-full md:w-1/2 gap-2">
        <form
          onSubmit={handleSubmit}
          className="grow relative bg-neutral-200 rounded-full"
        >
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onInput={handleInput}
            className="w-full px-4 py-2 text-md rounded-full outline-2 outline-dashed outline-offset-2 outline-transparent focus:outline-red-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`absolute right-1 top-1/2 -translate-y-1/2 rounded-full size-8 flex items-center justify-center outline-2 outline-offset-2 outline-dashed outline-transparent focus:outline-red-500 hover:bg-neutral-300 transition-colors ${
              isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            <SearchIcon />
          </button>
        </form>
        <button
          onClick={toggleIsOpen}
          className="rounded-full size-10 flex items-center justify-center bg-neutral-200 outline-2 outline-offset-2 outline-dashed outline-transparent focus:outline-red-500 hover:bg-neutral-300 transition-colors cursor-pointer"
        >
          <FilterIcon />
        </button>
      </FlexGroup>
      <div className={`${isOpen ? 'block' : 'hidden'}`}>Hello toggle</div>
    </div>
  );
};
