import React from 'react'
import ProductCreateContainer from './_components/product-create.container'
import { Metadata } from 'next';

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { id } = await searchParams;

  const pageTitle = id 
    ? 'Update Product | Product Management App'
    : 'Create Product | Product Management App';

  return {
    title: pageTitle,
    description: 'Product Management App',
  };
}

type Props = {
  searchParams: Promise<{ id: string }>
}

const CreateProductPage = async ({ searchParams }: Props) => {
  const { id } = await searchParams;
  return (
    <div><ProductCreateContainer id={id} /></div>
  )
}

export default CreateProductPage