"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type KataColumn = {
  id: string;
  name: string;
  category: string;
  service: string;
};

export const columns: ColumnDef<KataColumn>[] = [
  {
    accessorKey: "name",
    header: "Judul",
  },
  {
    accessorKey: "category",
    header: "Kategori",
  },
  {
    accessorKey: "service",
    header: "Layanan",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
