import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Используем вместо обычного `useDispatch`
export const useAppDispatch: () => AppDispatch = useDispatch;

// Используем вместо обычного `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
