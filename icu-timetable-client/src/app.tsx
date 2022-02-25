import { AuthProvider } from 'contexts/authContext';
import { PreferenceProvider } from 'contexts/preferenceContext';
import Router from 'navigation/router';

export default function App() {
  return (
    <AuthProvider>
      <PreferenceProvider>
        <Router />
      </PreferenceProvider>
    </AuthProvider>
  );
}
