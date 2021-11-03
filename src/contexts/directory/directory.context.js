import { createContext } from 'react';
import initial_state from './directory.data';

const DirectoryContext = createContext(initial_state.sections);

export default DirectoryContext;
