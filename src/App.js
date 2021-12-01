import GridApp from './pages/GridApp';
import data from './data.json'
import './App.css';

function App() {
  return (
    <div className="App">
      <GridApp
        isAlternating={false}
        isHeaderEnabled={true}
        rows={data}
        rowsPerPage={5}
        // style={{
        //   primaryColor: 'red',
        //   secondaryColor: 'pink'
        // }}
      />
    </div >
  );
}

export default App;
