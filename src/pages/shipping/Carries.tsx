import { useState } from "react";
import { CarriesHeader } from "./CarriesHeader";
import { CarriesTable } from "./CarriesTable";
import { CarriesFilters } from "@/types/shipping";
import { ShippingHeader } from "./ShippingHeader";
import { ShippingTable } from "./ShippingTable";
import { ShippingFilters } from "@/types/shipping";
import { SortOption } from "@/types/utils";


function Carries() {
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
          {/* <CarriesTable
            filters={filters}
            sortOption={sortOption}
            searchQuery={searchQuery}
          /> */}
        </main>
    </div>
  );
}

export default Carries;
