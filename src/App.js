import './App.css';
import GridApp from './pages/GridApp';
import data from './data.json'

function App() {
  let columns = ['name', 'country', 'currency', 'number', 'phone', 'email']
  return (
    <div className="App">
      <GridApp
        isAlternating={true}
        isHeaderEnabled={true}
        columns={columns}
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
