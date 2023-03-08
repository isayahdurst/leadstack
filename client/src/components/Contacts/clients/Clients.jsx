import ClientCard from './ClientCard';
import { CLIENTS_BY_SALESPERSON } from '@utils/queries';
import Auth from '@utils/auth';
import { useQuery } from '@apollo/client';

const Clients = ({ selectedClientId, handleClientClick }) => {
    const profileId = Auth.getProfile().data._id;
    const { loading, error, data } = useQuery(CLIENTS_BY_SALESPERSON, {
        variables: {
            salespersonId: profileId,
        },
    });
    if (loading) return <p>Loading...</p>;
    if (error) {
        console.log(error.message);
        return <p>Error :(</p>;
    }
    
    const clientsData = [...data.clientsBySalesperson];
    if (!data.clientsBySalesperson.length) {
        return <p>No Clients</p>;
    } else {
        return (
            <>
                {clientsData.map((contact, index) => (
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
    }
};

export default Clients;
