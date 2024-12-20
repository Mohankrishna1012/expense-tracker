import React, { useState } from 'react';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import Summary from './components/Summary';
import Chart from './components/Chart';
import './styles/App.css';

export interface Entry {
  id: number;
  type: 'income' | 'expense';
  description: string;
  amount: number;
  month: string;
}

const App: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);

  const handleAddEntry = (newEntry: Entry) => {
    setEntries((prev) => [...prev, newEntry]);
  };

  const handleDeleteEntry = (id: number) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const handleEditEntry = (updatedEntry: Entry) => {
    setEntries((prev) =>
      prev.map((entry) => (entry.id === updatedEntry.id ? updatedEntry : entry))
    );
  };

  return (
    <div className="app-container">
      <h1>Expense Tracker</h1>
      <EntryForm onAddEntry={handleAddEntry} />
      <Summary entries={entries} />
      <Chart entries={entries} />
      <EntryList
        entries={entries}
        onDeleteEntry={handleDeleteEntry}
        onEditEntry={handleEditEntry}
      />
    </div>
  );
};

export default App;
