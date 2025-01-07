import "./style.css";
import React from "react";
import { TCurrency } from "../../utils/type";

interface CurrencyDropdownProps {
  currencies: TCurrency[];
  selectedCurrency: number;
  onChange: (currency: number) => void;
  amount: string;
  setAmount: (value: string) => void;
  isFirstToken?: boolean;
  convertedAmount: number;
}

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
  currencies,
  selectedCurrency,
  onChange,
  amount,
  setAmount,
  isFirstToken,
  convertedAmount,
}) => {
  const handleKeyPress = (e: any) => {
    if (!/[0-9.]/.test(e.key)) {
      e.preventDefault();
    }
  };
  return (
    <div className="dropdown-container">
      <div className="select-token">
        <select
          value={selectedCurrency}
          onChange={(e) => onChange(e.target.value as unknown as number)}
          className="dropdown-select"
        >
          {currencies.map((currency, index: number) => (
            <option key={currency?.currency} value={index}>
              {currency?.currency}
            </option>
          ))}
        </select>

        <img
          src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currencies[selectedCurrency]?.currency}.svg`}
          alt={currencies[selectedCurrency]?.currency}
          className="currency-logo"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/24?text=?";
          }}
        />
        {isFirstToken ? (
          <input
            className="amount-input"
            value={amount}
            onKeyPress={handleKeyPress}
            onChange={(e) => {
              const inputValue = e.target.value;
              setAmount(inputValue);
            }}
          />
        ) : (
          <p className="convert-amount">{convertedAmount.toFixed(4) || 0}</p>
        )}
      </div>

      <p className="price">
        Price: ${currencies[selectedCurrency]?.price.toFixed(2)}
      </p>
    </div>
  );
};

export default CurrencyDropdown;
