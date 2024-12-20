import { useState } from "react";
import { SuppliersHeader } from "./SuppliersHeader";
import { SuppliersTable } from "./SuppliersTable";
import { SuppliersData, SuppliersFilters } from "@/types/suppliers";
import { SortOption } from "@/types/utils";
import { CreateSuppliers } from "./CreateSupplier";
import { InsideNavbar } from "@/components/ui/inside-navbar";
import { SuppliersDetail } from "./SuppliersDetail";

function Suppliers() {
  const [filters, setFilters] = useState<SuppliersFilters>({
    status: "all"
  });
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [scene, setScene] = useState(1);
  const [detailData, setDetailData] = useState<SuppliersData>({
    id: '',
    supplierName: '',
    supplierCode: '',
    address: '',
    appartment: '',
    street: '',
    city: '',
    state: '',
    postalAddress: '',
    country: '',
    billingAddress: '',
    shippingAddress: '',
    bankName: '',
    accountNumber: 0,
    transitNumber: 0,
    currency: '',
    purchaseContact: '',
    purchaseOrder: '',
    status: 'Approved',
  });

  const handlePage = (page: number) => {
    setScene(page);
  }

  const handleCreate = () => {

  }

  return (
    <div className="border-none">
      {
        scene === 1 ? (
          <>
            <InsideNavbar text="" onClick={() => handlePage(2)} />
            <main className="flex-1 p-6 bg-white bg-opacity-50">
              <SuppliersHeader
                onFiltersChange={setFilters}
                onSortChange={setSortOption}
                onSearchChange={setSearchQuery}
                onCreate={() => handlePage(2)}
              />
              <SuppliersTable
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
            <InsideNavbar text="Suppliers" onClick={() => handlePage(1)} />
            <main className="flex justify-center items-center bg-white bg-opacity-50">
              <CreateSuppliers onClick={() => handleCreate()} />
            </main>
          </>
        ) : scene === 3 ? (
          <>
            <InsideNavbar text="Suppliers" onClick={() => handlePage(1)} />
            <main className="flex-1 bg-white bg-opacity-50">
              <SuppliersDetail {...detailData} />
            </main>
          </>
        ) : ''
      }
    </div>
  );
}

export default Suppliers;
