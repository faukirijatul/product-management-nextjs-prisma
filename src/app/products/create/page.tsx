import React from 'react'
import ProductCreateContainer from './_components/product-create.container'

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