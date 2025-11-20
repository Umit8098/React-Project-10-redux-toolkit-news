import './App.css';
// import News from './pages/News';
// import Navbar from './components/Navbar';
import AppRouter from './router/AppRouter';
import { Provider } from 'react-redux';
import store from './app/store';

function App() {
  return (
    <div className="App">
      {/* <Navbar/> */}
      {/* <News/> */}
      
      <Provider store={store} >
        <AppRouter/>
      </Provider>

    </div>
  );
}

export default App;
