import PropTypes from "prop-types";
import { useState, useCallback, useRef } from "react";
import { validateInput } from "./helper/validateInput";

export const Form = ({
  spendingItems,
  setSpendingItems,
  plusMinus,
  setPlusMinus,
  setShowAlert,
}) => {
  const [inputItem, setInputItem] = useState("");
  // 지출 금액
  const [inputSpending, setInputSpending] = useState("");
  const inputEl = useRef(null);

  const handleChangeItem = useCallback((e) => {
    setInputItem(e.target.value);
  }, []);

  const handleChangeSpending = useCallback((e) => {
    setInputSpending(e.target.value);
  }, []);

  const handleClick = useCallback(() => {
    if (validateInput(inputItem, inputSpending) === true) {
      const nextSpending = spendingItems.concat({
        plusMinus: plusMinus,
        id: Date.now(),
        text: inputItem,
        spending: parseInt(inputSpending),
        time: new Date().toISOString().split("T")[0],
      });
      nextSpending.sort(function (a, b) {
        return b.id - a.id;
      });
      setSpendingItems(nextSpending);

      setInputItem("");
      setInputSpending("");

      inputEl.current.focus();
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  }, [
    inputItem,
    inputSpending,
    spendingItems,
    plusMinus,
    setShowAlert,
    setSpendingItems,
  ]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  const handleClickPlus = () => {
    setPlusMinus(true);
  };
  const handleClickMinus = () => {
    setPlusMinus(false);
  };

  return (
    <>
      <div
        className="flex flex-wrap justify-center align-middle mt-4 mb-6"
        onKeyDown={handleKeyDown}
      >
        <div>
          <button
            className={`${
              plusMinus ? "bg-blue-700" : "bg-blue-500"
            } h-10 flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
            onClick={handleClickPlus}
          >
            +
          </button>
          <button
            className={`${
              plusMinus ? "bg-blue-500" : "bg-blue-700"
            } h-10 flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2`}
            onClick={handleClickMinus}
          >
            −
          </button>
        </div>
        <div className="my-auto">
          <input
            type="text"
            value={inputItem}
            onChange={handleChangeItem}
            className="px-4 py-3 rounded-full"
            placeholder="지출 항목"
            ref={inputEl}
            required
          />
          <input
            type="number"
            value={inputSpending}
            onChange={handleChangeSpending}
            className="px-4 py-3 rounded-full"
            placeholder="지출 금액"
            required
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClick}
          >
            추가
          </button>
        </div>
      </div>
    </>
  );
};

Form.propTypes = {
  spendingItems: PropTypes.array,
  setSpendingItems: PropTypes.func,
  plusMinus: PropTypes.bool,
  setPlusMinus: PropTypes.func,
  setShowAlert: PropTypes.func,
};
