import * as React from 'react';
import { IconButton, SvgIconProps } from '@material-ui/core';
import Tooltip from '../tooltip';

interface IconButtonProps {
  edge?: 'start' | 'end' | false;
  color?: 'default' | 'inherit' | 'primary' | 'secondary';
  disabled?: boolean;
  icon: ((props: SvgIconProps) => JSX.Element) | string;
  onClick: (event: React.MouseEvent) => void;
  tooltipTitle?: string;
}

const IconButtonComponent: React.FC<IconButtonProps> = ({
  edge,
  disabled,
  icon: Icon,
  onClick,
  tooltipTitle
}) => {
  return (
    <Tooltip title={tooltipTitle}>
      <IconButton edge={edge} disabled={disabled} onClick={onClick}>
        <Icon />
      </IconButton>
    </Tooltip>
  );
};

IconButtonComponent.defaultProps = {
  edge: false,
  disabled: false
};

export default IconButtonComponent;
