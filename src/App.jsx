import './App.css';
import GPACalculator from './MyGpaCal';

const globalStyles = {
  '@global': {
    '*': {
      boxSizing: 'border-box',
    },
    body: {
      margin: 0,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      lineHeight: 1.5,
      backgroundColor: '#f5f5f5',
    },
    '#root': {
      minHeight: '100vh',
    },
  },
};

function App() {

  return (
    <>
      <div>
        <GPACalculator />
      </div>
      <footer>Made with ❤ by 🦄 Uniqode </footer>
    </>
  )
}

export default App
