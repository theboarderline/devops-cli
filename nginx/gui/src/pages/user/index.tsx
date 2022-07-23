import * as React from 'react';
import { RouteComponentProps, withRouter, useParams } from 'react-router-dom';
import { Grid, DialogBox } from '../../components';
import { HouseForm } from '../../forms';
import { getUser } from '../../api';
import { User } from '../../api/types';
import './styles.scss';

interface UserParamType {
  username: string;
}

interface UserProps {
  previous: {
    location: string;
  };
}

const UserPage: React.FC<UserProps & RouteComponentProps> = ({
  history,
  previous
}) => {

  const { username } = useParams<UserParamType>();

  const [value, setValue] = React.useState(0);
  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    getUser(username)
      .then((userData: User) => {
        console.log('USER:', userData);
        setUser(userData);
      })
  }, [username]);

  const userComponent = (
    <div className="cgs--user">
      <div className="cgs--user-header">
        {/* {user?.id === state.user?.id ? ( */}
        <DialogBox title="Upload House">
          <HouseForm />
        </DialogBox>
        {/* ) : null} */}
      </div>
    </div>
  );

  return (
    <Grid
      items={[
        {
          id: 'cgs--user',
          cols: { xs: 12, sm: 8, md: 6, lg: 4 },
          content: userComponent,
          rows: 1
        }
      ]}
    />
  );
};

export default withRouter(UserPage);
