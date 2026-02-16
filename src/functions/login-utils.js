
export function authenticate(credentials, setUser, setError, navigate, setInvalid) {
    fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            
            username: credentials.username,
            password: credentials.password,
            expiresInMins: 30, // optional, defaults to 60
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