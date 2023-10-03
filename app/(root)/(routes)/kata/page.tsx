import { format } from "date-fns";

import prismadb from "@/lib/prisma";

import { KataColumn } from "./components/columns";
import { KataClient } from "./components/client";

const KataPage = async ({}) => {
  const kata = await prismadb.kata.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
      service: true,
    },
  });

  const formattedKata: KataColumn[] = kata.map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category.name,
    service: item.service.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-11 pt-6">
          <KataClient data={formattedKata} />
        </div>
      </div>
    </>
  );
};

export default KataPage;
