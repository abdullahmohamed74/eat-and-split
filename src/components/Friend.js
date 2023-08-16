import Button from './Button';

function Friend({ friend, handleFriendSelection, selectedFriend }) {
  const { id, name, image, balance } = friend;

  const isSelected = id === selectedFriend?.id;

  return (
    <li className={isSelected ? 'selected' : ''}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p className={balance < 0 ? 'red' : balance > 0 ? 'green' : ''}>
        {balance < 0
          ? `you owe ${name} ${Math.abs(balance)}€`
          : balance > 0
          ? `${name} owes you ${balance}€`
          : `You and ${name} are even`}
      </p>
      <Button onClick={() => handleFriendSelection(friend)}>
        {isSelected ? 'Close' : 'Select'}
      </Button>
    </li>
  );
}
export default Friend;
