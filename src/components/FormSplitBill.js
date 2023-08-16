import { useState } from 'react';
import Button from './Button';

function FormSplitBill({ selectedFriend: { name }, handleBalanceChange }) {
  const [bill, setBill] = useState('');
  const [userExpense, setUserExpense] = useState('');
  const [payingPerson, setPayingPerson] = useState('user');

  const friendExpense = bill - userExpense || '';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bill || !userExpense) return;

    const balance = payingPerson === 'user' ? friendExpense : -userExpense;

    handleBalanceChange(balance);
  };

  return (
    <form onSubmit={handleSubmit} className="form-split-bill">
      <h2>split a bill with {name}</h2>

      <label>💰 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(+e.target.value)}
      />

      <label>🧍‍♀️ Your expense</label>
      <input
        type="text"
        value={userExpense}
        onChange={(e) =>
          +e.target.value <= bill && setUserExpense(+e.target.value)
        }
      />

      <label>👫 {name}'s expense</label>
      <input type="text" disabled value={friendExpense} />

      <label>🤑 Who is paying the bill</label>
      <select
        value={payingPerson}
        onChange={(e) => setPayingPerson(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
export default FormSplitBill;
