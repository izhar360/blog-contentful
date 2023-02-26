import React from 'react';
import { useRouter } from 'next/router';


import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm, Loader } from '../../components';
// import { getPosts, getPostDetails } from '../../services';
import { getBlogPostDetails, getBlogPosts } from '../../services/api';
import { AdjacentPosts } from '../../sections';

const PostDetails = ({ post }) => {

 // console.log("=============from detailedpost yooo",post.fields.content); 
 
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <>
      <div className="container mx-auto px-10 mb-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            {/* yet to add rich content */}
            <PostDetail post={post.fields} createdAt={post.sys.createdAt} />
            <Author author={post.fields.author} />
            <AdjacentPosts slug={post.fields.slug} createdAt={post.sys.createdAt} />
            <CommentsForm slug={post.fields.slug} />
            <Comments slug={post.fields.slug} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <PostWidget slug={post.fields.slug} category={post.fields.category?.fields?.slug} />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PostDetails;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const data = await getBlogPostDetails(params.slug);

  return {
    props: {
      post: data,
    },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.

export async function getStaticPaths() {
  const posts = await getBlogPosts();
  return {
    paths: posts.items.map((post) => ({ params: { slug: post.fields.slug } })),
    fallback: true,
  };
}

// export async function getStaticPaths() {
//   const posts = await getPosts();
//   return {
//     paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
//     fallback: true,
//   };
// }
