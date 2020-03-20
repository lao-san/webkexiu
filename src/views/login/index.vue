<template>
  <div class="ll-container">
    <el-card>
      <div class="header fz_20 text-center">科袖会议报名系统</div>
      <el-tabs v-model="activeName" stretch>
        <el-tab-pane label="密码登录" name="password_login">
          <user-login></user-login>
        </el-tab-pane>
        <el-tab-pane label="立即注册">
          <!-- 注册 -->
          <user-register></user-register>
        </el-tab-pane>
      </el-tabs>
      <!-- <el-link class="right">忘记密码?</el-link> -->
    </el-card>
  </div>
</template>

<script>
import userLogin from "../../components/componets-login/user-login";
import userRegister from "../../components/componets-login/user-register";

export default {
  name: "login",
  data() {
    return {
      activeName: "password_login" // tab默认选择第一项
    };
  },
  methods: {
    countdown() {
      setTimeout(function() {}, 600);

      this.countdown_text;
    },
  },
  components: {
    userLogin,
    userRegister
  }
};
</script>

<style scoped lang=scss>
.ll-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: skyblue;
  .el-card {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 420px;
    padding: 10px 0px;
    transform: translate(-50%, -50%);
    .header {
      margin-bottom: 20px;
    }
  }
}
</style>