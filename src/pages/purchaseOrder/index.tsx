import { useState } from "react";
import { PurchaseOrderHeader } from "./PurchaseOrderHeader";
import { PurchaseOrderTable } from "./PurchaseOrderTable";
import { PurchaseOrderDetail } from "./PurchaseOrderDetail";
import { InsideNavbar } from "@/components/ui/inside-navbar";
import { PurchaseOrderData, PurchaseOrderFilters } from "@/types/purchaseOrder";
import { CreatePurchaseOrder } from "./CreatePurchaseOrder";

export default function PurchaseOrder() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState<PurchaseOrderFilters>({
        status: "all"
    });
    const [scene, setScene] = useState(1);
    const [detailData, setDetailData] = useState<PurchaseOrderData>({
        pid: '',
        id: '',
        created_date: '',
        shipTo: '',
        billTo: '',
        department: '',
        status: 'Created',
        createdBy: {
            name: '',
            avatar: ''
        },
        approvedBy: {
            name: '',
            avatar: ''
        },
        totalNetAmount: 0,
        totalTaxAmount: 0,
        totalAmount: 0,
        items: [],
        approved: false,
        sent: false
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
                                onCreate={() => handlePage(2)}
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
                            <CreatePurchaseOrder onClickUndo={() => handlePage(1)} />
                        </main>
                    </>
                ) : scene === 3 ? (
                    <>
                        <InsideNavbar text="Purchase Order" onClick={() => handlePage(1)} />
                        <main className="flex-1 p-6 bg-white bg-opacity-50">
                            <PurchaseOrderDetail
                                props={detailData}
                                onClickUndo={() => handlePage(1)}
                            />
                        </main>
                    </>
                ) : ''
            }
        </div>
    );
}