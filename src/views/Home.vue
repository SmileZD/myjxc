<template>
    <el-container>
        <el-aside width="120px">

            <SideMenu></SideMenu>

        </el-aside>
        <el-container>
            <el-header style="height: 40px">
                <strong>进销存</strong>
                <div class="header-avatar">
                    <el-dropdown>
                        <span class="el-dropdown-link">{{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                        <el-dropdown-menu>
                            <el-dropdown-item>
                                <router-link :to="{name: 'UserCenter'}">个人中心</router-link>
                            </el-dropdown-item>
                            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>
            <el-main>
                <div style="margin: 0 15px;">
                    <router-view/>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import SideMenu from "@/views/SideMenu";
export default {
    name: "Home",
    components: {
        SideMenu,
    },
    data() {
        return {
            userInfo: {
                id: "",
                username: "",
                avatar: ""
            }
        }
    },
    created() {
        if (!localStorage.getItem("zdjxctoken")) {
            this.$router.push("/login")
        }
        this.getUserInfo()
    },
    methods: {
        getUserInfo() {
            try {
                this.userInfo = JSON.parse(localStorage.getItem('zdjxcuserinfo'))
            }catch (e) {
                this.$router.push("/login")
            }
        },
        logout() {
            localStorage.clear()
            this.$router.push("/login")
        }
    }
}
</script>

<style scoped>
.el-container {
    padding: 0;
    margin: 0;
    height: 100%;
}

.header-avatar {
    float: right;
    width: 90px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.el-dropdown-link {
    cursor: pointer;
}

.el-header {
    height: 40px;
    background-color: #adcdff;
    color: #333;
    text-align: center;
    line-height: 40px;
}

.el-aside {
    background-color: #D3DCE6;
    color: #333;
    line-height: 40px;
}

.el-main {
    color: #333;
    padding: 0;
}

a {
    text-decoration: none;
}
</style>