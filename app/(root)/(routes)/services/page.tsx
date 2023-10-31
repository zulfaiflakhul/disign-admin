export const dynamic = "force-dynamic";

import { format } from "date-fns";

import prismadb from "@/lib/prisma";

import { ServiceColumn } from "./components/columns";
import { ServicesClient } from "./components/client";
import { revalidatePath } from "next/cache";

const ServicesPage = async ({}) => {
  const services = await prismadb.service.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  revalidatePath("/services");

  const formattedServices: ServiceColumn[] = services.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <>
      <div className="flex-col">
        <div className="flex-1 md:space-y-4 md:p-11 pt-6">
          <ServicesClient data={formattedServices} />
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
