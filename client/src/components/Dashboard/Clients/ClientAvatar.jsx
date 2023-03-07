import React from 'react';
import Avatar from 'react-avatar';

const ClientAvatar = ({ clients }) => {
    const MAX_CLIENTS = 5;

    if (!clients.length) {
        return <h3>No Clients Yet</h3>;
    }

    const remainingClientsCount = clients.length - MAX_CLIENTS;

    // Avatar colors
    const colors = ['#173F5F', '#20639B', '#3CAEA3', '#F6D55C', '#ED553B'];

    const getColorIndex = (name) => {
        const charCodeSum = name
            .split('')
            .map((char) => char.charCodeAt())
            .reduce((sum, code) => sum + code, 0);
        return charCodeSum % colors.length;
    };

    return (
        <div>
            <div style={{ display: 'flex' }}>
                {clients.slice(0, MAX_CLIENTS).map((client) => (
                    <div key={client._id} style={{ marginRight: '4px' }}>
                        <Avatar
                            name={`${client.first_name} ${client.last_name}`}
                            size='50'
                            round={true}
                            color={
                                colors[
                                    getColorIndex(
                                        `${client.first_name} ${client.last_name}`
                                    )
                                ]
                            }
                            style={{ marginRight: '0' }}
                        />
                    </div>
                ))}
                {remainingClientsCount > 0 && (
                    <div
                        style={{
                            marginLeft: '3px',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '24px',
                            background: '#344E5C',
                            borderRadius: '50%',
                            color: '#FFF',
                        }}>
                        <span
                            style={{
                                paddingTop: '11px',
                                width: '50px',
                                fontSize: '20px',
                                fontWeight: '400',
                                height: '50px',
                                lineHeight: 'initial',
                                textAlign: 'center',
                            }}>
                            +{remainingClientsCount}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientAvatar;
