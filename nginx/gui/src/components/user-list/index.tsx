import * as React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem } from '@material-ui/core';
import { User } from '../../api/types';
import { Avatar } from '..';
import './styles.scss';

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <>
      {users?.length ? (
        <List>
          {users?.map((user: User) => (
            <Link to={`/user/${user?.username}`}>
              <ListItem>
                <Avatar user={user} />
                {user.username}
              </ListItem>
            </Link>
          ))}
        </List>
      ) : (
        <div>No users found!</div>
      )}
    </>
  );
};

export default UserList;
