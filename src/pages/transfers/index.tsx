import { useState } from "react";
import { TransfertHeader } from "./TransfertHeader";
import { TransfertTable } from "./TransfertTable";
import { TransfertData, TransfertFilters } from "@/types/transferts";
import { SortOption } from "@/types/utils";
import { CreateTransfert } from "./CreateTransfert";
import { InsideNavbar } from "@/components/ui/inside-navbar";
import { TransfertDetail } from "./TransfertDetail";

function Transfert() {
  const [filters, setFilters] = useState<TransfertFilters>({
    status: "all"
  });
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [scene, setScene] = useState(1);
  const [detailData, setDetailData] = useState<TransfertData>({
    id: '',
    date: '',
    reason: '',
    createdBy: {
      name: '',
      avatar: '',
    },
    status: 'Approve',
    bin: '',
    items: []
  });

  const handlePage = (page: number) => {
    setScene(page);
  }

  // const handleCreate = () => {

  // }

  return (
    <div className="border-none">
      {
        scene === 1 ? (
          <>
            <InsideNavbar text="" onClick={() => handlePage(2)} />
            <main className="flex-1 p-6 bg-white bg-opacity-50">
              <TransfertHeader
                onFiltersChange={setFilters}
                onSortChange={setSortOption}
                onSearchChange={setSearchQuery}
                onCreate={() => handlePage(2)}
              />
              <TransfertTable
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
            <InsideNavbar text="transfert" onClick={() => handlePage(1)} />
            <main className="flex justify-center items-center bg-white bg-opacity-50">
              <CreateTransfert />
            </main>
          </>
        ) : scene === 3 ? (
          <>
            <InsideNavbar text="Transfert" onClick={() => handlePage(1)} />
            <main className="flex-1 bg-white bg-opacity-50">
              <TransfertDetail {...detailData} />
            </main>
          </>
        ) : ''
      }
    </div>
  );
}

export default Transfert;
