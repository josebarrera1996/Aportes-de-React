import { useContext, useEffect } from "react";
import UserContext from "../context/User/UserContext";

// Componente funcional
// Mostrará un listado con usuario
const UserList = () => {

  // Utilizando 'useContext' para acceder al contexto
  const userContext = useContext(UserContext);

  // Utilizando 'useEffect' para obtener los datos de la API
  useEffect(() => {

    // Accediendo a 'getUsers' del contexto
    userContext.getUsers();
  }, []);

  return (

    <div className="list-group h-100">
      {/* Si hay usuarios... */}
      {userContext.users.length
        ? userContext.users.map((user) => (
          <a
            key={user.id}
            href="#!"
            onClick={() => userContext.getProfile(user.id)}
            className="list-group-item list-group-item-action d-flex flex-row justify-content-start"
          >
            <img src={user.avatar} alt="" className="img-fluid mr-4 rounded-circle" width="70" />
            <p>{user.first_name + " " + user.last_name}</p>
          </a>
        ))
        : null}
    </div>
  )
}

export default UserList;