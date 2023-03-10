import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import { getBlogCategories } from '../services/api';

const Header = () => {

  const [blogCategories, setBlogCategories] = useState([]);

  useEffect(() => {
    getBlogCategories().then((newCategories) => {
      setBlogCategories(newCategories);
    });
  }, []);
  

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-blue-400 py-8">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-white">Contentful Blog</span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {blogCategories.map((category, index) => (
            <Link key={index} href={`/category/${category.fields.slug}`}><span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">{category.fields.name}</span></Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
