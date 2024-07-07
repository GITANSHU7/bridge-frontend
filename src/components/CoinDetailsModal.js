// CoinDetailsModal.js
import { Avatar, Box, Modal, Typography, IconButton } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

const CoinDetailsModal = ({ open, handleClose, coin }) => {
  if (!coin) return null;

  const firstFullStopIndex = coin?.description?.en.indexOf('.');
  const trimmedDescription = coin?.description?.en.slice(0, firstFullStopIndex + 1);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: 400, 
        bgcolor: 'background.paper', 
        borderRadius: 4,
        boxShadow: 24, 
        p: 4,
        outline: 'none',
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={handleClose} sx={{ fontSize: "bolder" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Avatar
            src={coin?.image?.small}
            alt={coin?.name}
            sx={{ width: 80, height: 80 }}
          />
        </Box>
        <Typography id="modal-modal-title" variant="h5"  color="textPrimary" component="h2" textAlign="center" fontWeight="bold">
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={2}>
          ({coin?.symbol.toUpperCase()})
        </Typography>
        <Typography variant="body1" mb={1}  color="textPrimary" sx={{fontWeight: "bolder" }} >
          <strong>Market Rank:</strong> {coin?.market_cap_rank || 'N/A'}
        </Typography>
        <Typography variant="body1" mb={1}  color="textPrimary">
          <strong>Current Price:</strong> ${coin?.market_data?.current_price?.usd || 'N/A'}
        </Typography>
        <Typography variant="body1" mb={1}  color="textPrimary">
          <strong>Description:</strong> {trimmedDescription}
        </Typography>
      </Box>
    </Modal>
  );
};

export default CoinDetailsModal;
