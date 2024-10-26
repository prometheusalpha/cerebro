import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import InputScreen from './screens/InputScreen';
import KanbanScreen from './screens/KanbanScreen';
import ParaScreen from './screens/ParaScreen';
import SearchScreen from './screens/SearchScreen';
import CommandScreen from './screens/CommandScreen';
import { useThemeStore } from './store/useThemeStore';

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<InputScreen />} />
          <Route path="kanban" element={<KanbanScreen />} />
          <Route path="para" element={<ParaScreen />} />
          <Route path="search" element={<SearchScreen />} />
          <Route path="command" element={<CommandScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;