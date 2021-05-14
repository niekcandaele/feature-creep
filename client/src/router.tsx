import { AuthenticatedRoute } from 'components';
import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {
  CreateSession,
  CreateSquad,
  Frame,
  Home,
  JoinSquad,
  OnBoarding,
  PageNotFound,
  Redirect,
  Session,
  ViewSquad,
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

        <Route element={<CreateSession />} path="/session/create/:squadId" />
        <Route element={<Session />} path="/session/:sessionId/:squadId" />
      </AuthenticatedRoute>

      {/* Should remain the last route, since it matches with every path */}
      <Route element={<PageNotFound />} path="*" />
    </Routes>
  </BrowserRouter>
);
