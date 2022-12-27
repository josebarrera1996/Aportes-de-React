// Componentes
import UserList from './components/UserList';
import Profile from './components/Profile';
// Contexto de React
import UserState from './context/User/UserState';
// CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Componente funcional (principal)
function App() {

  return (

    <UserState>
      {/* Los componentes a continuación podrán acceder al estado definido en 'UserState' */}
      <div className="container p-4">
        <div className="row">
          <div className="col-md-7">
            <UserList />
          </div>
          <div className="col-md-5">
            <Profile />
          </div>
        </div>
      </div>
    </UserState>
  );
}

export default App;
