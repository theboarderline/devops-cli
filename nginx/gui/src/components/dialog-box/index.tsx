import * as React from 'react';
import { Button, DialogTitle, Dialog, DialogContent } from '@material-ui/core';
import './styles.scss';

interface DialogProps {
  title: string | null;
}

const DialogBox: React.FC<DialogProps> = ({ title, children }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        className="dialog-box--btn"
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        classes={{ label: 'dialog-box--btn-label' }}
      >
        {title}
      </Button>

      <Dialog
        onClose={handleClose}
        className="dialog-box"
        aria-labelledby="simple-dialog-title"
        open={open}
        fullWidth
      >
        <DialogTitle
          disableTypography
          className="dialog-box--title"
          id="simple-dialog-title"
        >
          {title}
        </DialogTitle>
        <DialogContent className="dialog-box--content">
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogBox;
