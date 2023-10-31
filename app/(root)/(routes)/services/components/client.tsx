"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, ServiceColumn } from "./columns";

interface ServicesClientProps {
  data: ServiceColumn[];
}

export const ServicesClient: React.FC<ServicesClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between gap-5">
        <Heading
          title={`Layanan (${data.length})`}
          description="Kelola layanan yang dijangkau kamus DiSign"
        />
        <Button onClick={() => router.push(`/services/new`)}>
          Tambah Layanan
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Separator />
    </>
  );
};
