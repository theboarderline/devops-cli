import * as React from 'react';
import { InputLabel, Select, MenuItem, FormControl } from '@material-ui/core';
import './styles.scss';

interface SelectFieldProps {
  label?: string;
  required?: boolean;
  value: any | null;
  values: any[] | null;
  setValue: (value: any) => void;
}
const SelectFieldComponent: React.FC<SelectFieldProps> = ({
  label,
  required,
  value,
  values,
  setValue
}) => {
  return (
    <FormControl required={required} variant="outlined" className="cgs-select">
      <InputLabel className="cgs-select--label" id="cgs-select--label">
        {`${label}:`}
      </InputLabel>

      <Select
        id={label}
        value={value || ''}
        onChange={(e) => setValue(e.target.value)}
        labelId="cgs-select--label"
        label={`${label}:`}
        classes={{
          outlined: 'cgs-select--outlined'
        }}
        MenuProps={{
          className: 'cgs-select--menu',
          classes: {
            paper: 'cgs-select--paper',
            list: 'cgs-select--list'
          }
        }}
      >
        {values?.map((val) => (
          <MenuItem className="cgs-select--item" key={val.id} value={val}>
            {val.name || val}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectFieldComponent;
