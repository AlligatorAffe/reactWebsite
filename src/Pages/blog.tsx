import { isUserLoggedIn } from "../Components/IsUserLoggedIn";

function Blog() {
  const loggedIn = isUserLoggedIn();
  return (
    <div>
      {loggedIn ? (
        <p>Du är inloggad!</p>
      ) : (
        <p>
          Du är inte inloggad. Vänligen <a href="/login">logga in</a>.
        </p>
      )}
    </div>
  );
}

export default Blog;
