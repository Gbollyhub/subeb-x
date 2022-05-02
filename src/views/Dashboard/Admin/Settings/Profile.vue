<template>
    <div>
     <notifications/>
   <Loader v-show="loading"/>
          <form>
            <div class="auth-form-row dashboard">
              <div class="auth-form-col half-col"><label class="auth-form-label black">First Name</label><input v-model="user.first_name" type="text" class="auth-input w-input"  placeholder="Enter your firstname" readonly></div>
              <div class="auth-form-col half-col"><label class="auth-form-label black">Last Name</label><input v-model="user.last_name" type="text" class="auth-input w-input" placeholder="Enter your last name" readonly></div>
              <div class="auth-form-col half-col"><label class="auth-form-label black">Email Address</label><input v-model="user.email_address" type="email" class="auth-input w-input" placeholder="Enter your firstname" readonly></div>
              <div class="auth-form-col half-col"><label class="auth-form-label black">Phone Number</label><input v-model="user.phone_number" type="tel" class="auth-input w-input" placeholder="Enter your last name" readonly></div>
            </div>
      
              </form>
            <form @submit.prevent="updatePassword"> 
              <br><br>
              <h5>Change Password</h5>
              <br><br>
              <div class="auth-form-row dashboard">
              <div class="auth-form-col half-col"><label class="auth-form-label black">New Password</label><input required v-model="user.password" type="password" class="auth-input w-input"  placeholder="Enter your password" ></div>
              <div class="auth-form-col half-col"><label class="auth-form-label black">Confirm Password</label><input required v-model="user.confirm_password" type="password" class="auth-input w-input" placeholder="Confirm your password" ></div>
              </div>
          <button type = "submit" class="app-btn primary margin-top">Change Password</button>
          </form>
        </div>

</template>

<script src="./Profile.js"></script>

