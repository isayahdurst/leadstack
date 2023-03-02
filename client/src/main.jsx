import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './theme/theme';
import './index.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <ChakraProvider theme={theme}>
                <App />
            </ChakraProvider>
        </ApolloProvider>
    </React.StrictMode>
);
