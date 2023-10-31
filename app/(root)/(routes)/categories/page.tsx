export const dynamic = "force-dynamic";

import { format } from "date-fns";

import prismadb from "@/lib/prisma";

import { CategoryColumn } from "./components/columns";
import { CategoriesClient } from "./components/client";

const CategoriesPage = async ({}) => {
  const categories = await prismadb.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <>
      <div className="flex-col">
        <div className="flex-1 md:space-y-4 md:p-11 pt-6">
          <CategoriesClient data={formattedCategories} />
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
