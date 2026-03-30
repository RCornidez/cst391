import { RouterProvider } from 'react-router-dom';
import router from './Routes';
import { SnackbarProvider } from './services/Snackbar';
import { ConfirmModalProvider } from './components/ConfirmModal';

function App() {
  return (
    <SnackbarProvider>
      <ConfirmModalProvider>
        <RouterProvider router={router} />
      </ConfirmModalProvider>
    </SnackbarProvider>
  );
}

export default App
