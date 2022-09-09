
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();
 
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [])
  
  const handelAddUser =(e)=> {
   
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newUser = { name: name, email: email }
    
    //send data to the server
    fetch('http://localhost:5000/users', {
      method: 'post',
      headers: {
        'content-type':'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const addeduser = data;
        const newUsers = [...users, addeduser];
        setUsers(newUsers);
    })
    nameRef.current.value = '';
    emailRef.current.value = '';
     e.preventDefault();
  }




  return (
    <div className="App">
      <dir>found users: {users.length}</dir>
      <form onSubmit={handelAddUser}>
        <input type="text" ref={nameRef} placeholder='name' />
        <input type="email" ref={emailRef} placeholder='emailAddress' />
        <input type="submit" value='submit' />
</form>

      <ul>
        {
          users.map(user => <li key={user.id}>
            {user.id}. {user.name} {user.email}
          </li>)
        }
     </ul>
    </div>
  );
}

export default App;
