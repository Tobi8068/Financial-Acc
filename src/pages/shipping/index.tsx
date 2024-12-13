import { useState } from "react";
import { CarriesHeader } from "./CarryHeader";
// import { CarriesTable } from "./CarriesTable";
import { CarriesFilters } from "@/types/shipping";
import { SortOption } from "@/types/utils";

function App() {
  const [filters, setFilters] = useState<CarriesFilters>({
    status: "all",
  });
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
        <main className="flex-1 p-6">
          <CarriesHeader
            onFiltersChange={setFilters}
            onSortChange={setSortOption}
            onSearchChange={setSearchQuery}
          />
          {/* <ShippingTable
            filters={filters}
            sortOption={sortOption}
            searchQuery={searchQuery}
          /> */}
        </main>
    </div>
  );
}

export default App;
