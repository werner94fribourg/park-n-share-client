import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const Cookies = () => {
  const [open, setOpen] = useState(false);

  const handleAccept = () => {
    // Logique pour accepter les cookies ici
    setOpen(false);
  };

  const handleReject = () => {
    // Logique pour rejeter les cookies ici
    setOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle variant='h4'>Gestion des cookies</DialogTitle>
        <DialogContent>
          <DialogContentText variant='h4'>
            Ce site utilise des cookies pour améliorer votre expérience en personnalisant le contenu et les publicités, en fournissant des fonctionnalités de médias sociaux et en analysant notre trafic. Acceptez-vous l'utilisation de cookies ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReject} color="secondary" variant="contained" size="large">
            Reject
          </Button>
          <Button onClick={handleAccept} color="primary" variant="contained" size="large">
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Cookies;
