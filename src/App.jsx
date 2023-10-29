import React, { useState } from "react";
import "./index.css";
import { Form } from "./components/Form";
import { MainHeader } from "./components/MainHeader";
import { MoneyList } from "./components/MoneyList";
import { useLocalStorage } from "./useLocalStorage";

function App() {
  const [spendingItems, setSpendingItems] = useLocalStorage("spending", []);
  const [showAlert, setShowAlert] = useState(false);
  const [removeAlert, setRemoveAlert] = useState(false);

  // 지출 -(false), 수입 +(true)
  const [plusMinus, setPlusMinus] = useState(false);

  return (
    <div className="App">
      <MainHeader />
      <Form
        spendingItems={spendingItems}
        setSpendingItems={setSpendingItems}
        plusMinus={plusMinus}
        setPlusMinus={setPlusMinus}
        setShowAlert={setShowAlert}
      />
      <MoneyList
        spendingItems={spendingItems}
        setSpendingItems={setSpendingItems}
        plusMinus={plusMinus}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        removeAlert={removeAlert}
        setRemoveAlert={setRemoveAlert}
      />
    </div>
  );
}

export default App;
