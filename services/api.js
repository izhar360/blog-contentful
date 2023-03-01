 import { createClient } from 'contentful';
//  import {contentful} from 'contentful-management'
 import * as contentfulManagement from 'contentful-management';
// iggiggjjg
 const client = createClient({
   space: process.env.NEXT_PUBLIC_SPACE_ID,
   accessToken: process.env.NEXT_PUBLIC_CONTENT_DELIVERY_API
  });
  
  
  
  export async function getBlogCategories() {
 // console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBtokeeeen", process.env.NEXT_PUBLIC_SPACE_ID)
    
    const response = await client.getEntries({
      content_type: 'category'
    });
    // console.log("zxxxx",response.items)
    return response.items;
   
  }


  // format the data
  export const getBlogFeaturedPosts = async () => {
    const entries = await client.getEntries({
        content_type: 'post',
        'fields.featuredPost': true
      });
      // console.log("entries here",entries); 
    
      const posts = entries?.items.map(item => {
        const { title, slug, author } = item.fields;
        const {name,bio,photo} = author[0].fields;
        const authorObj = {name,bio,photo}
       // console.log("authors here",authorObj); 
        const { createdAt } = item.sys;
        //const author = item.fields.author[0].fields.name;
        const featuredImage = item.fields.freaturedImage.fields.file.url;
      
        return {
          title,
          slug,
          authorObj,
          featuredImage,
          createdAt
        };
      });
      // console.log("from here",posts); 
      return posts;
  };

  export const getBlogPosts = async () => {
   
        const entries = await client.getEntries({
      content_type: 'post',
      select: 'fields.author,sys.createdAt,fields.slug,fields.title,fields.excerpt,fields.freaturedImage,fields.category'
    });
    // console.log("from getvblogposts",entries); 
    return entries;
  };

  export const getBlogPostDetails = async (slug) => {
    
    const entries = await client.getEntries({
      content_type: 'post',
      'fields.slug': slug
    });
    
    const post = entries.items[0];
    return post;
    
  };


  export const getAdjacentBlogPosts = async (createdAt, slug) => {
    // Get the next post
    const nextPostQuery = {
      content_type: 'post',
      'fields.slug[ne]': slug,
      'sys.createdAt[gte]': createdAt,
      order: 'sys.createdAt',
      limit: 1
    };
    const nextPostResponse = await client.getEntries(nextPostQuery);
    const nextPost = nextPostResponse.items[0]?.fields;
    const nextPostcreatedAt = nextPostResponse.items[0]?.sys.createdAt;
    // console.log("next",nextPostcreatedAt); 

    // console.log("fromfasfafa",nextPost); 
    // Get the previous post
    const previousPostQuery = {
      content_type: 'post',
      'fields.slug[ne]': slug,
      'sys.createdAt[lte]': createdAt,
      order: '-sys.createdAt',
      limit: 1
    };
    const previousPostResponse = await client.getEntries(previousPostQuery);
    const previousPost = previousPostResponse.items[0]?.fields;
    const previousPostcreatedAt = previousPostResponse.items[0]?.sys.createdAt;
    // console.log("prewvvvvv",previousPostcreatedAt); 
  
    return {
      next: nextPost ? {
        title: nextPost.title,
        featuredImage: nextPost.freaturedImage?.fields?.file?.url,
        createdAt: nextPostcreatedAt,
        slug: nextPost.slug
      } : null,
      previous: previousPost ? {
        title: previousPost.title,
        featuredImage: previousPost.freaturedImage?.fields?.file?.url,
        createdAt: previousPostcreatedAt,
        slug: previousPost.slug
      } : null
    };
  };



  export const getBlogPostComments = async (slug) => {
  
    const entries = await client.getEntries({
      content_type: 'comment',
      'fields.postSlug': slug
    })

    // console.log("the vhercccc,", entries)
    return entries.items;
  };


  
  export const submitPostComment = async (obj) => {
    
    const {name,email, comment,slug} = obj

  
  
    const client = contentfulManagement.createClient({
      accessToken: process.env.NEXT_PUBLIC_CONTENT_CONTENTFUL_TOKEN
    })
    
    
    client.getSpace(process.env.NEXT_PUBLIC_SPACE_ID)
    .then((space) => space.getEnvironment(process.env.NEXT_PUBLIC_ENV))
    .then((environment) => environment.createEntry('comment', {
      fields: {
        name: {
          'en-US': name
        },
        email: {
          'en-US': email
        },
        comment: {
          'en-US': comment
        },
        postSlug: {
          'en-US': slug
        }
      }
    }))
    .then((entry) => console.log(entry))
    .catch(console.error)
 
}



export const getSimilarBlogPosts = async (category, slug) => {
 
  try {
    const entries = await client.getEntries({
      content_type: 'post',
     'fields.slug[ne]': slug,
     'fields.category.sys.contentType.sys.id': 'category',
     'fields.category.fields.slug': category,
     limit: 3,
   });

    const posts = entries.items.map(item => {
      return {
        title: item.fields.title,
        featuredImage: item.fields.freaturedImage.fields.file.url,
        createdAt: item.sys.createdAt,
        slug: item.fields.slug
      }
    });
    // console.log('recent si ilil posts', posts)
    return posts;
  } catch (error) {
    console.log(error);
  }

};


export const getRecentBlogPosts = async () => {
  try {
    const entries = await client.getEntries({
      content_type: 'post',
      order: '-sys.createdAt',
      limit: 3
    });
    const posts = entries.items.map(item => {
      return {
        title: item.fields.title,
        featuredImage: item.fields.freaturedImage.fields.file.url,
        createdAt: item.sys.createdAt,
        slug: item.fields.slug
      }
    });
    // console.log('recent posts', posts)
    return posts;
  } catch (error) {
    console.log(error);
  }
};


export const getBlogCategoryPost = async (slug) => {
  
  try {
    const entries = await client.getEntries({
      content_type: 'post',
     'fields.category.sys.contentType.sys.id': 'category',
     'fields.category.fields.slug': slug
   });
  //  console.log('by enter', entries)
    // const posts = entries.items.map(item => {
    //   return {
    //     title: item.fields.title,
    //     featuredImage: item.fields.freaturedImage.fields.file.url,
    //     createdAt: item.sys.createdAt,
    //     slug: item.fields.slug,
    //     author: item.fields.author[0].fields.name,
    //     excerpt: item.fields.excerpt,
    //     category: item.fields.category.fields.name,
         
    //   }
    // });
    // console.log('by category', posts)
    return entries;
  } catch (error) {
    console.log(error);
  }

};
