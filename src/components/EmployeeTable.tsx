import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { deleteEmployeesWithCount } from '../store/employeesSlice';

const EmployeeTable: React.FC = () => {
  const selectedCompanyIds = useAppSelector((state) => state.companies.selectedCompanyIds);
  const employees = useAppSelector((state) =>
    state.employees.employees.filter((employee) => selectedCompanyIds.includes(employee.companyId))
  );
  const dispatch = useAppDispatch();
  const [selectAll, setSelectAll] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allEmployeeIds = employees.map(employee => employee.id);
      setSelectedEmployees(allEmployeeIds);
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleDelete = () => {
    dispatch(deleteEmployeesWithCount(selectedEmployees));
    setSelectedEmployees([]);
  };

  const handleCheckboxChange = (employeeId: string) => {
    if (selectedEmployees.includes(employeeId)) {
      setSelectedEmployees(selectedEmployees.filter(id => id !== employeeId));
    } else {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    }
  };

  if (selectedCompanyIds.length === 0) {
    return null;
  }

  return (
    <div>
      <table className="table">
        <thead>
        <tr>
          <th className="table_header"><input type="checkbox" checked={selectAll} onChange={handleSelectAll}/></th>
          <th className="table_header">Фамилия</th>
          <th className="table_header">Имя</th>
          <th className="table_header">Должность</th>
        </tr>
        </thead>
        <tbody>
        {employees.map(employee => (
          <tr
            key={employee.id}
            className={selectedEmployees.includes(employee.id) ? 'selected' : ''}
          >
            <td className="table_data">
              <input
                type="checkbox"
                checked={selectedEmployees.includes(employee.id)}
                onChange={() => handleCheckboxChange(employee.id)}
              />
            </td>
            <td className="table_data">{employee.lastName}</td>
            <td className="table_data">{employee.firstName}</td>
            <td className="table_data">{employee.position}</td>
          </tr>
        ))}
        </tbody>
      </table>
      <button className='delete_btn' onClick={handleDelete}>Удалить выбранных сотрудников</button>
    </div>
  );
};

export default EmployeeTable;
