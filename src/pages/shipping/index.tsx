import { useState } from "react";
import { ShippingHeader } from "./ShippingHeader";
import { ShippingTable } from "./ShippingTable";
import { CarriesHeader } from "./CarriesHeader";
import { CarriesTable } from "./CarriesTable";
import ShippingDetail from "./ShippingDetail";
import { ShippingFilters, CarriesFilters, ShippingData } from "@/types/shipping";
import { SortOption } from "@/types/utils";
import { InsideNavbar } from "@/components/ui/inside-navbar";
import { CreateShipping } from "./CreateShipping";

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
  const [detailData, setDetailData] = useState<ShippingData>({
    id: '',
    name: '',
    notes: '',
    dateCreated: '',
    status: 'pending',
    sales: 0,
    carrier: '',
    other: '',
    tracking: '',
    packingList: false,
  });

  const handlePage = (page: number) => {
    setScene(page);
  }

  const handleCarrier = () => {
    setScene(3);
  }

  const handleCreate = () => {
    setScene(2);
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
                onCreate={() => handlePage(2)}
              />
              <ShippingTable
                filters={shippingfilters}
                sortOption={sortOption}
                searchQuery={searchQuery}
                onClickView={(item)=>{
                  handlePage(2);
                  setDetailData(item);
                }}
              />
            </main>
          </>
        ) : scene === 2 ? (
          <>
            <InsideNavbar text="Shipping" onClick={() => handlePage(1)} />
            <main className="flex-1 p-6 bg-white bg-opacity-50">
              <ShippingDetail
                props={detailData}
                onClickCarrier={() => handlePage(1)}
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
        ) : scene === 4 ? (
          <>
            <InsideNavbar text="Shipping" onClick={() => handlePage(1)} />
            <main className="flex justify-center items-end bg-white bg-opacity-50">
              <CreateShipping onClick={() => handleCreate()} />
            </main>
          </>
        ) : ''
      }
    </div>
  );
}