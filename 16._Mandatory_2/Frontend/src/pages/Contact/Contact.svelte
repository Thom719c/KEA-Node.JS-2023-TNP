<script>
    import { useNavigate, useLocation } from "svelte-navigator";
    import {
        serverURL,
        session,
        serverEndpoints,
    } from "../../stores/stores.js";
    import toast, { Toaster } from "svelte-french-toast";

    const navigate = useNavigate();
    const location = useLocation();

    let subject;
    let email;
    let message;

    async function handleSubmit(event) {
        event.preventDefault();
        const url = $serverURL + $serverEndpoints.mailer.contact;
        const userCredentials = {
            subject: subject,
            email: email,
            message: message,
        };
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
                    toast.success(data.message, {
                        duration: 5000,
                        position: "bottom-right",
                        style: "border-radius: 200px; background: #333; color: #fff;",
                    });
                } else {
                    $session = data.session;
                    navigate("/", { replace: true });
                }
            })
            .catch((error) => console.log(error));
    }
</script>

<Toaster />
<!-- svelte-ignore a11y-label-has-associated-control -->
<div class="container-fluid">
    <div class="row">
        <div class="col-sm-6 col-xs mx-auto feedback-box">
            <div class="col-lg-12 mt-5">
                <img
                    class="img-container img-fluid mx-auto d-block"
                    src="../src/assets/Mandatory2Logo.png"
                    width="150"
                    alt="Logo"
                />
            </div>
            <div class="col-lg-12 title text-gradient">
                Please give us feedback
            </div>

            <div class="col-lg-12 feedback-form">
                <div class="col-lg-12 feedback-form">
                    <form on:submit={handleSubmit} method="post">
                        <div class="form-group">
                            <label class="form-control-label">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                class="form-control"
                                placeholder="What is your message about?"
                                required
                                bind:value={subject}
                            />
                        </div>
                        <div class="form-group">
                            <label class="form-control-label">E-Mail</label>
                            <input
                                type="email"
                                name="email"
                                class="form-control"
                                placeholder="Example@domain.com"
                                required
                                bind:value={email}
                            />
                        </div>
                        <div class="form-group">
                            <label class="form-control-label">Message</label>
                            <textarea
                                cols="30"
                                rows="10"
                                name="message"
                                class="form-control"
                                placeholder="Enter your question or feedback"
                                bind:value={message}
                            />
                        </div>

                        <div class="col-lg-12">
                            <div class="col-lg-12 feedback-button">
                                <button
                                    type="submit"
                                    class="btn btn-outline-primary"
                                    >Send feedback</button
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
    .feedback-box {
        margin-top: 75px;
        height: auto;
        background: #1a2226;
        text-align: center;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
        border-radius: 15px;
    }

    .title {
        margin-top: 35px;
        text-align: center;
        font-size: 30px;
        letter-spacing: 2px;
        font-weight: bold;
        color: #ecf0f5;
    }

    .feedback-form {
        margin-top: 25px;
        text-align: left;
    }

    input[type="text"],
    input[type="email"] {
        background-color: #1a2226;
        color: #ecf0f5;
        border: none;
        border-bottom: 2px solid #0db8de;
        border-radius: 0px;
        font-weight: bold;
        padding-left: 0px;
    }

    textarea {
        background-color: #1a2226;
        color: #ecf0f5;
        border-bottom: 2px solid #0db8de;
    }

    textarea::placeholder,
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

    .feedback-button {
        padding-right: 0px;
        text-align: center;
        margin-bottom: 25px;
    }
</style>
