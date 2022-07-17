import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../api/auth";
import { AuthContext } from "../App";
import styled from "@emotion/styled";

export const SignIn = () => {
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const generateParams = () => {
    const signInParams = {
      email: email,
      password: password,
    };
    return signInParams;
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    const params = generateParams();

    try {
      const res = await signIn(params);
      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div >
      <SignInWrapper>
        <LoginHeader>LOG IN</LoginHeader>
        <LoginForm>
          <div>
            <LoginInput
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)
              }
              placeholder="email"
            />
          </div>
          <div>
            <LoginInput
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
          </div>
          <SubmitBt type="submit" onClick={(e) => handleSignInSubmit(e)}>
            Submit
          </SubmitBt>
        </LoginForm>
        <div style={{backgroundColor: "white", width: "100%"}}>
          <Link to="/signup" >sign up</Link>
        </div>
      </SignInWrapper>
    </div>
  );
};

const SignInWrapper = styled.div`
  background: #456;
  font-family: 'Open Sans', sans-serif;
  width: 400px;
  margin: 16px auto;
  font-size: 16px;
`

const LoginHeader = styled.h2`
  margin-top: 0;
  margin-bottom: 0;
  background: #28d;
  padding: 20px;
  font-size: 1.4em;
  font-weight: normal;
  text-align: center;
  text-transform: uppercase;
  color: #fff;
`

const LoginForm = styled.form`
  background: #ebebeb;
  padding: 12px;
  padding: 20px;
  font-size: 1.4em;
  font-weight: normal;
  text-align: center;
  text-transform: uppercase;
  color: #000000;
`

const LoginInput = styled.input`
  box-sizing: border-box;
  display: block;
  width: 100%;
  border-width: 1px;
  border-style: solid;
  padding: 16px;
  outline: 0;
  font-family: inherit;
  font-size: 0.95em;
  background: #fff;
  border-color: #bbb;
  color: #555;
  margin-top: 16px;
`

const SubmitBt = styled.button`
  box-sizing: border-box;
  display: block;
  width: 100%;
  border-width: 1px;
  border-style: solid;
  padding: 16px;
  outline: 0;
  font-family: inherit;
  font-size: 0.95em;
  background: #28d;
  border-color: transparent;
  color: #fff;
  margin-top: 16px;
  cursor: pointer;
  :hover {
    background: #17c;
  }
  :focus {
    border-color: #05a;
  }
`