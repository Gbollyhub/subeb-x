<template>
  <div>
    <MobileTopbar />
    <div class="dashboard-row">
      <notifications />
      <Loader v-show="loading" />
      <SideBar />
      <div class="dashboard-col-2">
        <div class="content-heading">
          <div class="div-block-4">
            <div class="text-block-3">ADMIN</div>
          </div>
          <router-link to="/admin"
            ><img
              src="../../../assets/images/back.svg"
              loading="lazy"
              alt=""
              class="image-4"
          /></router-link>
        </div>
        <div class="app-card">
          <div class="w-form">
            <form @submit.prevent="register">
              <div class="auth-form-row dashboard">
                <div class="auth-form-col half-col">
                  <label class="auth-form-label black">First Name</label
                  ><input
                    v-model="user.first_name"
                    type="text"
                    class="auth-input w-input"
                    placeholder="Enter your firstname"
                  />
                </div>
                <div class="auth-form-col half-col">
                  <label class="auth-form-label black">Last Name</label
                  ><input
                    v-model="user.last_name"
                    type="text"
                    class="auth-input w-input"
                    placeholder="Enter your last name"
                  />
                </div>
                <div class="auth-form-col half-col">
                  <label class="auth-form-label black">Email Address</label
                  ><input
                    v-model="user.email_address"
                    type="email"
                    class="auth-input w-input"
                    placeholder="Enter your firstname"
                  />
                </div>
                <div class="auth-form-col half-col">
                  <label class="auth-form-label black">Phone Number</label
                  ><input
                    v-model="user.phone_number"
                    type="tel"
                    class="auth-input w-input"
                    placeholder="Enter your last name"
                  />
                </div>
                <div class="auth-form-col half-col">
                  <label class="auth-form-label black">New Password</label
                  ><input
                    required
                    v-model="user.password"
                    type="password"
                    class="auth-input w-input"
                    placeholder="Enter your password"
                  />
                </div>
                <div class="auth-form-col half-col">
                  <label class="auth-form-label black">Confirm Password</label
                  ><input
                    required
                    v-model="user.confirm_password"
                    type="password"
                    class="auth-input w-input"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
              <button type="submit" class="app-btn primary margin-top">
                Add User
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./AddAdmin.js"></script>
