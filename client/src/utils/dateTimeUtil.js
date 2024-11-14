const { format } = require("date-fns");

exports.formatDate = (date) => {
  return format(new Date(date), "yyyy-MM-dd HH:mm:ss", {
    timeZone: "Asia/Manila",
  });
};

exports.formatDateForInput = (date) => {
  return format(new Date(date), "yyyy-MM-dd", { timeZone: "Asia/Manila" });
};

exports.formatTimeForInput = (date) => {
  return format(new Date(date), "hh:mm aa", { timeZone: "Asia/Manila" });
};
