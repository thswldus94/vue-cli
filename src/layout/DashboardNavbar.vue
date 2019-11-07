<template>
    <base-nav class="navbar-top navbar-dark"
              id="navbar-main"
              :show-toggle-button="false"
              expand>
        <form class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <div class="form-group mb-0">
                <base-input placeholder="Search"
                            class="input-group-alternative"
                            alternative=""
                            addon-right-icon="fas fa-search">
                </base-input>
            </div>
        </form>
        <ul class="navbar-nav align-items-center d-none d-md-flex">
            <li class="nav-item dropdown">
                <base-dropdown class="nav-link pr-0">
                    <div class="media align-items-center" slot="title">
                      <span class="avatar avatar-sm rounded-circle">
                        <img alt="Image placeholder" v-bind:src="imgsrc">
                      </span>
                      <div class="media-body ml-2 d-none d-lg-block">
                          <span v-if="id !== null && email !== null" class="mb-0 text-sm  font-weight-bold">{{ id }}</span>
                          <span v-if="id == null || email == null" class="mb-0 text-sm  font-weight-bold">지나가는 행인</span>
                      </div>
                    </div>

                    <template>
                        <div class=" dropdown-header noti-title">
                            <h6 class="text-overflow m-0">Welcome!</h6>
                        </div>
                        <div v-if="id !== null && email !== null">
                          <div class="dropdown-divider"></div>
                          <div class=" dropdown-header noti-title">
                              <h6 class="text-overflow m-0">{{ id }}</h6>
                              <h6 class="text-overflow m-0">{{ email }}</h6>
                          </div>
                          <div class="dropdown-divider"></div>
                        </div>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-single-02"></i>
                            <span>My profile</span>
                        </router-link>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-settings-gear-65"></i>
                            <span>Settings</span>
                        </router-link>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-calendar-grid-58"></i>
                            <span>Activity</span>
                        </router-link>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-support-16"></i>
                            <span>Support</span>
                        </router-link>
                        <div class="dropdown-divider" v-show="showLogout"></div>
                        <div class="pl-3" style="font-size: 0.875rem" v-show="showLogout">
                          <i class="ni ni-user-run"></i> <span v-on:click="logOut()" class="ml-3">Logout</span>
                        </div>
                    </template>
                </base-dropdown>
            </li>
        </ul>
    </base-nav>
</template>
<script>
  export default {
    data() {
      return {
        activeNotifications: false,
        showMenu: false,
        searchQuery: '',
        uid: null,
        id: null,
        email: null,
        imgsrc: 'img/theme/user.jpg',
        showLogout: false
      };
    },
    methods: {
      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
      },
      hideSidebar() {
        this.$sidebar.displaySidebar(false);
      },
      toggleMenu() {
        this.showMenu = !this.showMenu;
      },
      logOut() {
        this.$http.get('/api/logout').then(function() {
          location.href = "/";
        });
      }
    },
    mounted() {
      var vm = this;
      this.$http.get('/api/session').then(function(result) {
        if (Object.keys(result.data).length !== 0) {
          if (result.data.id.length > 0 && result.data.email != undefined) {
            vm.uid = result.data.uid;
            vm.id = result.data.id;
            vm.email = result.data.email;
            vm.showLogout = true;
            if (result.data.picture !== undefined && result.data.picture != '') {
              vm.imgsrc = result.data.picture;
            }
          } else {
            vm.showLogout = false;
          }
        }
      });
    }
  };
</script>
