// 1. Code readability:
// - Use clearer variable names and consistent formatting.
// - Fix indentation for better structure.
// 2. TypeScript correctness:
// - Ensure proper typing for balances and prices.
// - Add typings for getPriority and other functions.
// 3. Bug fixes:
// - Address logical issues (e.g., lhsPriority is undefined in the original code).
// - Use filter and sort correctly to avoid unnecessary calculations.
// 4. Performance:
// - Minimize recalculations in useMemo dependencies.
// - Avoid unnecessary mappings.

// Improvements
// 1. Filtering and Sorting:
// - Ensured only valid balances with a priority greater than -99 and amounts > 0 are considered.
// - Fixed sorting to consistently use rightPriority - leftPriority.
// 2. useMemo Dependencies:
// - Kept dependencies minimal to ensure recalculations only occur when necessary.
// 3. Error Handling:
// - Handled cases where prices might not contain a value for a specific currency.
// 4. Formatting:
// - Added toFixed(2) for consistent numeric formatting.
// 5. Code Structure:
// - Modularized logic for better readability.
// - Used useMemo for expensive computations to avoid unnecessary re-renders.

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // Added as it's used in getPriority
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances: WalletBalance[] = useWalletBalances(); // Ensure correct type
  const prices: Record<string, number> = usePrices(); // Assuming prices is a dictionary

  // Get priority for a blockchain
  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  // Filter and sort balances
  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance) => {
        const priority = getPriority(balance.blockchain);
        return priority > -99 && balance.amount > 0; // Filter valid and non-zero balances
      })
      .sort((lhs, rhs) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority; // Higher priority first
      });
  }, [balances]);

  // Format balances
  const formattedBalances = useMemo(() => {
    return sortedBalances.map((balance) => ({
      ...balance,
      formatted: balance.amount.toFixed(2), // Include 2 decimal places for better UX
    }));
  }, [sortedBalances]);

  // Create rows for rendering
  const rows = useMemo(() => {
    return formattedBalances.map((balance, index) => {
      const usdValue = prices[balance.currency] * balance.amount || 0; // Handle missing price gracefully
      return (
        <WalletRow
          className="wallet-row" // Avoid dependency on classes
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    });
  }, [formattedBalances, prices]);

  return <div {...rest}>{rows}</div>;
};

export default WalletPage;
