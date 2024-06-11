import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { selectCompany, deleteCompanies } from '../store/companiesSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const CompanyTable: React.FC = () => {
  const totalCompanies = useSelector((state: RootState) => state.companies.totalCompanies);
  const totalEmployees = useSelector((state: RootState) => state.employees.totalEmployees);
  const companies = useAppSelector((state) => state.companies.companies);
  const dispatch = useAppDispatch();
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allCompanyIds = companies.map(company => company.id);
      setSelectedCompanies(allCompanyIds);
      dispatch(selectCompany(allCompanyIds));
    } else {
      setSelectedCompanies([]);
      dispatch(selectCompany([]));
    }
  };

  const handleDelete = () => {
    dispatch(deleteCompanies(selectedCompanies));
    setSelectedCompanies([]);
    dispatch(selectCompany([]));
  };

  const handleCheckboxChange = (companyId: string) => {
    let newSelectedCompanies;
    if (selectedCompanies.includes(companyId)) {
      newSelectedCompanies = selectedCompanies.filter(id => id !== companyId);
    } else {
      newSelectedCompanies = [...selectedCompanies, companyId];
    }
    setSelectedCompanies(newSelectedCompanies);
    dispatch(selectCompany(newSelectedCompanies));
  };

  return (
    <div>
      <table className="table">
        <thead>
        <tr>
          <th className="table_header"><input type="checkbox" checked={selectAll} onChange={handleSelectAll}/></th>
          <th className="table_header">Название компании</th>
          <th className="table_header">Кол-во сотрудников</th>
          <th className="table_header">Адрес</th>
        </tr>
        </thead>
        <tbody>
        {companies.map(company => (
          <tr
            key={company.id}
            className={selectedCompanies.includes(company.id) ? 'selected' : ''}
          >
            <td className="table_data">
              <input
                type="checkbox"
                checked={selectedCompanies.includes(company.id)}
                onChange={() => handleCheckboxChange(company.id)}
              />
            </td>
            <td className="table_data">{company.name}</td>
            <td className="table_data">{company.employeeCount}</td>
            <td className="table_data">{company.address}</td>
          </tr>
        ))}
        </tbody>
      </table>
      <button className='delete_btn' onClick={handleDelete}>Удалить выбранные компании</button>
      <div className='total_wrapper'>
        <span>Общее количество компаний: {totalCompanies}</span>
        <span>Общее количество сотрудников: {totalEmployees}</span>
      </div>
    </div>
  );
};

export default CompanyTable;
