export type SortOption = 'newest' | 'oldest' | 'amount-high' | 'amount-low';

export interface Note {
    id: number
    sender: string
    avatar: string
    message: string
    timestamp: string
    isYou?: boolean
}