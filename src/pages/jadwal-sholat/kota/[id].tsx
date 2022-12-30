import Loading from "@/atoms/loading";
import { bulan, currentDate, hari, tahun } from "@/helpers/formatDate";
import { useFetch } from "@/hooks/useFetch";
import TableJadwalSholat from "@/organisms/tableJadwalSholat";
import Layout from "@/templates/layout";
import { JADWAL_SHOLAT_API } from "@/utils/api";
import { NextRouter, useRouter } from "next/router";

const KotaId = () => {
  const router: NextRouter = useRouter();
  const { id } = router.query;
  const formatDate: string = `${tahun}/${bulan}`;

  const { data, isLoading, error } = useFetch(`${JADWAL_SHOLAT_API}/jadwal/${id}/${formatDate}`);

  if (isLoading) return <Loading />;
  if (error) return <p>Error!</p>;

  const waktu = data.data;

  return (
    <Layout title={`Jadwal Sholat ${waktu.lokasi}`}>
      <div className="flex flex-col items-center justify-center">
        <h1>{waktu.lokasi}</h1>
        <p className="text-lg font-medium">
          PROVINSI {waktu.daerah}, {currentDate.toUpperCase()}
        </p>
      </div>
      <div className="flex w-full items-center gap-7 overflow-x-auto text-center lg:justify-center">
        <TableJadwalSholat tanggal={hari} tahun={tahun} bulan={bulan} waktu={waktu} />
      </div>
    </Layout>
  );
};

export default KotaId;
