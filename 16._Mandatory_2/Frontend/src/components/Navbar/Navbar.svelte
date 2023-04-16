<script>
  import { Router, Link, link, Route } from "svelte-navigator";
  import { session } from "../../stores/stores.js";
  import Homepage from "../../pages/Frontpage/Home.svelte";
  import Contact from "../../pages/Contact/Contact.svelte";
  import PrivateRoute from "../PrivateRoutes/PrivateRoute.svelte";
  import Profile from "../../Pages/Profile/Profile.svelte";
  import Login from "../../pages/Authentication/Login.svelte";
  import Logout from "../Authentication/Logout.svelte";
  import Signup from "../../pages/Authentication/Signup.svelte";
  import Forgot from "../../pages/Authentication/Forgot.svelte";
  import ResetPassword from "../../pages/Authentication/ResetPassword.svelte";
</script>

<Router>
  <nav
    class="navbar navbar-expand-lg bg-body-tertiary navbar-dark"
    data-bs-theme="dark"
  >
    <div class="container-fluid">
      <a class="navbar-brand" href="/">
        <!-- svelte-ignore a11y-missing-attribute -->
        <img id="logo" src="src/assets/Mandatory2Logo.png" width="50" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="/" use:link>Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="about" use:link>About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="contact" use:link>Contact</a>
          </li>
        </ul>
        <ul class="navbar-nav">
          {#if $session}
            <li class="nav-item">
              <a class="nav-link" href="/profile" use:link>Profile</a>
            </li>
            <li class="nav-item">
              <Logout isLink={true} />
            </li>
          {:else}
            <li class="nav-item">
              <a class="nav-link" href="login" use:link>Login</a>
            </li>
          {/if}
        </ul>
      </div>
    </div>
  </nav>

  <main>
    <Route path="login" primary={false}>
      <Login />
    </Route>

    <Route path="/">
      <header tabindex="-1">
        <h1>Home</h1>
      </header>
      <Homepage>
        <h3>This is the home of the Svelte Family.</h3>
      </Homepage>
    </Route>

    <Route path="about">
      <header>
        <h1>About</h1>
      </header>
      <p>That's what it's all about!</p>
    </Route>

    <Route path="contact">
      <header>
        <h1>Contact</h1>
      </header>
      <Contact />
    </Route>

    <Route path="forgot" component={Forgot}>
      <Forgot />
    </Route>
    <Route path="reset-password" component={ResetPassword}>
      <ResetPassword />
    </Route>
    <Route path="signup" component={Signup} primary={false}>
      <Signup />
    </Route>

    <PrivateRoute path="profile" let:location>
      <header>
        <h1>Profile</h1>
      </header>
      <Profile />
    </PrivateRoute>
  </main>
</Router>

<style>
  header {
    display: flex;
    justify-content: space-between;
    background-color: #025f1e;
    width: 100%;
  }

  h1 {
    padding-left: 10px;
    display: inline-block;
  }

  nav {
    display: flex;
    justify-content: center;
    align-self: center;
    font-size: 18px;
    gap: 20px;
  }
</style>
