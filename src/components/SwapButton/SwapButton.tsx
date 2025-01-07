import "./style.css";
import React from "react";

interface SwapButtonProps {
  onClick: () => void;
  isLoading: boolean;
  isDisabled: boolean;
}

const SwapButton: React.FC<SwapButtonProps> = ({
  onClick,
  isLoading,
  isDisabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled || isLoading}
      className="swap-button"
    >
      {isLoading ? <span className="spinner"></span> : "Swap"}
    </button>
  );
};

export default SwapButton;
