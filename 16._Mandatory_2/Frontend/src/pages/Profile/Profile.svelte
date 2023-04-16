<script>
  import { session, serverURL, serverEndpoints } from "../../stores/stores.js";
  import Logout from "../../components/Authentication/Logout.svelte";
  import toast, { Toaster } from "svelte-french-toast";
  import PopUp from "../../components/Authentication/PopUp.svelte";

  let isEditMode = false;
  let originalUserData = null;
  let isPopupOpen = false;

  function enterEditMode() {
    isEditMode = true;
    originalUserData = { ...$session.user };
  }

  function exitEditMode() {
    isEditMode = false;
    originalUserData = null;
  }

  function handleOpenPopup() {
    isPopupOpen = true;
  }

  function handlePopupCancel() {
    isPopupOpen = false;
  }

  async function handlePasswordSubmission(event) {
    if (!$session.user) return;
    if (
      originalUserData.fullname === $session.user.fullname &&
      originalUserData.email === $session.user.email
    ) {
      // No changes made, just exit edit mode
      isPopupOpen = false;
      exitEditMode();
      return;
    }
    const password = event.detail;
    if (!password) {
      toast.error("Password is required.");
      return;
    }

    // Validate the user's password
    const urlValidate =
      $serverURL + $serverEndpoints.authentication.validatepassword;
    const response = await fetch(urlValidate, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: $session.user,
        password: password,
      }),
    });

    if (!response.ok) {
      toast.error("Incorrect password.");
      return;
    }
    updateProfile();
  }

  async function updateProfile() {
    // Password is correct, update the user's profile
    const updatedUserData = { ...$session.user };
    updatedUserData.fullname = originalUserData.fullname;
    updatedUserData.email = originalUserData.email;

    const urlChangeUser =
      $serverURL + $serverEndpoints.authentication.changeuser;
    const updateResponse = await fetch(urlChangeUser, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserData),
    });

    if (updateResponse.ok) {
      const data = await updateResponse.json();
      toast.success("Profile updated successfully.");
      $session = data.session;
      isPopupOpen = false;
      exitEditMode();
    } else {
      const errorData = await updateResponse.json();
      console.log(errorData);
      toast.error("Failed to update profile.");
    }
  }
</script>

<Toaster />
<!-- svelte-ignore a11y-label-has-associated-control -->
<div class="container-fluid">
  {#if isPopupOpen}
    <PopUp on:submit={handlePasswordSubmission} on:cancel={handlePopupCancel} />
  {/if}
  <div class="row">
    <div class="col-sm-6 col-xs mx-auto profile-box">
      <div class="col-lg-12 mt-5">
        <img
          class="img-container img-fluid mx-auto d-block"
          src="../src/assets/profileDefault.png"
          width="150"
          alt="Profile_image"
        />
      </div>
      <div class="col-lg-12 title text-gradient">
        Welcome {$session.user.fullname}
      </div>

      <div class="col-lg-12 profile-form">
        <div class="col-lg-12 profile-form">
          <h3>Information</h3>

          <div class="form-group">
            <label class="form-control-label">Full Name</label>
            {#if isEditMode}
              <input
                type="text"
                bind:value={originalUserData.fullname}
                class="form-control"
              />
            {:else}
              <input
                type="text"
                value={$session.user.fullname}
                class="form-control"
                readonly
              />
            {/if}
          </div>

          {#if !isEditMode}
            <div class="form-group">
              <label class="form-control-label">Username</label>
              <input
                type="text"
                value={$session.user.username}
                class="form-control"
                readonly
              />
            </div>
          {/if}
          <div class="form-group">
            <label class="form-control-label">E-mail</label>
            {#if isEditMode}
              <input
                type="email"
                bind:value={originalUserData.email}
                class="form-control"
              />
            {:else}
              <input
                type="email"
                value={$session.user.email}
                class="form-control"
                readonly
              />
            {/if}
          </div>

          {#if isEditMode}
            <div class="profile-button">
              <button class="btn btn-outline-secondary" on:click={exitEditMode}>
                <i class="bi bi-x-circle" />
                Cancel
              </button>
              <button
                class="btn btn-outline-primary"
                on:click={handleOpenPopup}
              >
                <i class="bi bi-save" />
                Save Changes
              </button>
            </div>
          {:else}
            <div class="profile-button">
              <button class="btn btn-outline-primary" on:click={enterEditMode}>
                <i class="bi bi-pencil-square" />
                Edit
              </button>
            </div>
          {/if}

          <div class="col-lg-12 profile-button">
            <Logout />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .profile-box {
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

  .profile-form {
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

  .profile-button {
    padding-right: 0px;
    text-align: center;
    margin-bottom: 25px;
  }
</style>
