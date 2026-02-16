
function LoginErrorFallback() {
  return (
    <>
        <div>
        <h2>Login failed</h2>
        <p>Please refresh and try again.</p>
        <button onClick={() => window.location.reload()}>
            Reload
        </button>
        </div>
    </>
  );
}

export default LoginErrorFallback;
