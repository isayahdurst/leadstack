import ClientCard from './ClientCard';
import { CLIENTS } from './../../../utils/queries';
import { useQuery } from '@apollo/client';

const Clients = () => {
    const clientsData = useQuery(CLIENTS);

    if (!clientsData.data) {
        return <p>No Clients</p>;
    }

    return (
        <>
            {clientsData &&
                clientsData.data.clients.map((contact) => (
                    <ClientCard
                        key={contact.id}
                        name={`${contact.first_name} ${contact.last_name}`}
                        phone={contact.phone_number}
                        email={contact.email}
                    />
                ))}
        </>
    );
};

export default Clients;
