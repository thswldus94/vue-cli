<template>
<div>
	<base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
		<base-alert type="secondary">
			<h5>1. 전역등록</h5>
			<p class="mt-1">아래와 같은 형식으로 Vue 인스턴스를 생성했습니다.</p>
			<div class="alert alert-secondary fade show" role="alert">
				<pre class="mb-0">
					new Vue({
						el: '#test'
					})
				</pre>
			</div>
			<p class="mt-1">전역 컴포넌트를 사용하려면 아래와 같이 사용합니다</p>
			<div class="alert alert-secondary fade show" role="alert">
				<pre class="mb-0">
					Vue.component('my-component', {
						// 옵션
					});
				</pre>
			</div>
		</base-alert>
	</base-header>
</div>
</template>

<script>
export default {
	name: 'component',
	data() {
		return {
			
		}
	}
}

</script>
<style>
p {
	font-size: 13px;
}
</style>
