<template>
	<div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
		<side-bar :background-color="sidebarBackground" short-title="Argon" title="Argon">

		<template slot="links">
			<sidebar-item :link="{name: 'Dashboard', icon: 'ni ni-tv-2 text-primary', path: '/dashboard'}"/>
			<!-- <sidebar-item :link="{name: 'Icons', icon: 'ni ni-planet text-blue', path: '/icons'}"/> -->
			<sidebar-item :link="{name: 'Todo 리스트', icon: 'ni ni-check-bold text-green', path: '/todo'}"/>
			<sidebar-item :link="{name: '악성파일', icon: 'ni ni-notification-70 text-yellow', path: '/malwares'}"/>
			<sidebar-item :link="{name: '오늘의 뉴스', icon: 'ni ni-camera-compact text-orange', path: '/news'}"/>
			<sidebar-item :link="{name: '자유 게시판', icon: 'ni ni-email-83 text-blue', path: '/board'}"/>
			<!-- <sidebar-item :link="{name: 'Maps', icon: 'ni ni-pin-3 text-orange', path: '/maps'}"/> -->
			<!-- <sidebar-item :link="{name: 'User Profile', icon: 'ni ni-single-02 text-yellow', path: '/profile'}"/> -->
			<!-- <sidebar-item :link="{name: 'Tables', icon: 'ni ni-bullet-list-67 text-red', path: '/tables'}"/> -->
			<sidebar-item :link="{name: 'Login', icon: 'ni ni-key-25 text-info', path: '/login'}"/>
			<sidebar-item :link="{name: 'Register', icon: 'ni ni-circle-08 text-pink', path: '/register'}"/>
			<sidebar-item :link="{name: 'Vue 기본', icon: 'ni ni-book-bookmark text-info', path: '/vue'}"/>
			<sidebar-item :link="{name: 'Vue Component', icon: 'ni ni-app text-red', path: '/component'}"/>
		</template>
		</side-bar>
		<div class="main-content" :data="sidebarBackground">
			<dashboard-navbar></dashboard-navbar>

			<div @click="toggleSidebar">
				<fade-transition :duration="200" origin="center top" mode="out-in">
					<!-- your content here -->
					<router-view></router-view>
				</fade-transition>
				<content-footer v-if="!$route.meta.hideFooter"></content-footer>
			</div>
		</div>
	</div>
</template>
<script>
import DashboardNavbar from './DashboardNavbar.vue';
import ContentFooter from './ContentFooter.vue';
import { FadeTransition } from 'vue2-transitions';

export default {
	components: {
		DashboardNavbar,
		ContentFooter,
		FadeTransition
	},
	data() {
		return {
			sidebarBackground: 'vue' //vue|blue|orange|green|red|primary
		};
	},
	methods: {
		toggleSidebar() {
			if (this.$sidebar.showSidebar) {
				this.$sidebar.displaySidebar(false);
			}
		}
	}
};
</script>
<style lang="scss">
</style>
