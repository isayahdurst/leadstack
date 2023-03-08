import { 
	Modal, 
	ModalOverlay, 
	ModalContent, 
	ModalHeader, 
	ModalCloseButton, 
	ModalBody, 
	ModalFooter,
	FormLabel,
	Input, 
	Select,
	Button } from "@chakra-ui/react";
import { useState } from "react";
import { useMutation } from '@apollo/client';
import { UPDATE_CLIENT } from '../../utils/mutations';

const ClientDetails = ({ client, onClose }) => {
	const [formState, setFormState] = useState({
		firstName: client.first_name,
		lastName: client.last_name,
		phoneNumber: client.phone_number,
		email: client.email,
		status: client.status,
	});
  const [updateClient] = useMutation(UPDATE_CLIENT);

  const handleSubmit = async (event) => {
	  event.preventDefault();
	  try {
	  	  await updateClient({
		  	  variables: {
				  clientId: client._id,
				  firstName: formState.firstName,
				  lastName: formState.lastName,
				  phoneNumber: formState.phoneNumber,
				  email: formState.email,
				  status: formState.status,
			  },
		 });
		 window.location.reload();
	  	 onClose();
	  } catch (error) {
	    	console.error(error);
	  }
  };

  const handleChange = (event) => {
      const { name, value } = event.target;
	      setFormState({
	          ...formState,
	          [name]: value,
	      });
  };

	return (
		<Modal isOpen={true} onClose={onClose} size="xl">
	  		<ModalOverlay />
	  		<ModalContent>
				<ModalHeader mt={4}>Edit Client Details</ModalHeader>
				<ModalCloseButton />
				<form onSubmit={handleSubmit}>
		  			<ModalBody>
					  <FormLabel>First Name</FormLabel>
						<Input
							type="text"
							name="firstName"
							value={formState.firstName}
							onChange={handleChange}
						/>
						<br />
						<FormLabel mt={4}>Last Name</FormLabel>
						<Input
							type="text"
							name="lastName"
							value={formState.lastName}
							onChange={handleChange}
			 			 />
						<br />
						<FormLabel mt={4}>Phone Number</FormLabel>
						<Input
							type="text"
							name="phoneNumber"
							value={formState.phoneNumber}
							onChange={handleChange}
						/>
						<br />
						<FormLabel mt={4}>Email</FormLabel>
						<Input
							type="email"
							name="email"
							value={formState.email}
							onChange={handleChange}
						/>
						<br />
 
						<br />
						<FormLabel>Status</FormLabel>
						<Select 
							name="status"
							value={formState.status}
							onChange={handleChange}
							placeholder='Select option'>
							<option>Active</option>
							<option>Inactive</option>
						</Select>
					</ModalBody>
					<ModalFooter justifyContent={"left"} mb={4}>
						<Button type="submit" colorScheme="blue" mr={3}>
							Save
						</Button>
						<Button onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
  	);
};

export default ClientDetails;
