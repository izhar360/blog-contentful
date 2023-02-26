import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { getBlogCategories } from '../services/api';
const Categories = () => {
  
  const [blogCategories, setBlogCategories] = useState([]);

  useEffect(() => {
    getBlogCategories().then((newCategories) => {
      setBlogCategories(newCategories);
    });
  }, []);
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>
      {blogCategories.map((category, index) => (
        <Link key={index} href={`/category/${category.fields.slug}`}>
          <span className={`cursor-pointer block ${(index === blogCategories.length - 1) ? 'border-b-0' : 'border-b'} pb-3 mb-3`}>{category.fields.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
