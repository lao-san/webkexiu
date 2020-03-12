<template>
  <el-form ref="form" :model="form" :rules="rules" style="margin-top:30px">
    <!-- 登录 -->
    <el-form-item prop="user_name">
      <el-input v-model="form.user_name" placeholder="请输入手机"></el-input>
    </el-form-item>
    <el-form-item prop="user_pwd">
      <el-input v-model="form.user_pwd" placeholder="请输密码"  type="password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        style="width:100%"
        :disabled="this.form.user_name&&this.form.user_pwd!=''?false:true"
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
        user_name: "", //用户名
        user_pwd: "" //密码
      },
      rules: {
        user_name: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: changeUser_name, trigger: "blur" }
        ],
        user_pwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {}
};
</script>

<style scoped lang=scss>
</style>