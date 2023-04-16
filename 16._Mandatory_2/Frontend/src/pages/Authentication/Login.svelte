<script>
    import { useNavigate, useLocation } from "svelte-navigator";
    import {
        serverURL,
        serverEndpoints,
        session,
    } from "../../stores/stores.js";
    import toast, { Toaster } from "svelte-french-toast";
    import Cookies from "js-cookie";

    const navigate = useNavigate();
    const location = useLocation();

    let email;
    let password;

    async function handleSubmit(event) {
        event.preventDefault();
        const url = $serverURL + $serverEndpoints.authentication.login;
        const userCredentials = { email: email, password: password };
        await fetch(url, {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userCredentials),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message) {
                    toast.error(data.message, {
                        duration: 5000,
                        position: "bottom-right",
                        style: "border-radius: 200px; background: #333; color: #fff;",
                    });
                } else {
                    $session = data.session;
                    const options = {
                        expires: 7, // expires in 7 days
                        // httpOnly: true, // accessible only via HTTP(S) protocol, not via client-side scripts
                        // secure: true, // transmitted only via HTTPS
                    };
                    Cookies.set(
                        "userSession",
                        JSON.stringify(data.session),
                        options
                    );
                    navigate("/profile", { replace: true });
                }
            })
            .catch((error) => console.log(error));
    }
</script>

<Toaster />
<!-- svelte-ignore a11y-label-has-associated-control -->
<div class="container-fluid login-container">
    <div class="row">
        <div class="col-sm-6 col-xs mx-auto login-box">
            <div class="col-lg-12 mt-5">
                <img
                    class="img-container img-fluid mx-auto d-block"
                    src="../src/assets/Mandatory2Logo.png"
                    width="150"
                    alt="Logo"
                />
            </div>
            <div class="col-lg-12 login-title text-gradient">Log in to Mandatory II</div>

            <div class="col-lg-12 login-form">
                <div class="col-lg-12 login-form">
                    <form on:submit={handleSubmit} method="post">
                        <div class="form-group">
                            <label class="form-control-label">E-MAIL</label>
                            <input
                                bind:value={email}
                                type="email"
                                name="email"
                                class="form-control"
                                required
                            />
                        </div>
                        <div class="form-group">
                            <label class="form-control-label">PASSWORD</label>
                            <input
                                bind:value={password}
                                type="password"
                                name="password"
                                class="form-control"
                                required
                            />
                        </div>

                        <div class="form-group text-format row mb-2">
                            <p class="col">
                                Don’t have an account? <a
                                    class="aStyling"
                                    data-panel=".panel-signup"
                                    href="/signup">Sign Up Free!</a
                                >
                            </p>
                            <a class="col aStyling text-end" href="/forgot"
                                >Forgot password?</a
                            >
                        </div>

                        <div class="col-lg-12">
                            <div class="col-lg-12 login-button">
                                <button
                                    type="submit"
                                    class="btn btn-outline-primary"
                                    >LOGIN</button
                                >
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .login-container {
        width: 50em;
    }

    .login-box {
        margin-top: 75px;
        height: auto;
        background: #1a2226;
        text-align: center;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
        border-radius: 15px;
    }

    .login-title {
        margin-top: 35px;
        text-align: center;
        font-size: 30px;
        letter-spacing: 2px;
        font-weight: bold;
        color: #ecf0f5;
    }

    .login-form {
        margin-top: 25px;
        text-align: left;
    }

    input[type="email"],
    input[type="password"] {
        background-color: #1a2226;
        border: none;
        border-bottom: 2px solid #0db8de;
        border-radius: 0px;
        font-weight: bold;
        padding-left: 0px;
        color: #ecf0f5;
    }

    .form-group {
        margin-bottom: 40px;
        outline: 0px;
    }

    .form-control:focus {
        border-color: inherit;
        box-shadow: none;
        border-bottom: 2px solid #0dde29;
        outline: 0;
        background-color: #1a2226;
        color: #ecf0f5;
    }

    input:focus {
        outline: none;
        box-shadow: 0 0 0;
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 1000px #1a2226 inset !important;
        -webkit-text-fill-color: #ecf0f5 !important;
    }

    .form-control-label {
        font-size: 10px;
        color: #6c6c6c;
        font-weight: bold;
        letter-spacing: 1px;
    }

    .btn-outline-primary {
        border-color: #0dde29;
        color: #0dde29;
        font-weight: bold;
        letter-spacing: 1px;
    }

    .btn-outline-primary:hover {
        background-color: #0dde29;
        color: white;
        right: 0px;
    }

    .login-button {
        padding-right: 0px;
        text-align: center;
        margin-bottom: 25px;
    }

    .text-format {
        font-size: 14px;
    }
    .aStyling {
        color: #0db8de;
    }
</style>
