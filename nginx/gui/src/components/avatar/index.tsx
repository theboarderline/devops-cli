import * as React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { User } from '../../api/types';
import './styles.scss';

interface AvatarProps {
  user: User | null;
}

const AvatarComponent: React.FC<AvatarProps> = ({ user }) => {
  return (
    <Link to={`/user/${user?.username}`}>
      <Avatar alt="W" src={user?.profile_data?.filename || ''} />
    </Link>
  );
};

export default AvatarComponent;
