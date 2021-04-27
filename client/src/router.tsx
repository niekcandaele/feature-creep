import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages';

export const Router: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Home />} path="/" />
    </Routes>
  </BrowserRouter>
);
