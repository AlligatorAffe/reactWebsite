function ForgotPassword() {
  const loggedIn = false;

  return (
    <div>
      {loggedIn ? (
        <p>Du är inloggad!</p>
      ) : (
        <div>
          <p>
            <h1>Forgot login!</h1>
          </p>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
