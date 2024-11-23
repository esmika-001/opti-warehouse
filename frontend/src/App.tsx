import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { useRoutes } from 'react-router';
import './App.css';
import { useAppSelector } from './hooks';
import route from './router';
import { RootState } from './store/store';

function App() {

  const user = useAppSelector((state: RootState) => state.persistedReducer)
  const content = useRoutes(route(user.isLogedin));

  return (
    <>
      <SnackbarProvider>
        <CssBaseline>
          {content}
        </CssBaseline>
      </SnackbarProvider>

    </>
  );
}

export default App;
