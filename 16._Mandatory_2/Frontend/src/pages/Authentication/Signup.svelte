<script>
    import { useNavigate, useLocation } from "svelte-navigator";
    import { serverURL, serverEndpoints } from "../../stores/stores.js";
    import toast, { Toaster } from "svelte-french-toast";

    const navigate = useNavigate();
    const location = useLocation();

    let fullname;
    let email;
    let username;
    let password;
    let confirmPassword;

    async function handleSubmit() {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match.", {
                duration: 5000,
                position: "bottom-right",
                style: "border-radius: 200px; background: #333; color: #fff;",
            });
            return;
        }

        const url = $serverURL + $serverEndpoints.authentication.signup;
        const userCredentials = {
            fullname: fullname,
            email: email,
            username: username,
            password: password,
            confirmPassword: confirmPassword,
        };
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userCredentials),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.errorStatus) {
                    toast.error(data.message, {
                        duration: 5000,
                        position: "bottom-right",
                        style: "border-radius: 200px; background: #333; color: #fff;",
                    });
                } else {
                    toast.success(data.message, {
                        duration: 5000,
                        position: "bottom-right",
                        style: "border-radius: 200px; background: #333; color: #fff;",
                    });
                    navigate("/login", { replace: true });
                }
            })
            .catch((error) => console.log(error));
    }
</script>

<Toaster />
<!-- svelte-ignore a11y-label-has-associated-control -->
<div class="container-fluid signup-container">
    <div class="row">
        <div class="col-sm-6 col-xs mx-auto signup-box">
            <div class="col-lg-12 mt-5">
                <img
                    class="img-container img-fluid mx-auto d-block"
                    src="../src/assets/Mandatory2Logo.png"
                    width="150"
                    alt="Logo"
                />
            </div>
            <div class="col-lg-12 signup-title text-gradient">Sign Up Free!</div>

            <div class="col-lg-12 signup-form">
                <div class="col-lg-12 signup-form">
                    <form
                        on:submit|preventDefault={handleSubmit}
                        method="post"
                        autocomplete="off"
                    >
                        <div class="form-group">
                            <label class="form-control-label">FULLNAME</label>
                            <input
                                bind:value={fullname}
                                type="text"
                                name="fullname"
                                class="form-control"
                                placeholder="Elena Michaels"
                                required
                            />
                        </div>
                        <div class="form-group">
                            <label class="form-control-label">USERNAME</label>
                            <input
                                bind:value={username}
                                type="text"
                                name="username"
                                class="form-control"
                                placeholder="LunaRain"
                                required
                            />
                        </div>
                        <div class="form-group">
                            <label class="form-control-label">E-MAIL</label>
                            <input
                                bind:value={email}
                                type="email"
                                name="email"
                                class="form-control"
                                placeholder="Example@domain.com"
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
                        <div class="form-group">
                            <label class="form-control-label"
                                >CONFIRM PASSWORD</label
                            >
                            <input
                                bind:value={confirmPassword}
                                type="password"
                                name="confirmPassword"
                                class="form-control"
                                required
                            />
                        </div>

                        <div class="form-group text-format row mb-2">
                            <p class="col">
                                Have an account? <a
                                    class="aStyling"
                                    data-panel=".panel-signup"
                                    href="/login">Login!</a
                                >
                            </p>
                        </div>

                        <div class="col-lg-12">
                            <div class="col-lg-12 signup-button">
                                <button
                                    class="btn btn-outline-primary"
                                    >Create</button
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
    .signup-container {
        width: 50em;
    }

    .signup-box {
        margin-top: 75px;
        height: auto;
        background: #1a2226;
        text-align: center;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
        border-radius: 15px;
    }

    .signup-title {
        margin-top: 35px;
        text-align: center;
        font-size: 30px;
        letter-spacing: 2px;
        font-weight: bold;
        color: #ecf0f5;
    }

    .signup-form {
        margin-top: 25px;
        text-align: left;
    }

    input {
        background-color: #1a2226;
        border: none;
        border-bottom: 2px solid #0db8de;
        border-radius: 0px;
        font-weight: bold;
        padding-left: 0px;
        color: #ecf0f5;
    }

    input::placeholder {
        color: #777777;
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

    .signup-button {
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
