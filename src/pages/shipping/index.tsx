import { useState } from "react";
import { ShippingHeader } from "./ShippingHeader";
import { ShippingTable } from "./ShippingTable";
import { CarriesHeader } from "./CarriesHeader";

import { CarriesTable } from "./CarriesTable";

import ShippingDetail from "./ShippingDetail";
import { ShippingFilters, CarriesFilters } from "@/types/shipping";
import { SortOption } from "@/types/utils";

import { InsideNavbar } from "@/components/ui/inside-navbar";

export default function Shipping() {
  const [shippingfilters, setShippingFilters] = useState<ShippingFilters>({
    status: "all",
    carrier: "all",
  });
  const [carriesfilters, setCarriesFilters] = useState<CarriesFilters>({
    status: "all"
  });
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [scene, setScene] = useState(1);

  const handlePage = (page: number) => {
    setScene(page);
  }

  const handleView = () => {
    setScene(2);
  }

  const handleCarrier = () => {
    setScene(3);
  }

  return (
    <div className="border-none">
      {
        scene === 1 ? (
          <>
            <InsideNavbar text="" onClick={() => handlePage(2)} />
            <main className="flex-1 p-6 bg-white bg-opacity-50">
              <ShippingHeader
                onFiltersChange={setShippingFilters}
                onSortChange={setSortOption}
                onSearchChange={setSearchQuery}
              />
              <ShippingTable
                filters={shippingfilters}
                sortOption={sortOption}
                searchQuery={searchQuery}
                onClick={() => handleView()}
              />
            </main>
          </>

        ) : scene === 2 ? (
          <>
            <InsideNavbar text="Shipping" onClick={() => handlePage(1)} />
            <main className="flex-1 p-6 bg-white bg-opacity-50">
              <ShippingDetail 
                onClick={ () => handleCarrier() }
              />
            </main>
          </>
        ) : scene === 3 ? (
          <>
            <InsideNavbar text="Shipping" onClick={() => handlePage(1)} />
            <main className="flex-1 p-6 bg-white bg-opacity-50">
              <CarriesHeader
                onFiltersChange={setCarriesFilters}
                onSortChange={setSortOption}
                onSearchChange={setSearchQuery}
              />
              <CarriesTable
                filters={carriesfilters}
                sortOption={sortOption}
                searchQuery={searchQuery}
                onClick={() => handleCarrier()}
              />
            </main>
          </>
        ) : ''
      }
    </div>
  );
}


