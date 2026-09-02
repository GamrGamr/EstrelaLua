export function cleanNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : 0;
}

export function roundMoney(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateSplit(incomeAValue, incomeBValue, expenseValues = []) {
  const incomeA = roundMoney(cleanNumber(incomeAValue));
  const incomeB = roundMoney(cleanNumber(incomeBValue));
  const totalIncome = roundMoney(incomeA + incomeB);
  const totalExpenses = roundMoney(expenseValues.reduce((sum, value) => sum + cleanNumber(value), 0));
  const shareA = totalIncome > 0 ? incomeA / totalIncome : 0;
  const shareB = totalIncome > 0 ? incomeB / totalIncome : 0;
  const proportionalA = totalIncome > 0 ? roundMoney(totalExpenses * shareA) : 0;
  const proportionalB = totalIncome > 0 ? roundMoney(totalExpenses - proportionalA) : 0;
  const equalA = roundMoney(totalExpenses / 2);
  const equalB = roundMoney(totalExpenses - equalA);

  return {
    incomeA,
    incomeB,
    totalIncome,
    totalExpenses,
    shareA,
    shareB,
    proportional: {
      paymentA: proportionalA,
      paymentB: proportionalB,
      remainingA: roundMoney(incomeA - proportionalA),
      remainingB: roundMoney(incomeB - proportionalB)
    },
    equal: {
      paymentA: equalA,
      paymentB: equalB,
      remainingA: roundMoney(incomeA - equalA),
      remainingB: roundMoney(incomeB - equalB)
    }
  };
}
