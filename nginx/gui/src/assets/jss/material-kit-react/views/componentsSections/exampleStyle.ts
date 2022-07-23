import { createStyles } from '@material-ui/core/styles';
import { containerFluid } from '../../../material-kit-react';

import imagesStyle from '../../imagesStyles';

const exampleStyle = createStyles({
  section: {
    padding: '70px 0',
  },
  container: {
    ...containerFluid,
    textAlign: 'center !important' as any,
  },
  ...imagesStyle,
  link: {
    textDecoration: 'none',
  },
});

export default exampleStyle;
