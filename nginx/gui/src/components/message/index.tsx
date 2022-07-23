import * as React from 'react';
import './styles.scss';
import { Alert } from '@material-ui/lab';

interface MessageProps {
  message?: string;
  severity?: 'success' | 'error' | 'info' | 'warning';
}

const Message: React.FC<MessageProps> = ({ message, severity = 'info' }) => {
  return message ? (
    <Alert
      className="cgs-message"
      severity={severity}
      classes={{
        message: 'cgs-message--text'
      }}
    >
      {message}
    </Alert>
  ) : null;
};

export default Message;
