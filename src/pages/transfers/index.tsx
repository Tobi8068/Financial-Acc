import { useState } from "react";
import { TransfersHeader } from "./TransfersHeader";
import { TransfersTable } from "./TransfersTable";
import { TransfersData, TransfersFilters } from "@/types/transfers";
import { SortOption } from "@/types/utils";
import { CreateTransfers } from "./CreateTransfers";
import { InsideNavbar } from "@/components/ui/inside-navbar";
import { TransfersDetail } from "./TransfersDetail";

function Transfers() {
  const [filters, setFilters] = useState<TransfersFilters>({
    status: "all"
  });
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [scene, setScene] = useState(1);
  const [detailData, setDetailData] = useState<TransfersData>({
    id: '',
    date: '',
    items: '',
    reason: '',
    createdBy: {
      name: '',
      avatar: '',
    },
    status: 'Approved',
    bin: 1,
    reservationDate: '',
    reservedBy: {
      name: '',
      avatar: '',
    },
  });

  const handlePage = (page: number) => {
    setScene(page);
  }

  const handleCreate = () => {

  }

  return (
    <div className="border-none">
      {
        scene === 1 ? (
          <>
            <InsideNavbar text="" onClick={() => handlePage(2)} />
            <main className="flex-1 p-6 bg-white bg-opacity-50">
              <TransfersHeader
                onFiltersChange={setFilters}
                onSortChange={setSortOption}
                onSearchChange={setSearchQuery}
                onCreate={() => handlePage(2)}
              />
              <TransfersTable
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
            <InsideNavbar text="transfers" onClick={() => handlePage(1)} />
            <main className="flex justify-center items-center bg-white bg-opacity-50">
              <CreateTransfers onClick={() => handleCreate()} />
            </main>
          </>
        ) : scene === 3 ? (
          <>
            <InsideNavbar text="Transfers" onClick={() => handlePage(1)} />
            <main className="flex-1 bg-white bg-opacity-50">
              <TransfersDetail {...detailData} />
            </main>
          </>
        ) : ''
      }
    </div>
  );
}

export default Transfers;
