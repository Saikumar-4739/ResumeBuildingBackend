// src/routes/Routes.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AddUserForm } from './components/AddUserForm';
import { AddExperienceForm } from './components/Experience';
import { AddAcademicsForm } from './components/Academics';
import {AddSkillForm} from './components/Skills';
import { PersonalDetailsPage } from './components/PersonalDetails';
import  AppLayout  from './components/layout';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="user-form" element={<AddUserForm />} />
          <Route path="experience" element={<AddExperienceForm />} />
          <Route path="academics" element={<AddAcademicsForm />} />
          <Route path="skills" element={<AddSkillForm />} />
          <Route path="personal-details" element={<PersonalDetailsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
