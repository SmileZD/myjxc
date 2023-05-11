<template>
    <el-row class="row-bg" justify="center" type="flex">
        <el-col :lg="7" :xl="6">
            <div class="login-form">
                <h2>进销存</h2>
                <h3>v1.0.0</h3>
            </div>
        </el-col>
        <el-col :span="1">
            <el-divider direction="vertical"></el-divider>
        </el-col>
        <el-col :lg="7" :xl="6">
            <el-form ref="loginForm" :model="loginForm" :rules="rules" label-position="right" label-width="80px">
                <el-form-item label="用户名" prop="username" style="width: 380px;">
                    <el-input v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" style="width: 380px;">
                    <el-input v-model="loginForm.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="店铺" prop="app_id" style="width: 380px;">
                    <el-select v-model="loginForm.app_id" placeholder="请选择店铺" style="width: 100%;">
                        <el-option v-for="store in storeList" :key="store.value" :label="store.text"
                                   :value="store.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>
<script>

export default {
    name: "Login",
    data() {
        return {
            storeList: [
                {value: 1, text: '中央商场'}
            ],
            loginForm: {
                username: 'admin',
                password: '123456',
                app_id: '',
            },
            rules: {
                username: [
                    {required: true, message: '请输入用户名', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'}
                ],
                app_id: [
                    {required: true, message: '请选择店铺', trigger: 'blur'}
                ]
            },
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (!valid) {
                    return false
                }
                this.$axios.post('/user/login', this.loginForm).then(res => {
                    localStorage.setItem("zdjxctoken", res.token)
                    localStorage.setItem("zdjxcuserinfo", JSON.stringify(res))
                    this.$router.push("/")
                }).catch(() => {
                })
            });
        }
    },
    created() {
        this.$axios.get('/app/getList').then(res => {
            this.storeList = res
        })
    }
}
</script>

<style scoped>
.el-col {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-align: center;
}

.el-row {
    height: 100%;
    background-color: #fafafa;
}
</style>