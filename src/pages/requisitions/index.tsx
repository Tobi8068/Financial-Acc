import { useState } from "react";
import { RequisitionsHeader } from "./RequisitionsHeader";
import { RequisitionsTable } from "./RequisitionsTable";
import { RequisitionsFilters, RequisitionsData } from "@/types/requisitions";
import { CreateRequisitions } from "./CreateRequisitions";
import { InsideNavbar } from "@/components/ui/inside-navbar";
import { RequisitionsDetail } from "./RequisitionsDetail";

function Requisitions() {
  const [filters, setFilters] = useState<RequisitionsFilters>({
    status: "all"
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [scene, setScene] = useState(1);
  const [detailData, setDetailData] = useState<RequisitionsData>({
    pid: '',
    id: '',
    dateCreated: '',
    shipTo: '',
    billTo: '', 
    department: '',
    status: 'Created',
    approvedBy: '',
    createdBy: '',
    totalNetAmount: 0,
    totalTaxAmount: 0,
    totalAmount: 0,
    items: [] 
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
              <RequisitionsHeader
                onFiltersChange={setFilters}
                onSearchChange={setSearchQuery}
                onCreate={() => handlePage(2)}
              />
              <RequisitionsTable
                filters={filters}
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
            <InsideNavbar text="Requisitions" onClick={() => handlePage(1)} />
            <main className="flex justify-center items-center bg-white bg-opacity-50">
              <CreateRequisitions />
            </main>
          </>
        ) : scene === 3 ? (
          <>
            <InsideNavbar text="Requisitions" onClick={() => handlePage(1)} />
            <main className="flex-1 p-6 bg-white bg-opacity-50">
              <RequisitionsDetail {...detailData} />
            </main>
          </>
        ) : ''
      }
    </div>
  );
}

export default Requisitions;
