import { AuthenticatedRoute } from 'components';
import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Workspace, Redirect, Frame, PageNotFound } from './pages';

export const Router: FC = () => (
  <BrowserRouter>
    <Routes>
      {/* Make sure that non authenticated routes are above /workspace */}
      <Route element={<Home />} path="/" />
      <Route element={<Redirect />} path="/redirect" />

      <AuthenticatedRoute element={<Frame />} path="/">
        <Route element={<Workspace />} path="/workspace" />
      </AuthenticatedRoute>

      {/* Should remain the last route, since it matches with every path */}
      <Route element={<PageNotFound />} path="*" />
    </Routes>
  </BrowserRouter>
);
