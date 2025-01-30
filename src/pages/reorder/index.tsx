import { useState } from "react";
import { ReorderHeader } from "./ReOrderHeader";
import { ReOrderTable } from "./ReOrderTable";
import { ReOrderFilters, ReOrderData } from "@/types/reOrder";
import { SortOption } from "@/types/utils";
import { InsideNavbar } from "@/components/ui/inside-navbar";
import { ReOrderDetail } from "./ReOrderDetail";

function Reorder() {
  const [filters, setFilters] = useState<ReOrderFilters>({
    status: "all"
  });
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [scene, setScene] = useState(1);
  const [detailData, setDetailData] = useState<ReOrderData>({
    id: '',
    name: '',
    date: '',
    numberOfItem: 0,
    numberOfRequisition: 0,
    description: '',
    orderUnit: '',
    preferredSupplier: '',
    price: 0,
    itemCode: '',
    manufacturer: '',
    manufacturer_code: '',
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
              <ReorderHeader
                onFiltersChange={setFilters}
                onSortChange={setSortOption}
                onSearchChange={setSearchQuery}
                onCreate={() => handlePage(2)}
              />
              <ReOrderTable
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
            <InsideNavbar text="Production Detail" onClick={() => handlePage(1)} />
            <main className="flex-1 p-6 bg-white bg-opacity-50">
              <ReOrderDetail {...detailData} />
            </main>
          </>
        ) : ''
      }
    </div>
  );
}

export default Reorder;