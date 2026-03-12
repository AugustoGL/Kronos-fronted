import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import SubjectPage from './pages/Subject/Subjects';
import StaffPage from './pages/Staff/Staff';
import SchoolSettingsPage from './pages/SchoolSettings/SchoolSettings';
import MyHours from './pages/MyHours/myHours';
import Profile from './pages/Profile/Profile';
import SchoolCalendar from './pages/SchoolCalendar/SchoolCalendar';

import Login from './pages/Login/Login';
import Register from './pages/Login/Register';

import './App.css'

import '@mantine/core/styles.css';
// ‼️ import dates styles after core package styles
import '@mantine/dates/styles.css';

import LayoutNavbar from './pages/LayoutNavbar';
import LayoutSimple from './pages/LayoutSimple';

import { MantineProvider } from '@mantine/core';

function App() {

  return (
    <MantineProvider forceColorScheme="dark">
        <Router>
          <Routes>


            <Route path="/profile" element={
              <LayoutNavbar>
                <Profile />
              </LayoutNavbar>
            } />


            <Route path="/" element={
              <LayoutSimple>
                <Login />
              </LayoutSimple>
            } />

            <Route path="/register" element={
              <LayoutSimple>
                <Register />
              </LayoutSimple>
            } />

            <Route
              path="/subject"
              element={
                <LayoutNavbar>
                  <SubjectPage />
                </LayoutNavbar>
              }
            />

            <Route
              path="/staff"
              element={
                <LayoutNavbar>
                  <StaffPage />
                </LayoutNavbar>
              }
            />

            <Route
              path="/schoolsettings"
              element={
                <LayoutNavbar>
                  <SchoolSettingsPage />
                </LayoutNavbar>
              }
            />

            <Route
              path="/myhours"
              element={
                <LayoutNavbar>
                  <MyHours />
                </LayoutNavbar>
              }
            />
            <Route
              path="/calendar"
              element={
                <LayoutNavbar>
                  <SchoolCalendar />
                </LayoutNavbar>
              }
            />
          </Routes>
        </Router>
    </MantineProvider>
  )
}

export default App
