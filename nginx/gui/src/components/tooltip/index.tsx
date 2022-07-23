import * as React from 'react';
import { Tooltip } from '@material-ui/core';
import './styles.scss';

interface TooltipProps {
  title?: string;
}

const TooltipComponent: React.FC<TooltipProps> = ({ children, title = '' }) => {
  return (
    <Tooltip
      title={title}
      arrow
      classes={{
        popper: 'cgs--popper',
        tooltip: 'cgs--tooltip'
      }}
    >
      <span>{children}</span>
    </Tooltip>
  );
};

export default TooltipComponent;
