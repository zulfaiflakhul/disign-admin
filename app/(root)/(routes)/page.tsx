"use client";

import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

const DashboardPage = () => {
  const [data, setData] = useState([]);
  const [layanan, setLayanan] = useState([]);

  const fetchDataKata = () => {
    fetch("https://admin.unydisign.com/api/kata")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  };

  const fetchDataLayanan = () => {
    fetch("http://admin.unydisign.com/api/services")
      .then((res) => res.json())
      .then((layanan) => {
        setLayanan(layanan);
      });
  };

  useEffect(() => {
    fetchDataKata();
    fetchDataLayanan();
  }, []);

  return (
    <>
      <div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold tracking-tight text-center md:text-start">
            Selamat Datang Admin
          </h1>
          <p className="text-muted-foreground text-center md:text-start">
            Kelola Manajemen Data Kata dan Kalimat Untuk Kamus DiSign
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-10 text-center gap-5">
          <div className="flex flex-col border rounded-xl gap-5 p-2">
            <p>Lingkup Layanan</p>
            <h1 className="text-6xl font-bold">{layanan.length}</h1>
            <p>Layanan</p>
          </div>
          <div className="flex flex-col border rounded-xl gap-5 p-2">
            <p>Jumlah Kata & Kalimat</p>
            <h1 className="text-6xl font-bold">{data.length}</h1>
            <p>Kata & Kalimat</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
