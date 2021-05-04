import { AuthenticatedRoute } from 'components';
import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Home,
  Redirect,
  Frame,
  PageNotFound,
  OnBoarding,
  ViewSquad, CreateSquad, JoinSquad,
  Workspace,
} from './pages';

export const Router: FC = () => (
  <BrowserRouter>
    <Routes>
      {/* Make sure that non authenticated routes are above /workspace */}
      <Route element={<Home />} path="/" />
      <Route element={<Redirect />} path="/redirect" />
      <Route element={<OnBoarding />} path="/onboarding" />

      <AuthenticatedRoute element={<Frame />} path="/">
        <Route element={<Workspace />} path="/workspace" />
        <Route element={<CreateSquad />} path="/squad/create" />
        <Route element={<JoinSquad />} path="/squad/join/:id" />
        <Route element={<ViewSquad />} path="/squad/:id" />
      </AuthenticatedRoute>

      {/* Should remain the last route, since it matches with every path */}
      <Route element={<PageNotFound />} path="*" />
    </Routes>
  </BrowserRouter>
);
