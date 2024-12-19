import { useState } from "react";
import { ReservationHeader } from "./ReservationHeader";
import { ReservationTable } from "./ReservationTable";
import { ReceptionsData } from "@/types/receptions";
import { CreateReceptions } from "./CreateReservation";
import { InsideNavbar } from "@/components/ui/inside-navbar";
import { ReceptionsDetail } from "./ReservationDetail";

function Receptions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [scene, setScene] = useState(1);
  const [detailData, setDetailData] = useState<ReceptionsData>({
    id: '',
    purchaseOrderNo: 0,
    items: '',
    storeKeeper: '',
    purchaseOrder: '',
  });

  const handlePage = (page: number) => {
    setScene(page);
  }

  const handleCreate = () => {
    setScene(3);
  }

  return (
    <div className="border-none">
      {
        scene === 1 ? (
          <>
            <InsideNavbar text="" onClick={() => handlePage(2)} />
            <main className="flex-1 p-6 bg-white bg-opacity-50">
              <ReservationHeader
                onSearchChange={setSearchQuery}
                onCreate={() => handlePage(2)}
              />
              <ReservationTable
                searchQuery={searchQuery}
                onClickView={(item) => {
                  handlePage(3);
                  setDetailData(item);
                }}
              />
            </main>
          </>

        ) : scene === 2 ? (
          <>
            <InsideNavbar text="Receptions" onClick={() => handlePage(1)} />
            <main className="flex justify-center items-end bg-white bg-opacity-50">
              <CreateReceptions onClick={() => handleCreate()} />
            </main>
          </>
        ) : scene === 3 ? (
          <>
            <InsideNavbar text="Receptions" onClick={() => handlePage(1)} />
            <main className="flex-1 bg-white bg-opacity-50">
              <ReceptionsDetail {...detailData} />
            </main>
          </>
        ) : ''
      }
    </div>
  );
}

export default Receptions;
