import ClientCard from './ClientCard';
import { CLIENTS } from './../../../utils/queries';
import { useQuery } from '@apollo/client';

const Clients = ({ selectedClientId, handleClientClick }) => {
    const clientsData = useQuery(CLIENTS);

    if (!clientsData.data) {
        return <p>No Clients</p>;
    }

    return (
        <>
            {clientsData &&
                clientsData.data.clients.map((contact, index) => (
                    <ClientCard
                        key={`$contact.id_${index}`}
                        name={`${contact.first_name} ${contact.last_name}`}
                        phone={contact.phone_number}
                        email={contact.email}
                        onClick={() => handleClientClick(contact._id, contact)}
                        selected={selectedClientId === contact._id}
                    />
                ))}
        </>
    );
};

export default Clients;
