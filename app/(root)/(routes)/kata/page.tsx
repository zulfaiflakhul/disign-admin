import { format } from "date-fns";

import prismadb from "@/lib/prisma";

import { KataColumn } from "./components/columns";
import { KataClient } from "./components/client";

const KataPage = async ({}) => {
  const products = await prismadb.kata.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
    },
  });

  const formattedKata: KataColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category.name,
    meanings: item.meanings,
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
