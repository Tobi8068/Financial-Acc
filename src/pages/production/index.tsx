import { useState } from "react";
import { ProductionHeader } from "./ProductionHeader";
import { ProductionTable } from "./ProductionTable";
import { ProductionFilters, ProductionData } from "@/types/production";
import { SortOption } from "@/types/utils";
import { CreateProduction } from "./CreateProduction";
import { InsideNavbar } from "@/components/ui/inside-navbar";
import { ProductionDetail } from "./ProductionDetail";

function Production() {
  const [filters, setFilters] = useState<ProductionFilters>({
    status: "all"
  });
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [scene, setScene] = useState(1);
  const [detailData, setDetailData] = useState<ProductionData>({
    id: '',
    date: '',
    name: '',
    project: '',
    productionStartDate: '',
    productionEndDate: '',
    status: 'Created',
    approved: true,
    approvedBy: {
      name: '',
      avatar: ''
    },
    createdBy: {
      name: '',
      avatar: ''
    },
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
              <ProductionHeader
                onFiltersChange={setFilters}
                onSortChange={setSortOption}
                onSearchChange={setSearchQuery}
                onCreate={() => handlePage(2)}
              />
              <ProductionTable
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
            <InsideNavbar text="Production" onClick={() => handlePage(1)} />
            <main className="flex justify-center items-center bg-white bg-opacity-50">
              <CreateProduction
                onClickUndo={() => handlePage(1)}
              />
            </main>
          </>
        ) : scene === 3 ? (
          <>
            <InsideNavbar text="Production" onClick={() => handlePage(1)} />
            <main className="flex-1 p-6 bg-white bg-opacity-50">
              <ProductionDetail
                props={detailData}
                onClickUndo={
                  () => handlePage(1)
                }
              />
            </main>
          </>
        ) : ''
      }
    </div>
  );
}

export default Production;
