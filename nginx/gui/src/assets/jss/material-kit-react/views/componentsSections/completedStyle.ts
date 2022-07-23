import { createStyles } from '@material-ui/core/styles';
import { container } from '../../../material-kit-react';

const completedStyle = createStyles({
  section: {
    padding: '70px 0',
  },
  container: {
    ...container,
    textAlign: 'center !important' as any,
  },
});

export default completedStyle;
