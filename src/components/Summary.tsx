import React from 'react';
import { Entry } from '../App';

interface SummaryProps {
  entries: Entry[];
}

const Summary: React.FC<SummaryProps> = ({ entries }) => {
  const totalIncome = entries.filter((e) => e.type === 'income').reduce((sum, e) => sum + e.amount, 0);
  const totalExpenses = entries.filter((e) => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0);
  const balance = totalIncome - totalExpenses;

  return (
    <div className="summary">
      <div>Total Income: ${totalIncome}</div>
      <div>Total Expenses: ${totalExpenses}</div>
      <div>Balance: ${balance}</div>
    </div>
  );
};

export default Summary;
