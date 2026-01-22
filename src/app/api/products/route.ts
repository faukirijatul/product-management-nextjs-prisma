import { deleteImage, uploadImage } from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface ProductWhereInput {
  OR?: Array<{
    name?: { contains: string };
    description?: { contains: string };
  }>;
  categoryId?: string;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const idParam = searchParams.get("id");

  if (idParam) {
    const id = idParam;

    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  }

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const skip = (page - 1) * limit;

  const search = searchParams.get("search")?.trim() || undefined;

  const categoryId = searchParams.get("categoryId") || undefined;

  const sortBy = searchParams.get("sortBy") || "createdAt";
  const sortOrder = searchParams.get("sortOrder") === "asc" ? "asc" : "desc";

  let orderBy: Prisma.ProductOrderByWithRelationInput = {};

  if (sortBy === "category.name") {
    orderBy = {
      category: {
        name: sortOrder,
      },
    };
  } else {
    const validFields: Array<keyof Prisma.ProductOrderByWithRelationInput> = [
      "name",
      "price",
      "discount",
      "stock",
      "createdAt",
    ];

    if (
      validFields.includes(
        sortBy as keyof Prisma.ProductOrderByWithRelationInput,
      )
    ) {
      orderBy = {
        [sortBy]: sortOrder,
      };
    } else {
      orderBy = { createdAt: "desc" };
    }
  }

  const where: ProductWhereInput = {};

  if (search) {
    const searchLower = search.toLowerCase().trim();

    where.OR = [
      {
        name: {
          contains: searchLower,
        },
      },
      {
        description: {
          contains: searchLower,
        },
      },
    ];
  }

  if (categoryId) {
    where.categoryId = categoryId;
  }

  try {
    const total = await prisma.product.count({ where });

    const products = await prisma.product.findMany({
      where,
      include: { category: true },
      orderBy,
      skip,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      data: products,
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage,
        hasPrevPage,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const form = await req.formData();

  const name = form.get("name") as string;
  const description = form.get("description") as string;
  const price = parseFloat(form.get("price") as string);
  const discount = parseFloat(form.get("discount") as string) || 0;
  const stock = parseInt(form.get("stock") as string);
  const categoryId = form.get("categoryId") as string;
  const image = form.get("image") as File | null;

  let imageUrl: string | undefined = undefined;
  if (image && image.size > 0) {
    imageUrl = await uploadImage(image);
  }

  const product = await prisma.product.create({
    data: { name, description, price, discount, stock, categoryId, imageUrl },
  });

  return NextResponse.json(product, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const form = await req.formData();
  const id = form.get("id") as string;

  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  const name = form.get("name") as string;
  const description = form.get("description") as string;
  const price = parseFloat(form.get("price") as string);
  const discount = parseFloat(form.get("discount") as string) || 0;
  const stock = parseInt(form.get("stock") as string);
  const categoryId = form.get("categoryId") as string;
  const image = form.get("image") as File | null;

  let imageUrl = existing.imageUrl;

  if (image && image.size > 0) {
    if (imageUrl) await deleteImage(imageUrl);
    imageUrl = await uploadImage(image);
  }

  const product = await prisma.product.update({
    where: { id: String(id) },
    data: { name, description, price, discount, stock, categoryId, imageUrl },
  });

  return NextResponse.json(product);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id")!;

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  await deleteImage(product.imageUrl || "");
  await prisma.product.delete({ where: { id } });

  return new NextResponse(null, { status: 204 });
}
