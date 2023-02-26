import { FeaturedPosts } from '../sections/index';
import { PostCard, Categories, PostWidget } from '../components';

import { getBlogPosts } from '../services/api';


export default function Home({ posts }) {
  // console.log("checking posts",posts)
  return (
    <div className="container mx-auto px-10 mb-8">
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts?.items?.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

// Fetch data at build time
export async function getStaticProps() {
  const posts = (await getBlogPosts()) || [];
  return {
    props: { posts },
  };
}

