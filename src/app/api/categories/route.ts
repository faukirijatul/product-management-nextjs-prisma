import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const cats = await prisma.category.findMany();
  return NextResponse.json(cats);
}

export async function POST(req: NextRequest) {
  const { name } = await req.json();
  if (!name) return NextResponse.json({ error: 'Name required' }, { status: 400 });

  const cat = await prisma.category.create({ data: { name } });
  return NextResponse.json(cat, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id') as string;
  const { name } = await req.json();

  const cat = await prisma.category.update({ where: { id }, data: { name } });
  return NextResponse.json(cat);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id') as string;

  await prisma.category.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}