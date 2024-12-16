import { useState } from "react";
import { PurchaseOrderHeader } from "./PurchaseOrderHeader";
import { PurchaseOrderTable } from "./PurchaseOrderTable";
import { PurchaseOrderDetail } from "./PurchaseOrderDetail";
import { InsideNavbar } from "@/components/ui/inside-navbar";
import { PurchaseOrderData, PurchaseOrderFilters } from "@/types/purchaseOrder";

export default function PurchaseOrder() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState<PurchaseOrderFilters>({
        status: "all"
    });
    const [scene, setScene] = useState(1);
    const [detailData, setDetailData] = useState<PurchaseOrderData>({
        id: '',
        dateCreated: '',
        shipTo: '',
        billTo: '',
        department: '',
        status: 'Created',
        createdBy: '',
        approved: true,
        approvedBy: '',
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
                            <PurchaseOrderHeader
                                onFiltersChange={setFilters}
                                onSearchChange={setSearchQuery}
                            />
                            <PurchaseOrderTable
                                filters={filters}
                                searchQuery={searchQuery}
                                onClickView={(item) => {
                                    handlePage(2);
                                    setDetailData(item);
                                }}
                            />
                        </main>
                    </>

                ) : scene === 2 ? (
                    <>
                        <InsideNavbar text="Purchase Order" onClick={() => handlePage(1)} />
                        <main className="flex-1 p-6 bg-white bg-opacity-50">
                            <PurchaseOrderDetail {...detailData} />
                        </main>
                    </>
                ) : ''
            }
        </div>
    );
}