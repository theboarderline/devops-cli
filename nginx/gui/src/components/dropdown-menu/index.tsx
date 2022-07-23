import * as React from 'react';
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import './styles.scss';

interface ChangeProps {
  value: unknown;
}

interface DropdownMenuProps {
  title: string;
  value: any;
  values: any[] | null;
  setValue: (value: any) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  title,
  value,
  values,
  setValue
}) => {
  const handleChange = (event: React.ChangeEvent<ChangeProps>) => {
    setValue(event.target.value);
  };

  return (
    <FormControl className="cgs-dropdown" variant="outlined">
      <InputLabel className="cgs-dropdown--label" id="dropdown-label">
        {title}
      </InputLabel>

      <Select
        labelId="dropdown-label"
        id="dropdown"
        value={value}
        onChange={handleChange}
        label={title}
        classes={{
          outlined: 'cgs-dropdown--outlined'
        }}
        MenuProps={{
          className: 'cgs-dropdown--menu',
          classes: {
            paper: 'cgs-dropdown--paper',
            list: 'cgs-dropdown--list'
          }
        }}
      >
        <MenuItem key={-1} value="" className="cgs-dropdown--item">
          All
        </MenuItem>
        {values?.map((val) => (
          <MenuItem key={val.id} value={val} className="cgs-dropdown--item">
            {val.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropdownMenu;
