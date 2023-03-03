import ClientCard from './ClientCard';
import { CLIENTS } from './../../../utils/queries';
import { useQuery } from '@apollo/client';

const Clients = () => {
    const clientsData = useQuery(CLIENTS).data?.clients;
    console.log(`clientsData`);
    console.log(clientsData);

    if (!clientsData?.length) {
        return <p>No Clients</p>;
    }

    return (
        <>
            {clientsData &&
                clientsData.map((contact) => (
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
