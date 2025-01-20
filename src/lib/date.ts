export function formatDate(dateString: string): string {
  if (dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  } else {
    return '';
  }
}


export const convertDate = (date: Date) => {
  return date.toISOString().split('T')[0];
}