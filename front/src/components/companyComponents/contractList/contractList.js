import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import EstablishContract from '../establishContract/establishContract';

const ContractsList = () => {
  const [contracts, setContracts] = useState([]);
  const [companyId, setCompanyId] = useState(null);

  useEffect(() => {
    const fetchCompanyId = async () => {
      const userId = localStorage.getItem('userId');
      try {
        const response = await fetch(`http://localhost:1234/api/Company/getCompanyByUserId/${userId}`);
        const data = await response.json();
        setCompanyId(data.id);
      } catch (error) {
        console.error('Error fetching company ID:', error);
      }
    };

    fetchCompanyId();
  }, []);

  useEffect(() => {
    const fetchContracts = async () => {
      if (companyId) {
        try {
          const response = await fetch(`http://localhost:1234/api/contract/getAllContractsByCompanyId/${companyId}`);
          const contractsData = await response.json();
          
          const contractsWithProducerInfo = await Promise.all(contractsData.map(async (contract) => {
            const producerResponse = await fetch(`http://localhost:1234/api/user/getUserByProducerId/${contract.producerId}`);
            const producerData = await producerResponse.json();
            return {
              ...contract,
              producerName: producerData.name,
              producerEmail: producerData.email,
              producerPhoneNumber: producerData.phoneNumber,
            };
          }));

          setContracts(contractsWithProducerInfo);
        } catch (error) {
          console.error('Error fetching contracts:', error);
        }
      }
    };

    fetchContracts();
  }, [companyId]);

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        padding: 3,
        borderRadius: 2,
        boxShadow: 1,
        textAlign: 'center',
        width: 800,
        margin: 'auto',
        overflowY: 'auto',
        maxHeight: '20vh', 
      }}
    >
      <Typography variant="h5" gutterBottom>
        Contractele Companiei
      </Typography>
      <Box sx={{ marginTop: 2 }}>
        <EstablishContract></EstablishContract>
      </Box>
      <List>
        {contracts.map((contract, index) => (
          <React.Fragment key={contract.id}>
            <ListItem>
              <ListItemText
                primary={`Producător: ${contract.producerName}`}
                secondary={`Email: ${contract.producerEmail} | Telefon: ${contract.producerPhoneNumber} | Data Creării: ${new Date(contract.createdAt).toLocaleDateString()}`}
              />
            </ListItem>
            {index < contracts.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default ContractsList;
