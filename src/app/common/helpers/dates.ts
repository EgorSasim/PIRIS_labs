export function getMonthDifference(date1: Date, date2: Date): number {
  return Math.abs(
    date1.getMonth() -
      date2.getMonth() +
      12 * (date1.getFullYear() - date2.getFullYear())
  );
}
