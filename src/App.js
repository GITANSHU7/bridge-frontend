import "./App.css";
import { ThemeProviderWrapper } from "./ThemeContext";
import CryptoList from "./components/CryptoList";
import Header from "./components/Header";

function App() {
  return (
    <>
      <ThemeProviderWrapper>
        <div className="App">
          <Header />
          <CryptoList />
        </div>
      </ThemeProviderWrapper>
    </>
  );
}

export default App;
