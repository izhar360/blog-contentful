import React, { useState, useEffect } from 'react';

import { AdjacentPostCard } from '../components';
// import { getAdjacentPosts } from '../services';
import { getAdjacentBlogPosts } from '../services/api';

const AdjacentPosts = ({ createdAt, slug }) => {
 
  const [adjacentBlogPost, setAdjacentBlogPost] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    getAdjacentBlogPosts(createdAt, slug).then((result) => {
      setAdjacentBlogPost(result);
      setDataLoaded(true);
    });
  }, [slug]);


  // useEffect(() => {
  //   getAdjacentPosts(createdAt, slug).then((result) => {
  //     setAdjacentPost(result);
  //     setDataLoaded(true);
  //   });
  // }, [slug]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-8 gap-12 mb-8">
     
      {dataLoaded && (
        <>
          {adjacentBlogPost.previous && (
            <div className={`${adjacentBlogPost.next ? 'col-span-1 lg:col-span-4' : 'col-span-1 lg:col-span-8'} adjacent-post rounded-lg relative h-72`}>
              <AdjacentPostCard post={adjacentBlogPost.previous} position="LEFT" />
            </div>
          )}
          {adjacentBlogPost.next && (
            <div className={`${adjacentBlogPost.previous ? 'col-span-1 lg:col-span-4' : 'col-span-1 lg:col-span-8'} adjacent-post rounded-lg relative h-72`}>
              <AdjacentPostCard post={adjacentBlogPost.next} position="RIGHT" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdjacentPosts;
