export function newDateWithOffset(days: number): Date {
  //ToDo: Look into dayjs!!!!
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}
