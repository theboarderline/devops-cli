import { createStyles } from '@material-ui/core/styles';
import { container } from '../../../material-kit-react';

const carouselStyle = createStyles({
  section: {
    padding: '70px 0',
  },
  container,
  marginAuto: {
    marginLeft: 'auto !important',
    marginRight: 'auto !important',
  },
});

export default carouselStyle;
