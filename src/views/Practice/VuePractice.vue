<template>
<div>
	<base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
		<base-alert type="secondary">
			<h4>1. 보이는대로 메시지를 찍어봅니다.</h4>
			<p>
				1. {{ message1 }}
			</p>
		</base-alert>
		<base-alert type="secondary">
			<h4 v-bind:title="message2">
				2. 마우스를 올렸을 때 동적으로 현재 시간이 생성되어 저장됩니다.
			</h4>
		</base-alert>
		<base-alert type="secondary">
			<h4 v-if="seen">
				3. 브라우저 콘솔에서 app3.seen 을 true, false로 바꾸면 지금 이 문장은 보였다 안보였다 할 수 있습니다.
			</h4>
		</base-alert>
		<base-alert type="secondary">
			<p>4. for를 이용하여 리스트 내의 여러 항목들을 출력할 수 있습니다.<br />
				이것도 마찬가지로 콘솔에서 app4.todos[1].content 의 내용을 바꾸면 동적으로 변경됩니다.<br />
				변경 뿐만 아니라 app4.todos.push({ content : '새로운 것' }); 처럼 추가도 가능하고 삭제도 가능 합니다.
			</p>
			<ol>
				<li v-for="todo in todos" v-bind:key="todo.id">
					{{ todo.content }}
				</li>
			</ol>
		</base-alert>
		<base-alert type="secondary">
			<h4>5. {{ message3 }}</h4>
			<button class="btn btn-primary btn-xs" v-on:click="reverseWords">뒤집어!!</button>
		</base-alert>
		<base-alert type="secondary">
			<h4>6. {{ message4 }}</h4>
			<input class="form-control" v-model="message4">
		</base-alert>



		<base-alert type="secondary">
			<h4>1. 문자열을 찍을 때는 {{ }} 를 사용합니다.</h4>
			<p>
				메시지: {{ message }}
			</p>
		</base-alert>

		<base-alert type="secondary">
			<h4>2. 이중 중괄호 {{ }}는 텍스트로 데이터를 인식합니다.</h4>
			<p>따라서 html코드 등을 사용 할 때는 별도의 v-html 디렉티브가 필요합니다~</p>
			<p style="font-weight: bold">근데 이 옵션은 XSS공격에 위험할 수 있기 때문에 자주 사용하지는 않는 편이 좋대요~</p>

			<p>- 이중 중괄호를 사용하여 표시 : {{ rawHTML }}: </p>
			<p>- 이중 중괄호를 사용하더라도 v-html 옵션 표시: <span v-html="rawHTML"></span></p>
		</base-alert>

		<base-alert type="secondary">
			<h4>3. 속성 바인드 v-bind는 동적으로 속성을 바인딩 할때 사용합니다.</h4>
			<p>예를 들어 img src의 "src", class값, style값 등을 동적으로 할당할 수 있어요 </p>
			<p>속성 이름을 :prop 로 내가 만들어서 할당할 수도 있어요 </p>

			<p>- 99년도 감성 움짤 img src와 style 이미지 사이즈 속성 바인딩</p>
			<img v-bind:src="imageSrc" v-bind:style="imageSizeStyle" />

			<br /><br />
			<p>신기한게 바인딩 할 때 자바스크립트 표현식을 쓸 수 있어요</p>
			<p>그 대신 함수를 작성하거나 두줄 이상이 넘어가는 코드는 작성 할 수 없어요. 무조건 단일 표현식만 할수있답니다</p>
		</base-alert>

		<base-alert type="secondary">
			<h4>4. 디렉티브? 란 뭘까요</h4>
			<p>디렉티브는 v- 가 있는 특수 속성이예요.</p>
			<p>- 전달 인자 : 무언가를 전달할 때 사용할 수 있어요</p>
			<p>예를 들어서 <a v-bind:href="url">링크 고고!</a> 처럼 사용할 수 있지요.</p>
			<p>또 한편 이벤트 핸들러로 <button class="btn btn-primary btn-xs" v-on:click="clickEventFunction">버튼 고고!</button> 처럼 사용 할 수도 있어요.</p>
			<br />
			<p>- 수식어 : 점으로 표시되는 특수접미사로, 디렉티브를 특수한 방법으로 바인딩 해야 함을 나타냅니다</p>
			<p>예를 들어서 &lt;form v-on:submit.prevent="onSubmit"&gt;내용내용&lt;/form&gt; .prevent 는 event.preventDefault 를 나타내는 겁니다</p>
			<br />
			<p>- 약어</p>
			- &lt;a v-bind:href="url"&gt;gogo&lt;/a&gt; 는 &lt;a :href="url"&gt;gogo&lt;/a&gt;<br />
			- &lt;a v-on:click="doFunction"&gt;gogo&lt;/a&gt; 는 &lt;a @click="doFunction"&gt;gogo&lt;/a&gt;
		</base-alert>

		<base-alert type="secondary">
			<h4>1. v-if</h4>
			<p>말 그대로 if문을 사용할 수 있어요</p>
			<p  v-if="ok">ok인 경우 Yes가 나타납니다!</p>
			<p  v-else>else 조건으로 맞을 시 No가 나타납니다!</p>
			<br />

			<p>쉽게 말해 가상의 엘리먼트를 만들 수도 있습니다</p>
			<p>하나의 엘리먼트에만 추가가 가능하지만 여러개를 추가하고 싶을 수도 있잖아요??</p>
			<p>그럴때 template 엘리먼트를 사용합니다. 물론 이건 나중에 렌더링된 결과에는 나오지 않아요~</p>
			<div v-if="wanttoshow">
				<span class="text-warning">노랑글씨</span>
				<span class="text-danger">빨강글씨</span>
				<span>이건 이제 wanttoshow 속성이 참인경우 보입니다!!</span>
			</div>
		</base-alert>

		<base-alert type="secondary">
			<h4>2. v-else</h4>
			<p>v-else 디렉티브는 반드시 v-if 뒤에 위치해야 합니다! v-else-if도 있어요~</p>
			<span v-if="randomNum > 100">
				랜덤숫자가 100보다 큰 경우 내가 보일거예요!
			</span>
			<span v-else-if="randomNum > 50">
				랜덤숫자가 50보다 큰 경우 내가 보임!!
			</span>
			<span v-else>이제는 안보입니다!</span>
		</base-alert>

		<base-alert type="secondary">
			<h5>3. Key를 이용하여 재사용 가능한 엘리먼트 제어</h5>
			<p>재사용 가능한 엘리먼트 제어가 쉬워요. 예를들어서 로그인 할 때<br />
				아이디를 넣는지, 이메일을 넣는지 구분할 수 있는 코드를 짜볼게요.<br />
				단순히 key를 사용하지 않는 다면 두 개는 동일한 엘리먼트로 사용하기 때문에<br />
				인풋 안의 내용이 지워지지 않아요. 그럴때 이건 유일하다!! 라는걸 알려주기 위해 key를 씁니다<br />
				유일한 id같은 개념이죠. 재사용 하지 않고 그린답니다.
			</p>
			<div v-if="loginType === 'userid'">
				<label>사용자 아이디</label>
				<input class="form-control" placeholder="ID를 입력하세요" ke="userid-input"/>
			</div>
			<div v-else>
				<label>사용자 이메일</label>
				<input class="form-control" placeholder="이메일을 입력하세요" key="email-input"/>
			</div>
		</base-alert>

		<base-alert type="secondary">
			<h5>4. v-show</h5>
			<p>v-show는 단순히 toggle느낌입니다. display 속성 토글 수준?<br />
			처음부터 계속 렌더링 되고 DOM에 남아있기 때문에 template 구문과 else, if 구문도 동작하지 않습니다.</p>
			<p>
				v-if는 레알 조건부 렌더링 입니다. 대신 렌더링 초기에 조건이 false인 경우 아무것도 안합니다<br />
				망할놈이 일도 안하는거죠;; true가 나올 때 까지 일을 안합니다<br />
				대신 v-show는 처음부터 무조건 렌더링됩니다<br />
				바뀌는 빈도가 많으면 v-show, 적으면 v-if 가 쓰기 좋습니다.
			</p>
		</base-alert>

		<base-alert type="secondary">
			<h5>1. v-for 엘리먼트 배열 매핑하기</h5>
			<p>v-for로 배열 리스트 렌더링을 할 수 있습니다~</p>
			<p>item in items 같은 형식으로 php foreach 형식과 비슷하네용 (item of items 도 괜찮아요 of도 쓸수있다는점 ㅎ.ㅎ)</p>
			<br />
			<ul>
				<li v-for="item in items" v-bind:key="item.id">
					{{ item.message }}
				</li>
			</ul>
			<br />
			<br />
			<p>v-for는 부모 범위 속성에 대한 모~든 권한이 있어유. 또한 인덱스 요소(두번째)까지 사용이 가능해요. 인덱스는 늘 그렇듯.. 0번부터 ^.^</p>
			<ul id="app52">
				<li v-for="(item, index) in items" v-bind:key="item.id">
					부모 속성: {{parentMessage}} / 인덱스: {{index}} / 아이템메시지: {{item.message}}
				</li>
			</ul>
		</base-alert>

		<base-alert type="secondary">
			<h5>2. v-for와 객체</h5>
			<p>배열뿐만 아니라 객체의 속성도 반복할 수 있수요!</p>
			<p>Key값과 index까지 전달 하려면 v-for="(value, key, index) in object" 와 같이 해주면 돼요. 두번째 인자가 key, 세번재 인자가 index값이예요</p>
			<ul>
				<li v-for="(val, key, idx) in object" v-bind:key="val.id">
					index: {{ idx }} / key: {{ key }} / value: {{ val }}
				</li>
			</ul>
		</base-alert>

		<base-alert type="secondary">
			<h5>3. v-for의 Key</h5>
			<p>만약 리스트 데이터에서 순서가 변경된 경우? DOM요소를 직접 이동하여 수정하지 않아요</p>
			<p>대신 Vue는 각 요소를 적절한 위치에 패치하고 렌더링 할 내용을 반영할지 확인해요</p>
			<p>각 노들을 추적하고 기존 엘리먼트의 재사용,정렬 하기 위해 각 항목들의 key를 확인할 수 있게 key속성을 사용하는 것이 좋아요.</p>
			<br />
			<span class="text-danger">이건 좀 야매 방법이긴 한데 tbody를 무식하게 여러번 만든겁니다! 이렇게 하믄안되겠쬬 ㅠㅠ 이후에 나오는 template를 참고하세용</span>
			<table class="table" style="width: 300px">
				<thead>
					<tr><th>이름</th><th>나이</th><th>성별</th></tr>
				</thead>
				<tbody v-for="tr in trs" v-bind:key="tr.id">
					<tr>
						<td>{{ tr.name }}</td>
						<td>{{ tr.age }}</td>
						<td>{{ tr.sex }}</td>
					</tr>
				</tbody>
			</table>
		</base-alert>

		<base-alert type="secondary">
			<h5>4. 배열변경감지</h5>
			<p>감시중인 배열의 변이 메소드를 래핑하여 뷰 갱신을 트리거 합니당! 다음은 래핑된 메소드예요</p>
			<ul>
				<li v-for="method in methods" v-bind:key="method.id">
					{{ method.name }}
				</li>
			</ul>
			<br />
			<p>app55.methods.pop({name:'splice()'}); 뭐 이런식으로 뽑아내거나 추가하거나 할 수 있어요.</p>
		</base-alert>

		<base-alert type="secondary">
			<h5>5. 배열 대체</h5>
			<p>변이 메소드는 원본 배열을 변형하는데, 원본 변형을 원치 않는 경우 아래의 세 메소드를 사용하면 항상 새 배열을 반환해요</p>
			<ul>
				<li v-for="method in methods2" v-bind:key="method.id">
					{{ method.name }}
				</li>
			</ul>
			<br />
			<p>근데 이러면 Vue가 기존 배열을 버리고 다시 렌더링 할줄 아는데?!! 그건 아님 ㅋ 뭐.. 대체해서 사용한다구 함</p>
		</base-alert>

		<base-alert type="secondary">
			<h5>6. 주의사항!</h5>
			<p>Javascript의 제한으로 인해 Vue는 아래와 같은 상황을 감지할 수 없어요</p>
			<p>1. 인덱스로 배열 항목을 직접 수정 vm.items[2] = { 'name' : 'new name!!!' }</p>
			<p>2. 배열 길이를 수정하는 경우 vm.items.length = 1</p>
			<br />
			<p>1번의 경우 Vue.set(vm.items, 인덱스번호, 새로운 값); 순으로 실행해야 합니다.</p>
			<p>2번의 경우 vm.items.splice(새로운 값)</p>
		</base-alert>

		<base-alert type="secondary">
			<h5>7. 필터링/정렬 된 결과 표시</h5>
			<p>원본 데이터를 변경하지 않고 배열의 필터링 된 버전이나, 정렬된 버전을 표시할 때 사용합니다.</p>
			<p>v-for="n in evenNumbers"로 짝수 넘버만 보여주도록 해볼게요</p>
			<ul>
				<li v-for="n in evenNumbers" v-bind:key="n.id">{{ n }}</li>
			</ul>
		</base-alert>

		<base-alert type="secondary">
			<h5>8. v-for 숫자 반복</h5>
			<p>v-for은 숫자를 반복하여 찍을 수 있습니다!!! v-for="n in 10"</p>
			<ul>
				<li v-for="n in 10" v-bind:key="n.id">{{ n }}</li>
			</ul>
		</base-alert>

		<base-alert type="secondary">
			<h5>9. v-for 템플릿!</h5>
			<p>template 태그를 사용하여 블럭을 렌더링 할 수 있습니다~~</p>

			<table class="table" style="width: 300px">
				<thead>
					<tr><th>번호</th><th>과일</th><th>수량</th></tr>
				</thead>
				<tbody v-for="tr in trs2" v-bind:key="tr.id">
					<template>
						<tr>
							<td>{{ tr.id }}</td>
							<td>{{ tr.fruit }}</td>
							<td>{{ tr.quantity }}</td>
						</tr>
					</template>
				</tbody>
			</table>
		</base-alert>

		<base-alert type="secondary">
			<h5>10. v-for과 v-if ?!</h5>
			<p>동시에 두가지가 있다면 "v-for"가 우선순위가 좀 더 높습니다!!</p>
			<p>즉 v-if는 루프가 반복 될 때마다 실행됩니다!</p>
		</base-alert>

		<base-alert type="secondary">
			<p>어떠한 속성을 바인드 하기 위해서는 문자열로 계산해야합니다.</p>
			<p>근데 매번 문자열로 계산하고 하는 일은 굉장히 빡치는 일이쥬?</p>
			<p>이럴때 뷰는 class와 style에 객체와 배열을 이용할 수 있습니다!! 스고이</p>
		</base-alert>

		<base-alert type="secondary">
			<h5>1. 객체 구문 (HTML)</h5>
			<p>클래스를 동적으로 toggle하기 위해 v-bind:class 에 객체를 전달할 수 있습니다</p>
			<div class="static" v-bind:class="{ 'text-success': successClass, 'text-danger' : errorClass}">
				이곳은 class toggle 테스트 영역입니다. 테스트로 success 클래스를 넣어봤어요<br />
				data: {
					successClass: true,
					errorClass: false
				}
			</div>
			<br />
			<div class="static" v-bind:class="classObject">
				이곳은 class toggle 테스트 영역입니다. 계산을 통해 나온 결과값으로도 설정이 가능합니다 (true, false 등)<br />
				data: {
					classObject: {
						'successClass': false,
						'errorClass' : true
					}
				}<br />
				테스트로 danger 클래스를 넣어봤어요<br />
				{{ errorMessage }}
			</div>
		</base-alert>

		<base-alert type="secondary">
			<h5>2. 배열 구문 (HTML)</h5>
			<p>배열 속성으로도 v-bind:class에 전달할 수 있어용</p>
			<div class="static" :class="[activeClass, errorClass]">
				<p>바로 이렇게용 :class="[activeClass, errorClass2]"</p>
			</div>
		</base-alert>

		<base-alert type="secondary">
			<h5>3. 객체 구문 (CSS)</h5>
			<p>v-bind:style 은 자바스크립트 구문을 인라인 형태로 쓰는거예요</p>
			<div class="mt10" v-bind:style="{ color: warningColor, fontSize: fontSize + 'px' }">
				여긴 색깔을 핫핑크로 지정하고 폰트 사이즈를 24px로 지정 해 볼거예요.
			</div>
		</base-alert>

		<base-alert type="secondary">
			<h5>4. 배열 구문 (CSS)</h5>
			<p>v-bind:style 에 여러 스타일의 배열을 사용이 가능해요</p>
			<div class="mt10" v-bind:style="[colorCss, sizeCss]">
				여긴 색깔을 흰색으로 지정하고 백그라운드 컬러를 까만색으로, 사이즈는 18px로 해볼게요.
			</div>
		</base-alert>

		<base-alert type="secondary">
			<h5>1. 이벤트 듣기(트리거)</h5>
			<p>v-on 디렉티브를 사용해서 DOM 이벤트를 듣고 트리거 될 때 자바스크립트를 실행 할 수 있죠!!</p>
			<div id="app61">
				<button class="btn btn-primary btn-xs" v-on:click="counter += 1">누를때마다 1씩 더하기!</button>
				<p>버튼을 누른 횟수는!? {{ counter }}번 입니다~~~!!!</p>
			</div>
		</base-alert>

		<base-alert type="secondary">
			<h5>2. 메소드 이벤트 핸들러</h5>
			<p>한줄로 간단히 해결되면 좋겠지만 보통 그렇지 않죠?! 그럴때 사용하는 메소드 호출!</p>
			<div id="app62">
				<button class="btn btn-primary btn-xs" v-on:click="whatsYourName">니이름이 뭐니?</button>
			</div>
		</base-alert>

		<base-alert type="secondary">
			<h5>3. 인라인 메소드 이벤트 핸들러</h5>
			<p>메소드 이름을 써도 되지만 메소드에 인자를 전달하는 등 구현해서 사용할 수 있어요. 대신 1줄짜리만!</p>
			<div id="app63">
				<button class="btn btn-primary btn-xs" v-on:click="sayHo(3)">Ho를 몇번 외칠건지?!</button>
			</div>
		</base-alert>

		<base-alert type="secondary">
			<h5>4. 이벤트 수식어</h5>
			<p>event.preventDefault() 또는 event.stopPropagation() 같은것은 매우 흔해요</p>
			<p>뭐..메소드 내에서 간단하게 처리 해 줘도 되겠지만 Vue에서 간단하게 제공해주니 참.편.하.겠.죠??</p>
			<ul>
				<li v-for="event in eventList" v-bind:key="event.id">{{event}}</li>
			</ul>
			<div>
				<a v-on:click.stop="doThis">클릭이벤트 전파 중단됨!</a>
				<form v-on:submit.prevent="onSubmit">Submit 이벤트가 페이지를 refresh 하는것을 방지</form>
				<a v-on:click.stop.prevent="doThat">수식어는 체이닝이 가능합니다. stop.prevent 이런식</a>
				<form v-on:submit.prevent>메소드 이름을 적지 않고 이벤트 수식어만도 사용할 수 있어요</form>
				<div v-on:click.capture="doThis">이벤트 리스너를 사용할때 캡처링 이용</div>
				<div v-on:click.self="doThat">이벤트 트리거가 자식이벤트까지 전달되지 않고 자신에게만 해당됩니다.</div>
			</div>
		</base-alert>

		<base-alert type="secondary">
			<h5>5. 키 수식어</h5>
			<p>이벤트가 발생될 때 key 를 확인해야 하는 경우가 있습니다. 그럴때 v-on:keyup 을 사용합니다</p>
			<div>
				<input class="form-control" v-on:keyup.enter="whatRUDoing" value="엔터키를 누를 때만 니가 뭐하는지 물어볼거임!" />
			</div>
			<ul>
				<li v-for="(event, idx) in eventList2" v-bind:key="event.id">{{idx}}. {{ event.name }} // {{ event.desc }}</li>
			</ul>
		</base-alert>

		<base-alert type="secondary">
			<h5>6. 시스템 수식어 키</h5>
			<p>시스템 키 이벤트 발생도 탐지할 수 있어요.</p>
			<p>※ .meta는 윈도우의 윈도우키, 맥의 command키 입니다~</p>
			<p>click 이벤트와 사용하면 시스템 키를 누르고 클릭을 하면 되지만!</p>
			<p>keyup을 사용한다면 단순히 시스템 키만 누른다고 되지않음! 어떤 시스템 키를 누른 채로 어떤 키를 눌러야함 ^^</p>
			<div>
				<input class="form-control" v-on:click.ctrl="whatRUDoing" value="컨트롤 키를 누를 때만 니가 뭐하는지 물어볼거임!" />
			</div>
			<ul id="app66-1">
				<li v-for="(event, idx) in eventList3" v-bind:key="event.id">{{idx}}. {{ event.name }}</li>
			</ul>
		</base-alert>

		<base-alert type="secondary">
			<h5>7. .exact 수식어와 마우스 버튼 수식어</h5>
			<p>.exact는 정확한 조합을 맞춰서 실행되도록 할 때 사용합니다.</p>
			<p>마우스  수식어는 .left, .right, .middle 이 있습니다~</p>
			<div>
				<button class="btn btn-primary" v-on:click.ctrl.exact="onCtrlClick">오직 컨트롤 키만 누르고 클릭했을 때 발생됩니다!</button>
			</div>
			<br />
			<div>
				<button class="btn btn-primary" v-on:click.exact="onClick">오직 어떠한 키도 눌리지 않고 마우스만 눌렀을 때 발생됩니다!</button>
			</div>
		</base-alert>

		<base-alert type="secondary">
			<h5>1. computed 기본 예제</h5>
			<p>템플릿 내에는 간단한 표현식 작성이 가능하지만 길어지는 경우 가독성도 떨어지고 유지보수가 어려워요</p>
			<p>간단하지 않는 로직을 사용해야 할 경우 computed 속성을 사용하도록 해요</p>
			<br />
			<div id="app21">
				<p>원본 메시지: {{ message5 }}</p>
				<p>역순 메시지: {{ reverseMessage }}</p>
				<p>함수를 사용한 역순 메시지: {{ reverseMessageFunction() }}</p>
			</div>
		</base-alert>

		<base-alert type="secondary">
			<h5>2. Computed와 Methods</h5>
			<p>Computed 속성은 종속 대상을 따라 저장(캐싱) 돼요.</p>
			<p style="font-weight: bold">이말은 즉, 대상 또는 값이 변경되지 않고 그대로인 경우 함수를 실행하지 않는다는 것을 뜻해요.</p>
			<p>여러번 요청 해도, 다시 계산하지 않고 예전에 계산된 결과를 보여준다는 것이죠.</p>
			<p style="font-weight: bold">반대로 Methods를 호출하면 호출 할 때마다 계속 함수를 실행해요</p>
			<p>여러번 요청 해도, 다시 계산하지 않고 예전에 계산된 결과를 보여준다는 것이죠.</p>
		</base-alert>

		<base-alert type="secondary">
			<h5>3. Computed의 Getter Setter</h5>

			<p>fullName의 getter와 setter를 지정할 수 있어요. fullName의 값을 변경하면 그에 따라 last, first도 바뀌어서 출력됩니다.</p>
			<div id="app23" class="mt10">
				제 이름은 {{ fullName }} 입니다~
			</div>
		</base-alert>

		<!-- <base-alert type="secondary">
			<h5>4. Watch의 속성</h5>
			<p>Watch는 쉽게말해, 어떤 감시할 데이터를 정하고 그 데이터의 값이 변할 때 특정 함수를 실행해라 라는 의미예요</p>
			<p>데이터가 비동기식 또는 시간이 많이 소요되는 작업을 할 때 유용해요</p>
			<div id="app24">
				<p>
					yes or no 질문을 물어보슈ㅎㅎ :
					<input class="form-control" v-model="question" />
				</p>
				<p>{{answer}}</p>
			</div>
		</base-alert> -->
	</base-header>
	
</div>
</template>
<script src="https://unpkg.com/axios@0.12.0/dist/axios.min.js"></script>
<script src="https://unpkg.com/lodash@4.13.1/lodash.min.js"></script>
<script>
export default {
	name: 'practice',
	data() {
		return {
			message1: 'hihi 안녕들하신가~',
			message2: '이 페이지는 ' + new Date() + '로드 되었소',
			seen: true,
			todos: [{
					content: 'Vue 배우기'
				},
				{
					content: 'ㅇㅈ하기'
				},
				{
					content: '좋은곳 가즈아...'
				}
			],
			message3: '이제부터 메시지를 뒤집어볼거예요',
			message4: '6. Input에다가 동일한 내용을 써볼게예요',
			message: '아따 이것이 그냥 string을 찍어분거여',
			rawHTML: '<span style="color: red">빨간색으로 나오는게 맞지요?!</span>',
			imageSrc: getImageSrcPath(),
			imageSizeStyle: {
				'width': '100px'
			},

			ok: false,
			wanttoshow: true, 
			randomNum: 60,
			loginType: 'userid',
			items: [
				{ id : 1, message : '안녕하슈 1' },
				{ id : 2, message : '안녕하슈 2' },
				{ id : 3, message : '안녕하슈 3' }
			],
			parentMessage: '부모 속성의 메시지유!',
			object: {
				myName: 'Son Jiyeon',
				myAge: 26,
				'여행좋아하는곳': 'Japan'
			},
			trs: [
				{ id : 11, name : '손지연', age : 26, sex : 'female' },
				{ id : 12, name : '송수호', age : 31, sex : 'male' },
				{ id : 13, name : '손정연', age : 24, sex : 'female' }
			],
			methods: [
				{ name : 'push()' },
				{ name : 'pop()' },
				{ name : 'shift()' },
				{ name : 'unshift()' },
				{ name : 'splice()' },
				{ name : 'sort()' },
				{ name : 'reverse()' }
			],
			methods2: [
				{ name : 'filter()' },
				{ name : 'contat()' },
				{ name : 'slice()' }
			],
			numbers: [1,2,3,4,5],
			trs2: [
				{ id : 31, fruit : '딸기', quantity : 26},
				{ id : 54, fruit : '청포도', quantity : 31},
				{ id : 76, fruit : '자몽', quantity : 24}
			],
			successClass: true,
			errorClass: false,
			isSuccess: false,
			errorMessage: 'Error 메시지 입니다!! 테스트로 만들어봤어요 ㅎㅎ',
			activeClass: 'active',
			errorClass2: 'text-danger',
			warningColor: '#ff00c8',
			fontSize: 24,
			colorCss: {
			color: '#fff',
			background: '#000'
			},
			sizeCss: {
				fontSize: String(3*6) + 'px'
			},
			counter: 0,
			name: '손지연',
			eventList: ['.stop', '.prevent', '.capture', '.self', '.once'],
			whatIAmDoing: '유튜부 봄!!',
			eventList2: [
				{name: '.enter', desc: ''},
				{name: '.tab', desc: ''},
				{name: '.delete', desc: 'delete와 backspace키 모두 캡쳐합니다'},
				{name: '.esc', desc: ''},
				{name: '.space', desc: ''},
				{name: '.up', desc: ''},
				{name: '.down', desc: ''},
				{name: '.left', desc: ''},
				{name: '.right', desc: ''}
			],
			eventList3: [
				{name: '.ctrl', desc: ''},
				{name: '.alt', desc: ''},
				{name: '.shift', desc: ''},
				{name: '.meta', desc: ''},
			],
			message5: '글자를 거꾸로 찍어봐요',
			firstName: 'Jiyeon',
			lastName: 'Son',
			question : '',
			answer: '질문 하기 전까지 대답하면 술래임 ㅋ'
		}
	},
	methods: {
		clickEventFunction: function() {
			alert('버튼 클릭!!');
		},
		reverseWords: function() {
			this.message3 = this.message3.split('').reverse().join('');
		},
		whatsYourName: function(event) {
			alert('내이름은 ' + this.name + '이예요~');

			// event는 네이티브 DOM 이벤트입니다
			if (event) {
				// 이벤트 (클릭이나 뭐 변형 등등)에 의해서 탐지되었다면
				alert(event.target.tagName + '에서 탐지되었습니당');
			}
		},
		sayHo: function(cnt) {
			for (var i = 0; i < cnt; i++) {
				alert((i+1) + '번째 Say Hoooooo!!');
			}
		},
		whatRUDoing: function() {
			alert('나는 지금 ' + this.whatIAmDoing);
		},
		onCtrlClick: function() {
			alert('당신은 지금 컨트롤 키만! 누르고있습니다. 다른 키는 안누름');
		},
		onClick: function() {
			alert('당신은 마우스 클릭 이벤트만 누르고있습니다!!');
		},
		reverseMessageFunction: function() {
			return this.message.split('').reverse().join('')
		},
		// getAnswer: _.debounce(
		// 	function() {
		// 		if (this.question.indexOf('?') === -1) {
		// 			this.answer = '질문을 할라면 물음표를 붙여야제'
		// 			return
		// 		}
		// 		this.answer = '생각중이여,,,쪼까 기다려';
		// 		var vm = this;
		// 		axios.get('https://yesno.wtf/api')
		// 			.then(function(response) {
		// 				vm.answer = _.capitalize(response.data.answer)
		// 			})
		// 			.catch(function (error) {
		// 				vm.answer = '오메 에러여! API 에러구먼' + error
		// 			})
		// 	},
		// 	// 사용자가 입력을 기다리는 시간 밀리세컨드 입니다
		// 	500
		// )
	},
	computed: {
		evenNumbers: function() {
			return this.numbers.filter(function (number) {
				return number % 2 === 0;
			});
		},
		classObject: function() {
			return {
				'text-success': this.isSuccess && !this.errorMessage,
				'text-danger': this.errorMessage
			}
		},
		reverseMessage: function() {
			return this.message.split('').reverse().join('')
		},
		fullName: {
			// fullname의 getter부분
			get: function() {
				return this.firstName + ' ' + this.lastName;
			},
			// fullname의 setter 부분
			set: function(name) {
				var names = name.split(' ');
				this.firstName = names[0];
				this.lastName = names[names.length - 1];
			}
		}
	},
	watch: {
		// 질문이 변경될 때마다 이 함수가 실행됩니다
		question: function(newQ) {
			this.answer = '아따 빨리 말하랑께'
			this.getAnswer()
		}
	}
}

function getImageSrcPath() {
	return 'http://cfile239.uf.daum.net/image/998901475A781C593E04EF';
}
</script>
<style>
p {
	font-size: 13px;
}
</style>
