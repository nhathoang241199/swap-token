import "./style.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CurrencyDropdown from "../Dropdown/CurrencyDropdown";
import SwapButton from "../SwapButton/SwapButton";
import { TCurrency } from "../../utils/type";

const CurrencySwapForm: React.FC = () => {
  const [currencies, setCurrencies] = useState<TCurrency[]>([]);
  const [fromCurrency, setFromCurrency] = useState<number>(0);
  const [toCurrency, setToCurrency] = useState<number>(1);
  const [amount, setAmount] = useState<string>("0");
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [rate, setRate] = useState(0);
  const [loadingPrices, setLoadingPrices] = useState<boolean>(true);
  const [swapLoading, setSwapLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoadingPrices(true);
    axios
      .get("https://interview.switcheo.com/prices.json")
      .then((res) => {
        setCurrencies(res.data);
      })
      .catch((err) => {
        console.error("Error when getting token price:", err);
      })
      .finally(() => {
        setLoadingPrices(false);
      });
  }, []);

  useEffect(() => {
    const rate =
      currencies[fromCurrency]?.price / currencies[toCurrency]?.price;
    setRate(rate);
    if (
      currencies &&
      amount &&
      currencies[fromCurrency] &&
      currencies[toCurrency]
    ) {
      setConvertedAmount((Number(amount) || 0) * rate);
    } else {
      setConvertedAmount(0);
    }
  }, [amount, fromCurrency, toCurrency, currencies]);

  const handleSwap = () => {
    setSwapLoading(true);
    setTimeout(() => {
      setSwapLoading(false);
      alert("Successful conversion!");
    }, 2000);
  };

  return (
    <div className="form-container">
      {loadingPrices ? (
        <div className="loadding">
          <span className="spinner"></span>
        </div>
      ) : (
        <>
          <p className="form-title">Swap</p>
          <CurrencyDropdown
            amount={amount}
            setAmount={setAmount}
            currencies={currencies}
            selectedCurrency={fromCurrency}
            onChange={setFromCurrency}
            convertedAmount={convertedAmount}
            isFirstToken
          />
          <CurrencyDropdown
            amount={amount}
            setAmount={setAmount}
            currencies={currencies}
            selectedCurrency={toCurrency}
            onChange={setToCurrency}
            convertedAmount={convertedAmount}
          />
          <p className="rate">
            1 {currencies[toCurrency]?.currency} = {rate.toFixed(2) + " "}
            {currencies[fromCurrency]?.currency}
          </p>
          <SwapButton
            onClick={handleSwap}
            isLoading={swapLoading}
            isDisabled={
              !amount || !convertedAmount || fromCurrency === toCurrency
            }
          />
        </>
      )}
    </div>
  );
};

export default CurrencySwapForm;
