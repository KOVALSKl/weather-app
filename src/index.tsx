import ReactDOM from 'react-dom/client';
import './index.scss';
import AppRouter from './components/AppRouter/AppRouter';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AppRouter />
);