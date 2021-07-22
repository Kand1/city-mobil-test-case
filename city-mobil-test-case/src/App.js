import './App.css';
import {Content} from "./Components/Content";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
            header
        </div>
      </header>
      <aside className="App-sidebar">
        <div>
            sidebar
        </div>
      </aside>
      <Content/>
      <footer className="App-footer">
        <div>
            footer
        </div>
      </footer>
    </div>
  );
}

export default App;
