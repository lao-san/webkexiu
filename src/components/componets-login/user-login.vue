<template>
  <el-form ref="form" :model="form" :rules="rules" style="margin-top:30px">
    <!-- 登录 -->
    <el-form-item prop="username">
      <el-input v-model="form.username" placeholder="请输入手机"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="form.password" placeholder="请输密码" type="password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        style="width:100%"
        :disabled="this.form.username&&this.form.password!=''?false:true"
        @click="getLoginUser"
      >登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "userLogin",
  data() {
    let changeUser_name = (rule, value, callback) => {
      if (value !== "") {
        let reg = /^1[3456789]\d{9}$/;
        if (!reg.test(value)) {
          callback(new Error("请输入正确的手机号码"));
        }
      }
    };
    return {
      form: {
        //用户登录
        username: "", //用户名
        password: "" //密码
      },
      rules: {
        username: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: changeUser_name, trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    getLoginUser() {
      this.$http.post("/app/login", this.form, res => {
        if (res && res.code === 0) {
          window.sessionStorage.setItem("token", res.token);
          this.$router.push({ path: "/" });
        }
      });
    }
  }
};
</script>

<style scoped lang=scss>
</style>