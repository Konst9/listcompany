import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import CompanyTable from './components/CompanyTable';
import EmployeeTable from './components/EmployeeTable';
import AddCompanyForm from './components/AddCompanyForm';
import AddEmployeeForm from './components/AddEmployeeForm';
import Header from './components/Header';
import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <AddCompanyForm />
            <CompanyTable />
          </div>
          <div>
            <AddEmployeeForm />
            <EmployeeTable />
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default App;
