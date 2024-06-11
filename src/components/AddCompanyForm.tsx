import React, { useState } from 'react';
import { useAppDispatch } from '../hooks';
import { addCompany } from '../store/companiesSlice';
import InputField from '../ui/inputField';

const AddCompanyForm: React.FC = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addCompany({ id: Date.now().toString(), name, employeeCount: 0, address }));
    setName('');
    setAddress('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        placeholder="Название компании"
        value={name}
        onChange={setName}
      />
      <InputField
        placeholder="Адрес"
        value={address}
        onChange={setAddress}
      />
      <button type="submit">Добавить компанию</button>
    </form>
  );
};

export default AddCompanyForm;
