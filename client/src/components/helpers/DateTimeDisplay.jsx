import React from "react";
import { formatDate } from "../../utils/dateTimeUtil";

const DateTimeDisplay = ({ date }) => {
  const { date: formattedDate, time } = formatDate(date);

  return (
    <>
      <div>{formattedDate}</div>
      <div>{time}</div>
    </>
  );
};

export default DateTimeDisplay;
