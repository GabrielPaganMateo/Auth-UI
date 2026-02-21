
export function authenticate(credentials, setUser, setError, navigate, setInvalid) {
    fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            
            username: credentials.username,
            password: credentials.password,
            expiresInMins: 1, // optional, defaults to 60
    }),
        // credentials: 'include' // Include cookies (e.g., accessToken) in the request
    })
    .then(async (response) => {
            const body = await response.json();
            if (body && response.status === 200) {
                setUser(body)
                navigate('/ui')
            } else if (body) {
                setInvalid(body)
            }
        }
    )
    .catch(error => {
        setError(error);
    })
}

export function isAuthenticatedAtLogin(user, navigate, setUser) {
    console.log(user)
    console.log(user?.refreshToken)
    const token = localStorage.getItem('refreshToken')
    if (token == null) {
        return;
    }

    const tokenExpiration = localStorage.getItem('refreshTokenTTL')
  const tokenTime = parseInt(tokenExpiration);
  const currentTime = new Date();
  console.log("Current " + currentTime.getTime());
  console.log("Token " + tokenTime)
  const isExpired = tokenTime < currentTime.getTime();


  if (tokenExpiration != null && isExpired == false) {
    console.log("Expired " + isExpired)
    navigate("/ui", { replace: true });
    return;
  }

    fetch('https://dummyjson.com/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        refreshToken: token, // Optional, if not provided, the server will use the cookie
        expiresInMins: 1, // optional (FOR ACCESS TOKEN), defaults to 60 
    }),
        // credentials: 'include' // Include cookies (e.g., accessToken) in the request
    })
    .then(async (response) =>   
        {
            if (response.ok == false) {
                navigate('/login')
                setUser(undefined)
            } else {
                const json = await response.json();
                
                navigate('/ui')
            }
        }
    )
    .catch(console.log)
}

export function isAuthenticatedAtUI(user, navigate, setUser) {
  if (!user?.refreshToken) {
    setUser(undefined);
    navigate("/login", { replace: true });
    return;
  }

  const tokenExpiration = localStorage.getItem('refreshTokenTTL')
  const tokenTime = parseInt(tokenExpiration);
  const currentTime = new Date();
  console.log("Current " + currentTime.getTime());
  console.log("Token " + tokenTime)
  const isExpired = tokenTime < currentTime.getTime();


  if (tokenExpiration != null && isExpired == false) {
    console.log("Expired " + isExpired)
    return
  }

    fetch('https://dummyjson.com/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        refreshToken: user.refreshToken, // Optional, if not provided, the server will use the cookie
        expiresInMins: 1, // optional (FOR ACCESS TOKEN), defaults to 60 
    })
        // credentials: 'include' // Include cookies (e.g., accessToken) in the request
    })
    .then(async (response) =>   
        {
            if (response.ok == false) {
                navigate('/login')
                setUser(undefined)
            } else {
                const json = await response.json();
                user.refreshToken = json.refreshToken;
                user.accessToken = json.accessToken;
                setUser({...user, ['refreshToken'] : json.refreshToken, ['accessToken'] : json.accessToken});
                const date = new Date();
                const ttl = date.getTime() + 60000;
                console.log("TTL " + ttl)
                localStorage.setItem('refreshTokenTTL', ttl)
                localStorage.setItem('refreshToken', user.refreshToken)

            }
        }
    )
    .catch(console.log)
}