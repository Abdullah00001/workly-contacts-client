export function formatSmartDate(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();

  // Convert both to local time by comparing Y/M/D
  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  if (isToday) {
    // Example: "Today, 4:11 PM"
    const timeString = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
    return `Today, ${timeString}`;
  } else {
    // Example: "Jan 20, 2024"
    const dateString = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    return dateString;
  }
}
