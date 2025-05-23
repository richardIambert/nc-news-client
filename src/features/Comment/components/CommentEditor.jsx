import { useState } from 'react';
import { supabase } from '../../../configuration/supabase';
import {
  useComment,
  POST_COMMENT_START,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_ERROR,
} from '../contexts/CommentContext';

export const CommentEditor = ({ articleId }) => {
  const { isLoading, error, dispatch } = useComment();
  const [body, setBody] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // dispatch({ type: POST_COMMENT_START });
      const { data, error } = await supabase
        .from('comments')
        .insert({ article_id: articleId, body })
        .select();
      if (error) throw new Error(error);
      console.log(data, '>>>>> insert op'); // TODO: remove
      setBody('');
      dispatch({ type: POST_COMMENT_SUCCESS, payload: data[0] });
    } catch (error) {
      dispatch({ type: POST_COMMENT_ERROR, payload: error });
    }
  };

  const handleInput = (event) => {
    setBody(event.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative p-4 h-[200px] w-full"
    >
      <textarea
        value={body}
        onInput={handleInput}
        className="w-full h-full bg-neutral-100 rounded-lg p-2 resize-none outline-2 outline-offset-2 outline-transparent outline-dashed focus:outline-red-500"
      ></textarea>
      <button
        type="submit"
        disabled={isLoading}
        className="absolute left-6 bottom-6 rounded-full px-4 py-2 bg-white cursor-pointer"
      >
        Comment
      </button>
    </form>
  );
};
