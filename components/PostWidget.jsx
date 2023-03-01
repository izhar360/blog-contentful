import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';

import { grpahCMSImageLoader } from '../util';
// import { getSimilarPosts, getRecentPosts } from '../services';
 import { getSimilarBlogPosts,getRecentBlogPosts } from '../services/api';
//import {getRecentBlogPosts } from '../services/api';

const PostWidget = ({ category, slug }) => {
 
  const [relatedPosts, setRelatedPosts] = useState([]);
  //getSimilarBlogPosts( category, slug )
  

  useEffect(() => {
    if (slug) {
      getSimilarBlogPosts(category,slug).then((result) => {
        setRelatedPosts(result);
        // console.log("resres refs", result)
      });

    } else {
      getRecentBlogPosts().then((result) => {
        setRelatedPosts(result);
      });
    }
  }, [slug]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">{slug ? 'Related Posts' : 'Recent Posts'}</h3>
      {relatedPosts.map((post, index) => (
        <div key={index} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <Image
              loader={grpahCMSImageLoader}
              alt={post.title}
              height="60"
              width="60"
              unoptimized
              className="align-middle rounded-full"
              src={post.featuredImage}
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
            <Link href={`/post/${post.slug}`} className="text-md" key={index}>{post.title}</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
