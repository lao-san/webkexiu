<template>
  <div>
    <el-form ref="form_register" :model="form_register" :rules="rules" style="margin-top:30px">
      <!-- 注册 -->
      <el-form-item prop="name">
        <el-input v-model="form_register.name" placeholder="请输入真实姓名"></el-input>
      </el-form-item>
      <el-form-item prop="user">
        <el-input v-model="form_register.user" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="position">
        <el-input v-model="form_register.position" placeholder="请输您的职位"></el-input>
      </el-form-item>
      <el-form-item prop="job_unit">
        <el-input v-model="form_register.job_unit" placeholder="请输入您的工作单位"></el-input>
      </el-form-item>
      <el-form-item prop="psw">
        <el-input v-model="form_register.psw" placeholder="请设置密码" type="password"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="form_register.code" placeholder="请输入验证码" style="width:60%"></el-input>
        <el-button
          class="right"
          type="primary"
          @click="setCode()"
          :disabled="code_disabled"
        >{{code_text}}</el-button>
      </el-form-item>

      <el-form-item>
        <el-checkbox v-model="Agreement">我已阅读并同意</el-checkbox>
        <el-link :underline="false" type="info" href="http://www.ekexiu.com/privacy.html">《科袖用户协议》</el-link>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          style="width:100%"
          :disabled="this.form_register.name&&this.form_register.user&&this.form_register.code&&this.form_register.psw&&this.Agreement!=''?false:true"
        >注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    let change_string = (rule, value, callback) => {
      if (value !== "") {
        let reg = /^[\u4e00-\u9fa5]+$/;
        if (!reg.test(value)) {
          callback(new Error("请输入中文"));
        }
      }
    };
    let change_tel = (rule, value, callback) => {
      if (value !== "") {
        let reg = /^1[3456789]\d{9}$/;
        if (!reg.test(value)) {
          callback(new Error("请输入正确的手机号码"));
        }
      }
    };

    return {
      Agreement: true, //协议多选框
      time: 60, //倒计时
      timer: null,
      code_disabled: false,
      code_text: "获取验证码",
      form_register: {
        //注册表单数据
        name: "",
        user: "",
        code: "",
        psw: "",
        position: "",
        job_unit: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { validator: change_string, trigger: "blur" }
        ],
        user: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: change_tel, trigger: "blur" }
        ],
        position: [
          { required: true, message: "请输入职位", trigger: "blur" },
          { validator: change_string, trigger: "blur" }
        ],
        job_unit: [
          { required: true, message: "请输入工作单位", trigger: "blur" },
          { validator: change_string, trigger: "blur" }
        ],
        psw: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  methods: {
    setCode() {
      this.timer = setInterval(() => {
        this.setTime();
      }, 1000);
    },
    setTime() {
      this.code_text = this.time + "秒后重新获取";
      this.time--;
      this.code_disabled = true;
      if (0 > this.time) {
        this.timer = window.clearInterval(this.timer);
        this.time = 60;
        this.code_text = "重新获取验证码";
        this.code_disabled = false;
      }
    }
  }
};
</script>

<style scoped lang=scss>
</style>