import Friend from './Friend';

function FriendsList({ friends, handleFriendSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => {
        return (
          <Friend
            key={friend.id}
            friend={friend}
            handleFriendSelection={handleFriendSelection}
            selectedFriend={selectedFriend}
          />
        );
      })}
    </ul>
  );
}
export default FriendsList;
