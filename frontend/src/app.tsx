import React from 'react';
import './App.css';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SkillsView } from './views/skills';
import { Header } from './components';
import { Toaster } from './components/ui/toaster';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [
      { index: true, element: <SkillsView /> },
      { path: 'skills', element: <SkillsView /> },
    ],
  },
]);

const App = () => (
  <ChakraProvider value={defaultSystem}>
    <Toaster />
    <RouterProvider router={router} />
  </ChakraProvider>
);

export default App;
