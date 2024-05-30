"use client"
import { Snackbar, Alert } from '@mui/material';
import { useAlert } from './AlertContext';

const GlobalAlert: React.FC = () => {
  const { alert, hideAlert } = useAlert()

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={6000}
      onClose={hideAlert}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={hideAlert} severity={alert.severity} sx={{ width: '100%' }}>
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalAlert;
