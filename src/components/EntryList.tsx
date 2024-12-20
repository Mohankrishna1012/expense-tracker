import React, { useState } from 'react';
import { Entry } from '../App';

interface EntryListProps {
  entries: Entry[];
  onDeleteEntry: (id: number) => void;
  onEditEntry: (updatedEntry: Entry) => void;
}

const EntryList: React.FC<EntryListProps> = ({ entries, onDeleteEntry, onEditEntry }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedDescription, setEditedDescription] = useState('');
  const [editedAmount, setEditedAmount] = useState('');

  const handleSave = (id: number) => {
    onEditEntry({
      id,
      type: entries.find((entry) => entry.id === id)!.type,
      description: editedDescription,
      amount: parseFloat(editedAmount),
      month: entries.find((entry) => entry.id === id)!.month,
    });
    setEditingId(null);
  };

  return (
    <ul className="entry-list">
      {entries.map((entry) => (
        <li key={entry.id}>
          {editingId === entry.id ? (
            <>
              <input
                type="text"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
              <input
                type="number"
                value={editedAmount}
                onChange={(e) => setEditedAmount(e.target.value)}
              />
              <button onClick={() => handleSave(entry.id)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <span>{entry.description} - ${entry.amount}</span>
              <button onClick={() => onDeleteEntry(entry.id)}>Delete</button>
              <button
                onClick={() => {
                  setEditingId(entry.id);
                  setEditedDescription(entry.description);
                  setEditedAmount(entry.amount.toString());
                }}
              >
                Edit
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default EntryList;
