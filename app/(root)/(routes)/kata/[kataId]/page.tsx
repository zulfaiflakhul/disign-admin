import prismadb from "@/lib/prisma";
import { KataForm } from "./components/kata-form";

const KataPage = async ({ params }: { params: { kataId: string } }) => {
  const kata = await prismadb.kata.findUnique({
    where: {
      id: params.kataId,
    },
    include: {
      category: true,
      service: true,
      videos: true,
    },
  });

  const categories = await prismadb.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const services = await prismadb.service.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-11 pt-6">
        <KataForm
          initialData={kata}
          services={services}
          categories={categories}
        />
      </div>
    </div>
  );
};

export default KataPage;
