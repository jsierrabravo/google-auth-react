import './App.css';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

function App() {

  const [user, setUser] = useState({});

  function handleCallbackResponse(response){
    console.log(`Encoded JWT ID token: ${response.credential}`);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById('signInDiv').hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById('signInDiv').hidden = false;
  }

  useEffect(() => {

    /* global google */
    google.accounts.id.initialize({
      client_id: "1081869599212-ao288vqt23a1v9ql9gop6a58f8jh18jg.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { 
        theme: 'outline', 
        size: 'large' 
      }
    )

    google.accounts.id.prompt();

  }, [])

  return (
    <div className="App">
      <div id='signInDiv'></div>
      { Object.keys(user).length != 0 && 
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      }

      { user &&
        <div>
          <img src={user.picture} />
          <h3>{user.name}</h3>
        </div>
      }
    </div>
  );
}

export default App;
