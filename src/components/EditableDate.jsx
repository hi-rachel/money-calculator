import React, { useState } from "react";
import Datepicker from "tailwind-datepicker-react";
import moment from "moment";
import PropTypes from "prop-types";

export const EditableDate = ({ id, time }) => {
  const itemDate = moment(time).toDate();

  const [startDate, setStartDate] = useState(itemDate);
  const [show, setShow] = useState(false);

  const options = {
    title: "기록할 날짜",
    autoHide: true,
    todayBtn: true,
    todayBtnText: "오늘",
    clearBtn: true,
    clearBtnText: "선택 해제",
    maxDate: new Date("2050-12-31"),
    minDate: new Date("1950-01-01"),
    icons: {
      prev: () => <span>이전</span>,
      next: () => <span>다음</span>,
    },
    datepickerClassNames: "top-12",
    defaultDate: startDate,
    language: "ko",
    disabledDates: [],
    weekDays: ["월", "화", "수", "목", "금", "토", "일"],
    inputNameProp: "date",
    inputIdProp: "date",
    inputPlaceholderProp: "Select Date",
    inputDateFormatProp: {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  };

  const origin = JSON.parse(localStorage.getItem("spending"));

  const updateOrigin = origin.map((item) => {
    return item.id === id ? { ...item, time: startDate } : item;
  });
  localStorage.setItem("spending", JSON.stringify(updateOrigin));

  const handleChangeDate = (date) => {
    setStartDate(date);
  };

  const handleClose = (state) => {
    setShow(state);
  };

  return (
    <div>
      <Datepicker
        classNames="flex w-1/2 text-xs min-w-min"
        onChange={handleChangeDate}
        show={show}
        setShow={handleClose}
        options={options}
      ></Datepicker>
    </div>
  );
};

EditableDate.propTypes = {
  id: PropTypes.number,
  time: PropTypes.string,
};
