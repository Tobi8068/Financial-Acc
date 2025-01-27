import { useState } from "react";
import { ReservationHeader } from "./ReservationHeader";
import { ReservationTable } from "./ReservationTable";
import { ReservationData } from "@/types/reservation";
import { CreateReservation } from "./CreateReservation";
import { InsideNavbar } from "@/components/ui/inside-navbar";
import { ReservationDetail } from "./ReservationDetail";

function Reservation() {
  const [filters, setFilters] = useState<any>({
    status: "all"
  });
  const [sortOption, setSortOption] = useState<any>("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [scene, setScene] = useState(1);
  const [detailData, setDetailData] = useState<ReservationData>({
    id: '',
    created_date: '',
    items: [],
    reservation_date: '',
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
 

  return (
    <div className="border-none">
      {
        scene === 1 ? (
          <>
            <InsideNavbar text="" onClick={() => handlePage(2)} />
            <main className="flex-1 p-6 bg-white bg-opacity-50">
              <ReservationHeader
                onFiltersChange={setFilters}
                onSortChange={setSortOption}
                onSearchChange={setSearchQuery}
                onCreate={() => handlePage(2)}
              />
              <ReservationTable
                filters={filters}
                sortOption={sortOption}
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
              <CreateReservation onClick={() => handlePage(1)} />
            </main>
          </>
        ) : scene === 3 ? (
          <>
            <InsideNavbar text="Reservation Detail" onClick={() => handlePage(1)} />
            <main className="flex-1 bg-white bg-opacity-50">
              <ReservationDetail
                props={detailData}
                onClickUndo={() => handlePage(1)}
              />
            </main>
          </>
        ) : ''
      }
    </div>
  );
}export default Reservation;
