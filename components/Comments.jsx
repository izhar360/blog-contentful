import React, { useEffect, useState } from 'react';
import moment from 'moment';
import parse from 'html-react-parser';

import { getBlogPostComments } from '../services/api';

const Comments = ({ slug }) => {

  const [blogComments, setBlogComments] = useState([]);

  useEffect(() => {
    getBlogPostComments(slug).then((result) => {
      setBlogComments(result);
    });
  }, []);

  console.log("commmentsss",blogComments)

  

  return (
    <>
      {blogComments?.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            {blogComments?.length}
            {' '}
            Comments
          </h3>
            {blogComments.map((comment, index) => (
              <div key={index} className="border-b border-gray-100 mb-4 pb-4">
                <p className="mb-4">
                  <span className="font-semibold">{comment.fields.name}</span>
                  {' '}
                  on
                  {' '}
                  {moment(comment.sys.createdAt).format('MMM DD, YYYY')}
                </p>
                <p className="whitespace-pre-line text-gray-600 w-full">{parse(comment.fields.comment)}</p>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default Comments;
