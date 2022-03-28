import { Link } from "react-router-dom";
import Button from "../../components/Button/Button"

export default function SignIn() {
  return (
    <main className="main bg-dark">
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <form>
        <div className="input-wrapper">
          <label htmlFor ="username">Username</label>
          <input type="text" id="username" />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <div className="input-remember">
          <input type="checkbox" id="remember-me" />
          <label htmlFor ="remember-me">Remember me</label>
        </div>
        <Link className="sign-in-button" to="/user">
            Sign In
        </Link>
        {/* <Button content={"Sign In"} /> */}
      </form>
    </section>
  </main>
  );
}
