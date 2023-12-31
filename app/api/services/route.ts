import { NextResponse } from "next/server";

import prismadb from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const service = await prismadb.service.create({
      data: {
        name,
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.log("[CATEGORIES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const service = await prismadb.service.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.log("[SERVICE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
