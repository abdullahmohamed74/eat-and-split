import { useEffect, useState } from 'react';
import {
  Button,
  FormAddFriend,
  FormSplitBill,
  FriendsList,
} from './components';

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem('friends'));
};

function App() {
  const [friends, setFriends] = useState(
    getLocalStorage() || [...initialFriends]
  );
  const [addFirendFormOpen, setAddFirendFormOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  // handle add friend form closing and openning
  const handleAddFriendForm = () => {
    setAddFirendFormOpen((cur) => !cur);
    // close the split bill form when open add friend form
    setSelectedFriend(null);
  };

  // add a new friend object to the friends array
  // also close the add friend form
  const handleAddFriend = (newFriend) => {
    setFriends((curFriends) => [...curFriends, newFriend]);
    // close the add friend form after submitting it
    setAddFirendFormOpen(false);
  };

  // handle split bill form closing and openning
  const handleFriendSelection = (friend) => {
    setSelectedFriend((curSelectedfriend) =>
      curSelectedfriend?.id === friend.id ? null : friend
    );
    // close the add friend form when open split bill form
    setAddFirendFormOpen(false);
  };

  // handle balance change when submitting split bill form
  const handleBalanceChange = (balance) => {
    // console.log(balance);
    setFriends((curFriends) =>
      curFriends.map((friend) =>
        friend.id === selectedFriend?.id
          ? { ...friend, balance: friend.balance + balance }
          : friend
      )
    );
    // close the split bill form when submitting it
    setSelectedFriend(null);
  };

  // save friends to localStorage each time friends array changes
  useEffect(() => {
    localStorage.setItem('friends', JSON.stringify(friends));
  }, [friends]);

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          handleFriendSelection={handleFriendSelection}
          selectedFriend={selectedFriend}
        />

        {addFirendFormOpen && <FormAddFriend onAddFriend={handleAddFriend} />}

        <Button onClick={handleAddFriendForm}>
          {addFirendFormOpen ? 'Close' : 'Add Friend'}
        </Button>
      </div>

      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          handleBalanceChange={handleBalanceChange}
        />
      )}
    </div>
  );
}

export default App;
