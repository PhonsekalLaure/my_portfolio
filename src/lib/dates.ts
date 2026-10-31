const dateFormat = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDate(date: string) {
  return dateFormat.format(new Date(`${date}T00:00:00Z`));
}
