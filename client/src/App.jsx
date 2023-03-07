import { Box } from '@chakra-ui/react';
import Contacts from '@pages/Contacts';
import Profile from '@pages/Profile';
import NavBar from 'components/NavBar/NavBar';
import DrawerComp from 'components/Contacts/drawer/Drawer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Profile from './pages/Profile';

function App() {
    return (
        <Router>
            <NavBar>
                <Routes>
                    <Route path='/' element={<Contacts />} />
                    <Route path='/profile' element={<Profile />} />
                </Routes>
            </NavBar>
        </Router>
    );
}

export default App;
