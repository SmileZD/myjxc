<template>
    <el-row class="row-bg" justify="center" type="flex">
        <el-col :lg="7" :xl="6">
            <div class="login-form">
                <h2>进销存</h2>
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
                    <el-input v-model="loginForm.app_id"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="code" style="width: 380px;">
                    <el-input v-model="loginForm.code" maxlength="5" style="width: 172px; float: left;"></el-input>
                    <el-image :src="captchaImg" class="captchaImg" @click="getCaptcha"></el-image>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>
<script>
import qs from 'qs'
export default {
    name: "Login",
    data() {
        return {
            loginForm: {
                username: 'admin',
                password: 'markerhub',
                code: '1111',
                app_id: 0,
                token: '',
            },
            rules: {
                username: [
                    {required: true, message: '请输入用户名', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'}
                ],
                app_id: [
                    {required: true, message: '请选址店铺', trigger: 'blur'}
                ],
                code: [
                    {required: true, message: '请输入验证码', trigger: 'blur'},
                    {min: 4, max: 4, message: '验证码为4个字符', trigger: 'blur'}
                ],
            },
            captchaImg: ''
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.post('/login?' + qs.stringify(this.loginForm)).then(res => {
                        console.log(res.data)
                        const jwt = res.headers['authorization']
                        this.$store.commit("SET_TOKEN", jwt)
                        this.$router.push("/index")
                    }).catch(error => {
                        this.getCaptcha();
                        console.log('error submit!!');
                    })
                } else {
                    this.getCaptcha();
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        getCaptcha() {
            // this.$axios.get('/captcha').then(res => {
            //     this.loginForm.token = res.data.data.token
            //     this.captchaImg = res.data.data.captchaImg
            // })
        }
    },
    created() {
        this.getCaptcha()
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

.el-divider {
    height: 200px;
}

.captchaImg {
    float: left;
    margin-left: 8px;
    border-radius: 4px;
}
</style>