import { useState } from "react";
import { InvoiceFilters, SortOption } from "@/types/invoice";
import { SalesHeader } from "./SalesHeader";
import { SalesTable } from "./SalesTable";
import { SalesDetail } from "./SalesDetail";
import { InsideNavbar } from "@/components/ui/inside-navbar";
function Sales() {
  const [filters, setFilters] = useState<InvoiceFilters>({
    status: "all"
  });
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [scene, setScene] = useState(2);

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
              <SalesHeader
                onFiltersChange={setFilters}
                onSortChange={setSortOption}
                onSearchChange={setSearchQuery}
              />
              <SalesTable
                filters={filters}
                sortOption={sortOption}
                searchQuery={searchQuery}
              />
            </main>
          </>

        ) : scene === 2 ? (
          <>
            <InsideNavbar text="Sales" onClick={() => handlePage(1)} />
            <main className="flex-1 p-6 bg-white bg-opacity-50">
              <SalesDetail />
            </main>
          </>
        ) : ''
      }
    </div>
  );
}

export default Sales;
