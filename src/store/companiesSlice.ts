import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { companies as mockCompanies } from '../data/mockData';

interface Company {
  id: string;
  name: string;
  employeeCount: number;
  address: string;
}

interface CompaniesState {
  companies: Company[];
  selectedCompanyIds: string[];
  totalCompanies: number;
}

const initialState: CompaniesState = {
  companies: mockCompanies,
  selectedCompanyIds: [],
  totalCompanies: mockCompanies.length,
};

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    addCompany: (state, action: PayloadAction<Company>) => {
      state.companies.push(action.payload);
      state.totalCompanies += 1;
    },
    deleteCompanies: (state, action: PayloadAction<string[]>) => {
      state.companies = state.companies.filter(
        company => !action.payload.includes(company.id)
      );
      state.totalCompanies = state.companies.length;
    },
    selectCompany: (state, action: PayloadAction<string[]>) => {
      state.selectedCompanyIds = action.payload;
    },
    incrementEmployeeCount: (state, action: PayloadAction<string>) => {
      const company = state.companies.find(c => c.id === action.payload);
      if (company) {
        company.employeeCount += 1;
      }
    },
    decrementEmployeeCount: (state, action: PayloadAction<string>) => {
      const company = state.companies.find(c => c.id === action.payload);
      if (company && company.employeeCount > 0) {
        company.employeeCount -= 1;
      }
    },
  },
});

export const { addCompany, deleteCompanies, selectCompany, incrementEmployeeCount, decrementEmployeeCount } = companiesSlice.actions;

export default companiesSlice.reducer;
