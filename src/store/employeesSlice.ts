import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { employees as mockEmployees } from '../data/mockData';

interface Employee {
  id: string;
  companyId: string;
  firstName: string;
  lastName: string;
  position: string;
}

interface EmployeesState {
  employees: Employee[];
  totalEmployees: number;
}

const initialState: EmployeesState = {
  employees: mockEmployees,
  totalEmployees: mockEmployees.length,
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployeeWithCount: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload);
      state.totalEmployees += 1;
    },
    deleteEmployeesWithCount: (state, action: PayloadAction<string[]>) => {
      state.employees = state.employees.filter(
        employee => !action.payload.includes(employee.id)
      );
      state.totalEmployees = state.employees.length;
    },
  },
});

export const { addEmployeeWithCount, deleteEmployeesWithCount } = employeesSlice.actions;

export default employeesSlice.reducer;
