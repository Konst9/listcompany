import React from 'react';

interface InputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const InputField: React.FC<InputProps> = ({ placeholder, value, onChange }) => {
  return (
    <input
      type="text"
      className="form_input"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default InputField;
