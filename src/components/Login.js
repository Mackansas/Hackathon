import Plinko from "./Plinko";
import React from "react";
import '../Login.css'
import Curtain from "./Curtain";

function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isUsernameFocused, setIsUsernameFocused] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem("user"));

  function login(e) {
    e.preventDefault();
    if (username.length < 5 || password.length < 5) {
        return;
    }
    localStorage.setItem("user", JSON.stringify({username: username, password: password}));
    setIsLoggedIn(true);
    return false;
  }

  function logout() {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  }

  return (
    isLoggedIn ?
    <div className="logout">
        <h2>Signed in as: {JSON.parse(localStorage?.getItem("user") || {})?.username}</h2>
        <button onClick={logout}>Sign Out</button>
    </div> :
    <div className="login">
      {isUsernameFocused ? (
        <Plinko
          key={`username${username}`}
          addCharacter={(c) => setUsername(username + c)}
        />
      ) : (
        <Plinko
          key={`password${password}`}
          addCharacter={(c) => setPassword(password + c)}
        />
      )}
      <form onSubmit={login} className="login-fields">
        <h2>Sign In</h2>
        <div className="login-field" onClick={() => setIsUsernameFocused(true)}>
          <span>Username: </span>
          <input
            placeholder={"Username"}
            value={username}
            style={
              isUsernameFocused
                ? { outline: "2px solid black", outlineOffset: "-1px" }
                : {}
            }
            onKeyDown={e => {if (e.key === "Backspace") setUsername(username.substring(0, username.length - 1))}}
            readOnly
          />
          {username.length < 5 && username.length !== 0 && <span className="info">Username must be at least 5 characters long</span>}
        </div>
        <div
          className="login-field"
          onClick={() => setIsUsernameFocused(false)}
        >
          <span>Password: </span>
          <input
            type="password"
            placeholder={"Password"}
            value={password}
            style={
              !isUsernameFocused
                ? { outline: "2px solid black", outlineOffset: "-1px" }
                : {}
            }
            onKeyDown={e => {if (e.key === "Backspace") setPassword(password.substring(0, password.length - 1))}}
            readOnly
          />
            {password.length < 5 && password.length !== 0 && <span className="info">Password must be at least 5 characters long</span>}
        </div>
        <input type="submit" value={"Sign In"} />
      </form>
    </div>
  );
}

export default Login;
