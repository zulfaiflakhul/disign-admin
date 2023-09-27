import { NextResponse } from "next/server";

import prismadb from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { kataId: string } }
) {
  try {
    if (!params.kataId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const kata = await prismadb.kata.findUnique({
      where: {
        id: params.kataId,
      },
      include: {
        category: true,
        images: true,
      },
    });

    return NextResponse.json(kata);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { kataId: string } }
) {
  try {
    if (!params.kataId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const kata = await prismadb.kata.delete({
      where: {
        id: params.kataId,
      },
    });

    return NextResponse.json(kata);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { kataId: string } }
) {
  try {
    const body = await req.json();

    const { name, meanings, images, categoryId } = body;

    if (!params.kataId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    await prismadb.kata.update({
      where: {
        id: params.kataId,
      },
      data: {
        name,
        meanings,
        categoryId,
        images: {
          deleteMany: {},
        },
      },
    });

    const kata = await prismadb.kata.update({
      where: {
        id: params.kataId,
      },
      data: {
        images: {
          create: [...images.map((image: { url: string }) => image)],
        },
      },
    });

    return NextResponse.json(kata);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
