import PropTypes from "prop-types";
import React, { useCallback, useMemo, useEffect } from "react";
import { getSum } from "./helper/getSum";
import { EditableText } from "./EditableText";
import { EditableSpending } from "./EditableSpending";
import { EditableDate } from "./EditableDate";

export const MoneyList = ({
  spendingItems,
  setSpendingItems,
  showAlert,
  removeAlert,
  setRemoveAlert,
}) => {
  const handleRemove = useCallback(
    (id) => {
      if (window.confirm("정말 이 항목을 지울까요?") === true) {
        const nextSpending = spendingItems.filter((item) => item.id !== id);
        setSpendingItems(nextSpending);
        setRemoveAlert(true);
        setTimeout(() => setRemoveAlert(false), 3000);
      }
    },
    [spendingItems, setRemoveAlert, setSpendingItems]
  );

  const spendingSum = useMemo(() => getSum(spendingItems), [spendingItems]);

  useEffect(() => {
    localStorage.setItem("spending", JSON.stringify(spendingItems));
  }, [spendingItems]);

  const spendigList = spendingItems.map((item) => (
    <div
      className="px-2 py-4 flex items-center relative rounded hover:shadow-lg"
      key={crypto.randomUUID()}
    >
      <div className="flex-1 grow mb-2 items-start">
        <EditableDate id={item.id} time={item.time} />
        <li className="flex mt-3 cursor-pointer">
          <EditableText initialText={item.text} id={item.id} />
          <EditableSpending
            initialSpending={item.spending}
            id={item.id}
            plusMinus={item.plusMinus}
          />
        </li>
      </div>
      <button
        className="ml-2 h-10 flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => handleRemove(item.id)}
      >
        ⅹ
      </button>
    </div>
  ));
  return (
    <>
      <div className="container mx-auto shadow-lg w-1/2 rounded-md p-6">
        {showAlert && (
          <div className="success-alert font-semibold text-center p-1.5 container rounded-md bg-cyan-100 mb-2 mx-auto w-full">
            성공적으로 추가되었습니다.
          </div>
        )}
        {removeAlert && (
          <div className="success-alert font-semibold text-center p-1.5 container rounded-md bg-cyan-100 mb-2 mx-auto w-full">
            성공적으로 삭제되었습니다.
          </div>
        )}
        <ul>{spendigList}</ul>
        <div className="flex justify-center mt-6 break-all text-center">
          <b>총 금액: {spendingSum} 원 </b>
        </div>
      </div>
    </>
  );
};

MoneyList.propTypes = {
  spendingItems: PropTypes.array,
  setSpendingItems: PropTypes.func,
  showAlert: PropTypes.bool,
  removeAlert: PropTypes.bool,
  setRemoveAlert: PropTypes.func,
};
