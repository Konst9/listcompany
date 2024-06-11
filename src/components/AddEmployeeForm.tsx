import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { addEmployeeWithCount } from '../store/employeesSlice';
import InputField from "../ui/inputField";

const AddEmployeeForm: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [position, setPosition] = useState('');
  const selectedCompanyIds = useAppSelector((state) => state.companies.selectedCompanyIds);
  const dispatch = useAppDispatch();

  if (selectedCompanyIds.length === 0) {
    return <p>Выберите компанию, чтобы добавить сотрудника.</p>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addEmployeeWithCount({ id: Date.now().toString(), companyId: selectedCompanyIds[0], firstName, lastName, position }));
    setFirstName('');
    setLastName('');
    setPosition('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{display: "flex", gap: "8px"}}>
        <InputField
          value={firstName}
          onChange={setFirstName}
          placeholder="Имя"
        />
        <InputField
          value={lastName}
          onChange={setLastName}
          placeholder="Фамилия"
        />
      </div>
      <InputField
        value={position}
        onChange={setPosition}
        placeholder="Должность"
      />
      <button type="submit">Добавить сотрудника</button>
    </form>
  );
};

export default AddEmployeeForm;
