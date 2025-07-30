export const formatTaskDate = (dateString: any) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  const parts = formattedDate.split(", ");
  return `${parts[0]}, ${parts[1]} - ${parts[2]}`;
};
