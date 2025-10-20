/**
 * Formats a date string into a relative time format (e.g., "2h ago", "1d ago")
 * @param dateString - ISO date string to format
 * @returns Formatted relative time string
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else {
    return `${diffInDays}d ago`;
  }
}

export function formatISODateForDisplay(
  isoDate: string,
  type: DateFormatType
): string {
  const date = new Date(isoDate);

  const optionsWithoutTime: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const optionsWithTime: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  if (type === 'withtime') {
    return date.toLocaleString('en-US', optionsWithTime);
  } else {
    return date.toLocaleDateString('en-US', optionsWithoutTime);
  }
}

export function getRelativeTimeFromNow(isoDate: string): string {
  const now = new Date();
  const target = new Date(isoDate);
  const diffMs = now.getTime() - target.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (seconds < 60) {
    return `${seconds}s ago`;
  } else if (minutes < 60) {
    return `${minutes}m ago`;
  } else if (hours < 24) {
    return `${hours}h ago`;
  } else {
    return `${days}d ago`;
  }
}

export function getMonthAndDayFromISO(isoDate: string): string {
  const date = new Date(isoDate);

  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
  };

  return date.toLocaleDateString('en-US', options);
}

/**
 * Format a given ISO date string into a readable format.
 *
 * Examples:
 *  - "2025-10-19T19:07:00Z" (today) → "Today, 7:07 PM"
 *  - "2025-06-05T09:30:00Z" → "June 5"
 *  - "2025-08-05T09:30:00Z" → "Aug 5"
 *  - "2025-01-10T09:30:00Z" → "Jan 10"
 */
export function formatTrashAtDate(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();

  // Check if it's today
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
    // Format time like "7:07 PM"
    const timeString = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
    return `Today, ${timeString}`;
  }

  const fullMonthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const month = fullMonthNames[date.getMonth()];
  const day = date.getDate();

  // If month name length is 4 (June, July), keep full name
  // Otherwise, take first 3 letters
  const displayMonth = month.length === 4 ? month : month.slice(0, 3);

  return `${displayMonth} ${day}`;
}
