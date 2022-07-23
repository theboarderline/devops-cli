import * as React from 'react';
import { TextField, InputLabel } from '@material-ui/core';
import './styles.scss';

interface DateFieldProps {
  label: string | undefined;
  required: boolean | false;
  setValue: (value: any) => void;
}

const DateFieldComponent: React.FC<DateFieldProps> = ({
  label,
  required,
  setValue
}) => {
  return (
    <>
      <InputLabel htmlFor={label}>
        {label}: {required ? <strong className="red-mark">*</strong> : null}
      </InputLabel>
      <TextField
        id={label}
        type="date"
        onChange={(e) => setValue(e.target.value)}
        inputProps={{
          className: 'font'
        }}
        InputLabelProps={{
          shrink: true,
          className: 'font'
        }}
      />
    </>
  );
};

export default DateFieldComponent;
