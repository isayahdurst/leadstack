import { Box } from '@chakra-ui/react';
import Contacts from '@pages/Contacts';
import NavBar from 'components/NavBar/NavBar';
import DrawerComp from 'components/Contacts/drawer/Drawer'
import './App.css';

function App() {
    return (
        <NavBar>
            <Contacts />
        </NavBar>
    );
}

export default App;
