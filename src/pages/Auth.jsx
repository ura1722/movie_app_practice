import { useState, useEffect } from 'react';
import { useFetchTokenQuery, useLazyValidateTokenQuery, useLazyCreateSessionQuery } from '../services/moviesApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch,  } from 'react-redux';
import { setSessionId } from '../slices/sessionSlice';

const Auth = () => {
  const [token, setToken] = useState(null);
 
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate()

  const { data: tokenData, isLoading: isTokenLoading } = useFetchTokenQuery();
  const [triggerValidateToken, { data: validatedTokenData, isLoading: isValidating }] = useLazyValidateTokenQuery();
  const [triggerCreateSession, { data: sessionData, isLoading: isSessionLoading }] = useLazyCreateSessionQuery();

  useEffect(() => {
    if (tokenData && tokenData.request_token) {
      setToken(tokenData.request_token);
    }
  }, [tokenData]);

  useEffect(() => {
    if (validatedTokenData && validatedTokenData.success) {
      triggerCreateSession(validatedTokenData.request_token);
    }
  }, [validatedTokenData, triggerCreateSession]);

  useEffect(() => {
    if (sessionData && sessionData.session_id) {
      dispatch(setSessionId(sessionData.session_id));
      navigate("/movie_app_practice")
    }
  }, [sessionData]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    triggerValidateToken({ username: credentials.username, password: credentials.password, request_token: token });
  };

  if (isTokenLoading || isValidating || isSessionLoading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>Authorization Page</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" value={credentials.username} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={credentials.password} onChange={handleInputChange} />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      
    </div>
  );
};

export default Auth;
