import { useState } from "react";
import { ReservationHeader } from "./ReservationHeader";
import { ReservationTable } from "./ReservationTable";
import { ReservationData } from "@/types/reservation";
import { CreateReservation } from "./CreateReservation";
import { InsideNavbar } from "@/components/ui/inside-navbar";
import { ReservationDetail } from "./ReservationDetail";

function Reservation() {
  const [searchQuery, setSearchQuery] = useState("");
  const [scene, setScene] = useState(1);
  const [detailData, setDetailData] = useState<ReservationData>({
    id: '',
    dateCreated: '',
    items: '',
    reservationDate: '',
    reason: '',
    project: '',
    storeKeeper: {
      name: '',
      avatar: '',
    },
    reservedBy: {
      name: '',
      avatar: '',
    },
    status: 'Approved',
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
            <InsideNavbar text="Reservation" onClick={() => handlePage(1)} />
            <main className="flex justify-center items-end bg-white bg-opacity-50">
              <CreateReservation onClick={() => handleCreate()} />
            </main>
          </>
        ) : scene === 3 ? (
          <>
            <InsideNavbar text="Reservation" onClick={() => handlePage(1)} />
            <main className="flex-1 bg-white bg-opacity-50">
              <ReservationDetail {...detailData} />
            </main>
          </>
        ) : ''
      }
    </div>
  );
}

export default Reservation;
