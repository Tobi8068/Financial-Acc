

export function InvoiceDetail() {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-6">Invoice Details</h2>
            <div className="rounded-lg p-6 shadow-sm">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                    <div className="space-y-4">
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Invoice Number:&nbsp;</span><span>XY2345</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Date Created:&nbsp;</span><span>Jan 21, 2024</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Client:&nbsp;</span><span>Client Name</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Ship To:&nbsp;</span><span>Name</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Bill To:&nbsp;</span><span>Name</span></div>
                    </div>

                    <div className="space-y-4">
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Status:&nbsp;</span><span className="text-green-600">Approved</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Total Tax Amount:&nbsp;</span><span>$150</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Total Net Amount:&nbsp;</span><span>$650</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Total Amount:&nbsp;</span><span>$800</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Contact:&nbsp;</span><span>+12505550199</span></div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}