import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ProductDetailsContainer from "./_components/product-details.container";

interface ProductDetailPageProps {
  params: Promise<{ productId: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { productId } = await params;

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        category: true,
      },
    });

    if (!product) {
      notFound();
    }

    return <ProductDetailsContainer initialProduct={product} productId={productId} />;
  } catch (error) {
    console.error("Error fetching product:", error);
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-error">Terjadi kesalahan saat memuat produk</h1>
        <p className="mt-4 text-gray-600">Silakan coba lagi nanti</p>
      </div>
    );
  }
}

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { productId } = await params;

  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { name: true, description: true },
  });

  if (!product) return { title: "Produk Tidak Ditemukan" };

  return {
    title: `${product.name} | Product Management App`,
    description: product.description?.substring(0, 160) || "",
  };
}