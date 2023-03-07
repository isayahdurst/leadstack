import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    useDisclosure,
} from '@chakra-ui/react';

import { useState, useEffect } from 'react';

import EmailTutorialModal from './emailSetupModal/EmailTutorialModal';

// TODO: Pull accounts from database and map them to the menu.

const EmailIntegrationMenu = () => {
    const [account, setAccount] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();

    const emailAccountHandler = function (e) {
        const chosenAccount = e.target.innerHTML;

        if (chosenAccount === 'Add Account') {
            console.log('Add Account');
            onOpen();
        }

        if (chosenAccount === 'Google') {
            setAccount(chosenAccount);
        }
    };

    return (
        <>
            <Menu>
                <MenuButton as={Button} colorScheme={'red'} variant={'outline'}>
                    {!account && 'Select Account'}
                    {account && account}
                </MenuButton>
                <MenuList>
                    {['Google', 'Outlook (coming soon)', 'Add Account'].map(
                        (account) => {
                            return (
                                <MenuItem
                                    onClick={(e) => emailAccountHandler(e)}
                                    key={account}
                                    isDisabled={
                                        account !== 'Google' &&
                                        account !== 'Add Account'
                                    }>
                                    {account}
                                </MenuItem>
                            );
                        }
                    )}
                </MenuList>
            </Menu>
            <EmailTutorialModal
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
            />
        </>
    );
};

export default EmailIntegrationMenu;
