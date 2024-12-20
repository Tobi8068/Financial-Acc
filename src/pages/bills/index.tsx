import { useState } from "react";
import { BillsHeader } from "./BillsHeader";
import { BillsTable } from "./BillsTable";
import { BillsFilters, BillsData } from "@/types/bills";
import { SortOption } from "@/types/utils";
import { InsideNavbar } from "@/components/ui/inside-navbar";
import { BillsDetail } from "./BillsDetail";

function Bills() {
  const [filters, setFilters] = useState<BillsFilters>({
    status: 'all'
  });
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [scene, setScene] = useState(1);
  const [detailData, setDetailData] = useState<BillsData>({
    id: '',
    dateCreated: '',
    supplier: '',
    requiredDate: '',
    status: 'Need_Approval',
    terms: '',
    shipTo: '',
    billTo: '',
    totalTaxAmount: 0,
    totalNetAmount: 0,
    totalAmount: 0,
    contact: 0,
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
              <BillsHeader
                onFiltersChange={setFilters}
                onSortChange={setSortOption}
                onSearchChange={setSearchQuery}
                onCreate={() => handlePage(2)}
              />
              <BillsTable
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
        ) : scene === 3 ? (
          <>
            <InsideNavbar text="Production" onClick={() => handlePage(1)} />
            <main className="flex-1 p-6 bg-white bg-opacity-50">
              <BillsDetail {...detailData} />
            </main>
          </>
        ) : ''
      }
    </div>
  );
}

export default Bills;