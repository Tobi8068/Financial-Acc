import { useState } from "react";
import { InvoiceHeader } from "./InvoiceHeader";
import { InvoiceTable } from "./InvoiceTable";
import { InvoiceFilters, SortOption } from "@/types/invoice";
import { CreateInvoice } from "./CreateInvoice";
import { InsideNavbar } from "@/components/ui/inside-navbar";

function Invoice() {
  const [filters, setFilters] = useState<InvoiceFilters>({
    status: "all"
  });
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [scene, setScene] = useState(1);

  const handleCreate = () => {
    setScene(2);
  }

  const handleHome = () => {
    setScene(1);
  }

  return (
    <div className="border-none">
      {
        scene === 1 ? (
          <>
            <InsideNavbar text="" onClick={handleHome}/>
            <main className="flex-1 p-6 bg-white bg-opacity-50">
              <InvoiceHeader
                onFiltersChange={setFilters}
                onSortChange={setSortOption}
                onSearchChange={setSearchQuery}
                onCreate={handleCreate}
              />
              <InvoiceTable
                filters={filters}
                sortOption={sortOption}
                searchQuery={searchQuery}
              />
            </main>
          </>

        ) : scene === 2 ? (
          <>
            <InsideNavbar text="Invoices" onClick={handleHome}/>
            <main className="flex-1 p-6 bg-white bg-opacity-50">
              <CreateInvoice />
            </main>
          </>
        ) : scene === 3 ? (
          <>
            <InsideNavbar text="Invoices" onClick={handleHome}/>
            <main className="flex-1 p-6 bg-white bg-opacity-50">

            </main>
          </>
        ) : ''
      }
    </div>
  );
}

export default Invoice;
