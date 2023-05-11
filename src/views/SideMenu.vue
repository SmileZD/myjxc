<template>
    <el-menu
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
    >
        <router-link to="/index">
            <el-menu-item index="Index">
                <template>
                    <i class="el-icon-s-home"></i>
                    <span slot="title">首页</span>
                </template>
            </el-menu-item>
        </router-link>
    </el-menu>
</template>

<script >
export default {
    name: "SideMenu",
    data() {
        return{

        }
    }
}

</script>


<style scoped>
.el-menu-vertical-demo {
    height: 100%;
}
a{
    text-decoration:none;
}
</style>