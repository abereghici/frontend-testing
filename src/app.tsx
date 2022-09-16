import {BrowserRouter} from 'react-router-dom';
import styles from './app.module.css';
import {Main} from './components/Main';

export default function App() {
  return (
    <div className={styles.container}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </div>
  );
}
