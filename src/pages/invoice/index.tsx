import { useState } from "react";
import { InvoiceHeader } from "./InvoiceHeader";
import { InvoiceTable } from "./InvoiceTable";
import { InvoiceData, InvoiceFilters } from "@/types/invoice";
import { SortOption } from "@/types/utils";
import { CreateInvoice } from "./CreateInvoice";
import { InsideNavbar } from "@/components/ui/inside-navbar";
import { InvoiceDetail } from "./InvoiceDetail";

function Invoice() {
  const [filters, setFilters] = useState<InvoiceFilters>({
    status: "all"
  });
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [scene, setScene] = useState(1);
  const [detailData, setDetailData] = useState<InvoiceData>({
    id: '',
    dateCreated: '',
    client: {
      name: '',
      avatar: '',
      email: '',
    },
    requiredData: '',
    shipTo: '',
    billTo: '',
    totalTaxAmount: 0,
    totalNetAmount: 0,
    totalAmount: 0,
    status: 'Approved',
    contact: '',
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
              <InvoiceHeader
                onFiltersChange={setFilters}
                onSortChange={setSortOption}
                onSearchChange={setSearchQuery}
                onCreate={() => handlePage(2)}
              />
              <InvoiceTable
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
            <InsideNavbar text="Invoices" onClick={() => handlePage(1)} />
            <main className="flex justify-center items-center p-6 bg-white bg-opacity-50">
              <CreateInvoice onClick={() => handleCreate()} />
            </main>
          </>
        ) : scene === 3 ? (
          <>
            <InsideNavbar text="Invoices" onClick={() => handlePage(1)} />
            <main className="flex-1 p-6 bg-white bg-opacity-50">
              <InvoiceDetail {...detailData} />
            </main>
          </>
        ) : ''
      }
    </div>
  );
}

export default Invoice;
