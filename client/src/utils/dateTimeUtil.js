const timeZone = "Asia/Manila";

export const formatDate = (date) => {
  const formatter = new Intl.DateTimeFormat("en-PH", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone,
  });
  const formattedDate = formatter.format(new Date(date));

  const [datePart, timePart] = formattedDate.split(", ");
  return { date: datePart, time: timePart };
};

export const formatDateForInput = (date) => {
  const formatter = new Intl.DateTimeFormat("en-PH", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone,
  });
  return formatter.format(new Date(date));
};

export const formatTimeForInput = (date) => {
  const formatter = new Intl.DateTimeFormat("en-PH", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  });
  return formatter.format(new Date(date));
};
