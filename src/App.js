import Grid from './pages/Grid';
import data from './data.json'
import './App.css';

const App = () => (
  <div className="App">
    <Grid
      isAlternating
      isHeaderEnabled={true}
      rows={data}
      rowsPerPage={5}
    />
  </div>
)

export default App;
