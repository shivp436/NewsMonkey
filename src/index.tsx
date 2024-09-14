import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root')!);
// "!"" at the end of document.getElementById('app')! is a non-null assertion operator
// it tells TypeScript that the value is not null or undefined

root.render(<App />);
