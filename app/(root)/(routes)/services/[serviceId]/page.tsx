export const dynamic = "force-dynamic";

import prismadb from "@/lib/prisma";
import { ServiceForm } from "./components/service-form";

const ServicePage = async ({ params }: { params: { serviceId: string } }) => {
  const category = await prismadb.service.findUnique({
    where: {
      id: params.serviceId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 md:space-y-4 md:p-11 pt-6">
        <ServiceForm initialData={category} />
      </div>
    </div>
  );
};

export default ServicePage;
