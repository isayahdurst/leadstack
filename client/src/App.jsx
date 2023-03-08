import { Box } from '@chakra-ui/react';
import Contacts from '@pages/Contacts';
import Profile from '@pages/Profile';
import NavBar from 'components/NavBar/NavBar';
import Dashboard from '@pages/Dashboard';
import Clients from '@pages/Clients';
import Landing from '@pages/Landing';
import Footer from 'components/Footer/Footer';

import DrawerComp from 'components/Contacts/drawer/Drawer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
    return (
        <Router>
            <NavBar>
                <Routes>
                    <Route path='/contacts' element={<Clients />} />
                    <Route path='/conversations' element={<Contacts />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/' element={<Landing />} />

                </Routes>
            </NavBar>
        </Router>
        
    );
}

export default App;
