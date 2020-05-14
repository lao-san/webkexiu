<template>
  <el-form ref="form" :model="form" :rules="rules" style="margin-top:30px">
    <!-- 登录 -->
    <el-form-item prop="username">
      <el-input v-model="form.username" placeholder="请输入手机"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="form.password" placeholder="请输新密码" type="password"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="form.password" placeholder="请重新输入新密码" type="password"></el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-input v-model="form.password" placeholder="请输入验证码" style="width:220px"></el-input>
      <el-button style="width:150px;float:right" :disabled="flag" @click.native="getCode">{{codeText}}</el-button>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        style="width:100%"
        :disabled="this.form.username&&this.form.password!=''?false:true"
        @click="getLoginUser"
      >提交</el-button>
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
      flag: false,
      codeText: "免费获取验证码",
      form: {
        //用户登录
        username: "", //用户名
        password: "", //密码
        code: ""
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
    },
    // 验证码定时器
    getCode() {
      let num = 60;
      let timer = setInterval(() => {
        this.flag = true;
        this.codeText = num + "秒后再次获取";
        num--;
        if (num === 0) {
          window.clearInterval(timer);
          num = 60;
          this.codeText = "重新获取验证码";
          this.flag = false;
        }
      }, 1000);
    }
  }
};
</script>

<style scoped lang=scss>
</style>