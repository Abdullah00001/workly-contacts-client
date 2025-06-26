const DateUtils = {
  formatDate: (isoDateString: string): string => {
    try {
      const date = new Date(isoDateString);

      // Check if date is valid
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date string');
      }

      const months = [
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

      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();

      return `${day} ${month} ${year}`;
    } catch (error) {
      throw new Error(
        `Failed to format date: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  },
};

export default DateUtils;
