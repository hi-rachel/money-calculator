import React, { useState } from "react";
import Datepicker from "tailwind-datepicker-react";
import moment from "moment";
import PropTypes from "prop-types";

const options = {
  title: "Demo Title",
  autoHide: true,
  todayBtn: false,
  clearBtn: true,
  clearBtnText: "Clear",
  maxDate: new Date("2030-01-01"),
  minDate: new Date("1950-01-01"),
  theme: {
    background: "bg-gray-700 dark:bg-gray-800",
    todayBtn: "",
    clearBtn: "",
    icons: "",
    text: "",
    disabledText: "bg-red-500",
    input: "",
    inputIcon: "",
    selected: "",
  },
  icons: {
    prev: () => <span>Previous</span>,
    next: () => <span>Next</span>,
  },
  datepickerClassNames: "top-12",
  defaultDate: new Date(),
  language: "en",
  disabledDates: [],
  weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  inputNameProp: "date",
  inputIdProp: "date",
  inputPlaceholderProp: "Select Date",
  inputDateFormatProp: {
    day: "numeric",
    month: "long",
    year: "numeric",
  },
};

export const EditableDate = ({ id, time }) => {
  const itemDate = moment(time, "YYYY-MM-DD").toDate();
  const [startDate, setStartDate] = useState(itemDate);

  const origin = JSON.parse(localStorage.getItem("spending"));

  const updateOrigin = origin.map((item) => {
    return item.id === id ? { ...item, time: startDate } : item;
  });
  localStorage.setItem("spending", JSON.stringify(updateOrigin));

  const handleChangeDate = (date) => {
    setStartDate(date);
  };

  return (
    <div>
      <Datepicker
        showIcon
        selected={startDate}
        onChange={handleChangeDate}
        show={true}
        options={options}
      ></Datepicker>
    </div>
  );
};

EditableDate.propTypes = {
  id: PropTypes.number,
  time: PropTypes.string,
};
