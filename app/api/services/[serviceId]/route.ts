import { NextResponse } from "next/server";

import prismadb from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { serviceId: string } }
) {
  try {
    if (!params.serviceId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const service = await prismadb.service.findUnique({
      where: {
        id: params.serviceId,
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.log("[CATEGORY_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { serviceId: string } }
) {
  try {
    if (!params.serviceId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const service = await prismadb.service.delete({
      where: {
        id: params.serviceId,
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { serviceId: string } }
) {
  try {
    const body = await req.json();

    const { name } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const service = await prismadb.service.update({
      where: {
        id: params.serviceId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
