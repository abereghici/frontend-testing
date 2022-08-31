import ReactDOMServer from 'react-dom/server';
import App from './app';

test('renders', () => {
  ReactDOMServer.renderToString(<App />);
});
