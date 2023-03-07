import { Box } from '@chakra-ui/react';
import Contacts from '@pages/Contacts';
import Profile from '@pages/Profile';
import NavBar from 'components/NavBar/NavBar';
import DrawerComp from 'components/Contacts/drawer/Drawer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
    return (
        <Router>
            <NavBar>
                <Routes>
                    <Route path='/contacts' element={<Contacts />} />
                    <Route path='/profile' element={<Profile />} />
                </Routes>
            </NavBar>
        </Router>
    );
}

export default App;
