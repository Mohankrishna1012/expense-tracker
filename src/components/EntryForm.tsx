import React, { useState } from 'react';
import { Entry } from '../App';

interface EntryFormProps {
  onAddEntry: (entry: Entry) => void;
}

const EntryForm: React.FC<EntryFormProps> = ({ onAddEntry }) => {
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [month, setMonth] = useState('January');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: Entry = {
      id: Date.now(),
      type,
      description,
      amount: parseFloat(amount),
      month,
    };
    onAddEntry(newEntry);
    setDescription('');
    setAmount('');
    setMonth('January');
  };

  return (
    <form className="entry-form" onSubmit={handleSubmit}>
      <select value={type} onChange={(e) => setType(e.target.value as 'income' | 'expense')}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(
          (m) => (
            <option key={m} value={m}>
              {m}
            </option>
          )
        )}
      </select>
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default EntryForm;
