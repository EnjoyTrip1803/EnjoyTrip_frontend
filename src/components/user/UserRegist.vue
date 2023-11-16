<script setup>
import { ref } from 'vue';

const userInfo = ref({
    userId: '',
    userName: '',
    userPassword: '',
    emailId: '',
    emailDomain: ''
});

const idCheck = ref(false);
const checkPassword = ref('');
const massage = ref('');

const onIdCheck = () => {
    if (userInfo.userId !== 'ssafy') idCheck.value = true;
}

const onRegist = () => {
    console.log(userInfo.value.userPassword)
    console.log(checkPassword.value)
    if (userInfo.value.userId === '' || !idCheck.value) massage.value = 'Id를 확인해주세요.';
    else if (userInfo.value.userName === '') massage.value = 'Name을 확인해주세요.';
    else if (userInfo.value.userPassword === '' || checkPassword.value === '' || userInfo.value.userPassword !== checkPassword.value) massage.value = 'Password를 확인해주세요.';
    else if (userInfo.value.emailId === '' || userInfo.value.emailDomain === '') massage.value = 'Email을 확인해주세요.';
    else {
        massage.value = '';
        // 회원가입 api 통신하기
    }
}

</script>

<template>
    <section class="h-100">
        <div class="container h-100">
            <div class="row justify-content-sm-center h-100">
                <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                    <div class="text-center my-5">
                    </div>
                    <div class="card shadow-lg">
                        <div class="card-body p-5">
                            <h1 class="fs-4 card-title fw-bold mb-4">회원가입</h1>
                            <form>
                                <div class="mb-3">
                                    <label class="mb-2 text-muted" for="userId">Id</label>
                                    <input id="userId" type="id" class="form-control" name="userId"
                                        v-model="userInfo.userId" required autofocus>
                                    <button class="btn btn-primary ms-auto" @click="onIdCheck">
                                        아이디 확인
                                    </button>
                                </div>
                                <div class="mb-3">
                                    <div class="mb-2 w-100">
                                        <label class="text-muted" for="userName">Name</label>
                                        <input id="userName" type="text" class="form-control" name="userName"
                                            v-model="userInfo.userName" required>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <div class="mb-2 w-100">
                                        <label class="text-muted" for="userPassword">Password</label>
                                        <input id="userPassword" type="password" class="form-control" name="userPassword"
                                            v-model="userInfo.userPassword" required>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <div class="mb-2 w-100">
                                        <label class="text-muted" for="checkPassword">Password 확인</label>
                                        <input id="checkPassword" type="password" class="form-control" name="checkPassword"
                                            v-model="checkPassword" required>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <div class="mb-2 w-100">
                                        <input id="email" name="email" type="text" class="form-control w-45"
                                            placeholder="이메일아이디..." v-model="userInfo.emailId" required>
                                        <span class="input-group-text">@</span>
                                        <select class="form-select" name="domain" id="domain" v-model="userInfo.emailDomain"
                                            required>
                                            <option value="">선택</option>
                                            <option value="naver.com">naver.com</option>
                                            <option value="google.com">google.com</option>
                                            <option value="hanmail.net">hanmail.net</option>
                                            <option value="nate.com">nate.com</option>
                                            <option value="kakao.com">kakao.com</option>
                                        </select>

                                    </div>
                                </div>

                                <div class="mb-3">
                                    <div class="mb-2 w-100 text-danger">
                                        {{ massage }}
                                    </div>
                                </div>

                                <div class="d-flex align-items-center">
                                    <div class="form-check">
                                    </div>
                                    <button class="btn btn-primary ms-auto" @click="onRegist">
                                        회원가입
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div class="card-footer py-3 border-0">
                            <div class="text-center">
                                계정이 있으신가요?
                                <router-link :to="{ name: 'login' }">로그인</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped></style>