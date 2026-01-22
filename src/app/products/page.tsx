import { Metadata } from 'next';
import React from 'react'
import ProductListContainer from './_components/product-list.container';

export const metadata: Metadata = {
    title: "Products | Product Management App",
    description: "Product Management App",
};

const ProducPage = () => {
  return (
    <div>
        <ProductListContainer />
    </div>
  )
}

export default ProducPage