import { NextResponse } from "next/server";

import prismadb from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { categoryId, name, meanings, images } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    const kata = await prismadb.kata.create({
      data: {
        categoryId,
        name,
        meanings,
        images: {
          create: [...images.map((image: { url: string }) => image)],
        },
      },
    });

    return NextResponse.json(kata);
  } catch (error) {
    console.log("[COUPON_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;

    const kata = await prismadb.kata.findMany({
      where: {
        categoryId,
      },
      include: {
        images: true,
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(kata);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
