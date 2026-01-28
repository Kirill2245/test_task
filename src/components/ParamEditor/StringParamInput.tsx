import React from 'react';
import type { ParamInputProps } from '../../types';

export const StringParamInput: React.FC<ParamInputProps> = ({ 
  param, 
  value, 
  onChange 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(param.id, e.target.value);
  };

  return (
    <div className="param-input" data-testid={`param-input-${param.id}`}>
      <label 
        htmlFor={`param-${param.id}`} 
        className="param-input__label"
      >
        {param.name}
      </label>
      <input
        id={`param-${param.id}`}
        type="text"
        value={value}
        onChange={handleChange}
        className="param-input__field"
        data-testid={`param-field-${param.id}`}
      />
    </div>
  );
};