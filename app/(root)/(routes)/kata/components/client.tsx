"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, KataColumn } from "./columns";

interface KataClientProps {
  data: KataColumn[];
}

export const KataClient: React.FC<KataClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Kata (${data.length})`}
          description="Kelola Kata Untuk Kamus DiSign"
        />
        <Button onClick={() => router.push(`/kata/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Separator />
    </>
  );
};
