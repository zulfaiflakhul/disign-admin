import { NextResponse } from "next/server";

import prismadb from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { categoryId, name, serviceId, videos } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }
    if (!serviceId) {
      return new NextResponse("Service id is required", { status: 400 });
    }

    if (!videos || !videos.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    const kata = await prismadb.kata.create({
      data: {
        categoryId,
        name,
        serviceId,
        videos: {
          create: [...videos.map((videos: { url: string }) => videos)],
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
    const serviceId = searchParams.get("serviceId") || undefined;

    const kata = await prismadb.kata.findMany({
      where: {
        categoryId,
        serviceId,
      },
      include: {
        videos: true,
        category: true,
        service: true,
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
