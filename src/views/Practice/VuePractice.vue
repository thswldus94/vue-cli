<template>
<div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
        <base-alert type="secondary">
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
    </base-header>
</div>
</template>

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
            }
        }
    },
    methods: {
        clickEventFunction: function() {
            alert('버튼 클릭!!');
        },
        reverseWords: function() {
            this.message3 = this.message3.split('').reverse().join('');
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
