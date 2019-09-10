<template>
<div>
	<base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
		<base-alert type="secondary">
			<h4>1. 전역등록</h4>
			<p class="mt-1">아래와 같은 형식으로 Vue 인스턴스를 생성했습니다.</p>
			<div class="alert alert-secondary fade show p-0" role="alert">
				<pre class="mb-0 p-1">
new Vue({
	el: '#test'
})
				</pre>
			</div>
			<p class="mt-1">전역 컴포넌트를 사용하려면 아래와 같이 사용합니다</p>
			<div class="alert alert-secondary fade show p-0" role="alert">
				<pre class="mb-0 p-1">
Vue.component('my-component', {
	// 옵션
});

// 이렇게 지정이 되면 &lt;my-component&gt;&lt;/my-component&gt; 로 사용할 수 있습니다.
// ※꼭 인스턴스를 생성하기 전에 컴포넌트를 먼저 등록 해 주어야 합니다!!※

&lt;div id="com01"&gt;
	&lt;my-component&gt;&lt;/my-component&gt;
&lt;/div&gt;

// 등록
Vue.component('my-component', {
	template: '&lt;div&gt;사용자 정의 컴포넌트 입니다!&lt;/div&gt;'
})

// 루트 인스턴스 생성
new Vue({
	el: '#com01'
})
				</pre>
				<div id="com01">
					여기에 결과가 나오게됩니다~~^^ <br />
					<first-component></first-component>
				</div>
			</div>
		</base-alert>
	</base-header>
</div>
</template>

<script>
import Vue from 'vue'

// 등록
Vue.component('first-component', {
	template: '<div>사용자 정의 컴포넌트 입니다!!!</div>'
});

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
pre {
	width: 100%;
	background: #e0e0e0;
    border-radius: 7px;
}
</style>
