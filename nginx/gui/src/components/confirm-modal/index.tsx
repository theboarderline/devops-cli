import * as React from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  Dialog
} from '@material-ui/core';
import { Message, Loader } from '..';
import './styles.scss';

interface ConfirmModalProps {
  action: string | null;
  onSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  msg: string;
  errorMsg: string;
  loading: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  action,
  onSubmit,
  msg,
  errorMsg,
  loading
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div
        onClick={handleClick}
        aria-controls="simple-menu"
        aria-haspopup="true"
      >
        Delete
      </div>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClick}
        aria-labelledby="report-title"
      >
        <DialogContent>
          <div>Are you sure you would like to {action}?</div>
        </DialogContent>

        <DialogActions>
          <Message
            severity={errorMsg ? 'error' : 'success'}
            message={errorMsg || msg}
          />
          <Loader loading={loading} />
          <Button onClick={onSubmit} color="primary">
            Submit
          </Button>
          <Button onClick={handleClick} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmModal;
