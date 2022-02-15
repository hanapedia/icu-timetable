import { AuthProvider } from 'contexts/authContext';
import Router from 'navigation/router';

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
