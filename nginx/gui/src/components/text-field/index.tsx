import * as React from 'react';
import { TextField } from '@material-ui/core';
import './styles.scss';

interface TextFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<{ value: string }>) => void;
  id: string;
  helperText?: string;
  label?: string;
  type?: string;
  autoComplete?: string;
  shrinkLabel?: boolean;
  handleSubmit?: any;
  placeholder: string;
}

const TextFieldComponent: React.FC<TextFieldProps> = ({
  onChange,
  value,
  id,
  helperText,
  label,
  type = 'text',
  autoComplete = 'text',
  shrinkLabel,
  handleSubmit,
  placeholder
}) => {
  return (
    <TextField
      className="cgs--text"
      color="primary"
      // hiddenLabel={false}
      placeholder={placeholder}
      select={false}
      inputProps={{ type, autoComplete }}
      InputProps={{
        className: 'cgs--text-input',
        classes: {
          notchedOutline: 'cgs--input-outline',
          focused: 'cgs--input-focused',
          input: 'cgs--input'
        }
      }}
      InputLabelProps={{
        shrink: shrinkLabel,
        className: 'cgs--text-label',
        classes: {
          outlined: 'cgs--text-label-outlined',
          focused: 'cgs--label-focused'
        }
      }}
      id={id}
      fullWidth
      label={label}
      onChange={onChange}
      value={value}
      helperText={helperText}
      variant="outlined"
      onKeyPress={(e) => {
        if (e.key === 'Enter') handleSubmit(e);
      }}
    />
  );
};

export default TextFieldComponent;
