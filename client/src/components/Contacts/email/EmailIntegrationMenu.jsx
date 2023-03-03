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
} from '@chakra-ui/react';

import { useState, useEffect } from 'react';

// TODO: Pull accounts from database and map them to the menu.

const EmailIntegrationMenu = () => {
    const [account, setAccount] = useState('');
    useEffect(() => {
        console.log(account);
    }, [account]);
    return (
        <Menu>
            <MenuButton as={Button} colorScheme={'red'} variant={'outline'}>
                {!account && 'Select Account'}
                {account && account}
            </MenuButton>
            <MenuList>
                {['Google', 'Outlook', 'Yahoo'].map((account) => {
                    return (
                        <MenuItem
                            onClick={() => setAccount(account)}
                            key={account}
                            isDisabled={account !== 'Google'}>
                            {account}
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
};

export default EmailIntegrationMenu;
