import prisma from "@/lib/prisma";
import HomeContainer from "./_components/home.container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beranda | Product Management App",
  description:
    "Product Management App adalah platform yang membantu tim dan individu dalam mengelola produk secara efisien, mulai dari perencanaan, pengembangan, hingga monitoring performa produk. Kami berfokus pada kemudahan penggunaan, produktivitas, dan kolaborasi yang lebih baik.",
};

export default async function HomePage() {
  const products = await prisma.product.findMany({
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
    },
  });

  return <HomeContainer initialProducts={products} />;
}

