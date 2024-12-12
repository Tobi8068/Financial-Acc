import { SalesStatus } from "@/types/sales";
import { Badge } from '@/components/ui/badge';

export const getStatusBadge = (status: SalesStatus) => {
    const styles = {
        Created: 'bg-[#EFF8FF] text-[#175CD3]',
        Approved: 'bg-[#ECFDF3] text-[#027A48]',
        Sent: 'bg-[#F8F9FC] text-[#363F72]',
        Partially_Received: 'bg-[#FFF6ED] text-[#C4320A]',
        Completed: 'bg-[#ECFDF3] text-[#027A48]',
        Cancelled: 'bg-[#FFF1F3] text-[#C01048]',
        Pending: 'bg-[#EFF8FF] text-[#175CD3]',
        Rejected: 'bg-[#FFF1F3] text-[#C01048]',
    };

    return (
        <Badge className={styles[status]} variant="secondary">
            {status.replace("_", " ").replace("0", "/")}
        </Badge>
    );
};