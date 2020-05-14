<template>
  <div class="meeting_brief right" style="height:1032px">
    <h3 class="fz_20">会议报名</h3>
    <div style="padding:30px">
      <p style="font-weight:700;line-height:30px;">请选择报名类型</p>
      <el-form
        ref="form"
        :model="form"
        label-width="150px"
        :rules="rules"
        reg="form"
        class="demo-dynamic"
      >
        <el-form-item prop="ticket">
          <table border="1px">
            <tr>
              <th>注册类型</th>
              <th>单价金额（单位：元）</th>
            </tr>
            <tr v-for="(item,index) in meetingList" :key="item.id">
              <td style="text-align:left">
                <el-radio
                  :label="index"
                  v-model="form.feeId"
                  @change="change(item)"
                  style="margin-left:30px"
                >{{item.name}}</el-radio>
              </td>
              <td>{{item.money}}</td>
            </tr>
          </table>
        </el-form-item>
        <el-form-item style="display:inline-block">
          <el-checkbox-group v-model="invoice">
            <el-checkbox @click.native="no">我需要发票</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item prop="invoice1" v-if="this.invoice!=''">
          <el-radio :label="0" @click.native="handClick" v-model="form.taxType">普票</el-radio>
          <el-radio :label="1" v-model="form.taxType">专票</el-radio>
        </el-form-item>
        <el-form-item label="发票抬头:" prop="taxTitle">
          <el-input placeholder="请输入发票抬头" style="width:400px" v-model="form.taxTitle "></el-input>
        </el-form-item>
        <el-form-item label="企业税号:" prop="taxNumber">
          <el-input placeholder="请输入企业税号" style="width:400px" v-model="form.taxNumber "></el-input>
        </el-form-item>
        <el-form-item label="邮寄地址:" prop="taxAddress">
          <el-input placeholder="请输入详细邮寄地址" style="width:400px" v-model="form.taxAddress "></el-input>
        </el-form-item>
        <div v-if="this.form.taxType===1">
          <el-form-item label="开户行地址电话:" prop="addPhone">
            <el-input placeholder="开户行地址电话" style="width:400px" v-model="form.addPhone"></el-input>
          </el-form-item>
          <el-form-item label="开户行及账号:" prop="bankAddrAccount">
            <el-input placeholder="开户行及账号" style="width:400px" v-model="form.bankAddrAccount "></el-input>
          </el-form-item>
        </div>

        <el-form-item>
          <el-checkbox
            v-model="form.room"
            true-label="1"
            false-label="0"
          >我需要预定酒店（工作人员会与您联系确认具体信息，请保持工作时间的电话通畅）</el-checkbox>
          <el-link href="http://www.baidu.com" style="color:red">点击申请酒店</el-link>
        </el-form-item>
        <el-form-item>
          <el-checkbox
            v-model="form.taxi"
            true-label="1"
            false-label="0"
          >我需要接送服务（工作人员会与您联系确认具体信息，请保持工作时间的电话通畅）</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="width:200px;margin-left:28px;"
            @click="
            submitForm('form')"
          >提 交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="danger">
      <p class="fz_20">报名流程</p>
      <p>1、选择注册类型并填写信息；</p>
      <p>2、提交并支付，我们将会尽快与您确认参会信息。</p>
      <p>3、团队报名请联系工作人员（工作人员会与您联系确认具体信息，请保持工作时间的电话通畅）</p>
    </div>
    <div>
      <el-dialog title="请确认订单信息" :visible.sync="centerDialogVisible" width="40%">
        <div>
          <el-table :data="gridData">
            <el-table-column property="name" label="注册类型"></el-table-column>
            <el-table-column property="money" label="应付金额（单位：元）"></el-table-column>
          </el-table>
        </div>
        <div class="order">
          <ul>
            <li v-show="order.truename">姓名:{{order.truename}}</li>
            <li v-show="order.phone">电话:{{order.phone}}</li>
            <li v-show="order.email">邮箱:{{order.email}}</li>
            <li v-show="order.jobTitle">职称:{{order.jobTitle}}</li>
            <li v-show="order.position">职位:{{order.position}}</li>
            <li v-show="order.organization">机构:{{order.organization}}</li>
            <!-- <li>订单编号:{{order.code}}</li> -->
            <li v-show="form.taxTitle">发票抬头:{{form.taxTitle}}</li>
            <li v-show="form.taxNumber">企业税号:{{form.taxNumber}}</li>
            <li v-show="form.taxAddress">邮寄地址:{{form.taxAddress}}</li>
          </ul>
        </div>
        <div class="transfer">
          <h3 class="fz_16">对公汇款</h3>
          <div class="details">
            <ul>
              <li>账户名称:{{this.accountinfoList.name}}</li>
              <li>开户银行:{{this.accountinfoList.bank}}</li>
              <li>银行账号: {{this.accountinfoList.account}}</li>
            </ul>
          </div>
        </div>
        <div class="transfer">
          <h3 class="fz_16" style="color:red">注意事项</h3>
          <div class="details">
            <ul>
              <li>1.汇款时请务必在汇款留言中注明会议名称、参会人员姓名、单位、联系电话。</li>
              <li>2.汇款后请务必将转帐汇款信息或回执扫描件通过电子邮件发送至 （此处显示联系邮箱） 以便对帐。</li>
            </ul>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">返回修改</el-button>
          <el-button type="primary" :plain="true" @click="open">确定提交</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "applyMeeting",
  data() {
    return {
      invoice: true,
      form: {
        feeId: 0,
        taxType: 0,
        taxTitle: "",
        taxNumber: "",
        taxAddress: "",
        addPhone: "",
        bankAddrAccount: "",
        room: "1",
        taxi: 1,
        meetingId: 1
      },
      gridData: [],
      order: {},
      meetingList: [], //会议类型列表
      accountinfoList: {},
      centerDialogVisible: false,
      rules: {
        taxTitle: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ],
        taxNumber: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ],
        taxAddress: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ],
        addPhone: [
          { required: true, message: "内容不能为空", trigger: "blur" }
          // { validator: change_tel, trigger: "blur" }
        ],
        bankAddrAccount: [
          { required: true, message: "内容不能为空", trigger: "blur" }
          // { validator: change_account_number, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getUser();
    this.getList();
    this.getAccountinfo();
  },
  methods: {
    open() {
      this.form.mid = window.sessionStorage.getItem("meetingId");
      // window.console.log(this.form);
      if (this.order.truename && this.order.position) {
        this.$http.post("/app/order/save", this.form, res => {
          if (res && res.code === 0) {
            this.$message({
              message: "申请入会成功",
              type: "success"
            });
          } else {
            return window.console.log(res);
          }
        });
      } else {
        this.$message({
          message: "请返回首页,进入个人中心 补充个人信息",
          type: "error"
        });
      }

      this.centerDialogVisible = false;
    },
    handClick() {
      this.form.bankAddrAccount = "";
      this.form.addPhone = "";
    },
    no() {
      let bol = this.invoice;
      if (bol) {
        this.form.taxType = "";
      }
    },
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.centerDialogVisible = true;
        } else {
          return false;
        }
      });
    },
    //获取个人信息
    getUser() {
      this.$http.get("/app/user/info", {}, res => {
        if (res && res.msg == "success") {
          this.order = res.user;
        }
      });
    },
    // 获取类型列表
    getList() {
      this.$http.get(`/app/typesoffee/list/${this.baseMeetintgId}`, {}, res => {
        if (res && res.msg == "success") {
          this.meetingList = res.feeList;
          this.gridData.push(res.feeList[0]);
        }
      });
    },
    change(data) {
      this.gridData.length = 0;
      this.gridData.push(data);
    },
    //获取对公账号信息
    getAccountinfo() {
      this.$http.get(`/app/meeting/accountinfo/${this.baseMeetintgId}`, {}, res => {
        window.console.log(res);
        if (res && res.code === 0) {
          this.accountinfoList = res.moneyAccount;
        } else {
          window.console.log(res);
        }
      });
    }
  }
};
</script>

<style scoped lang=scss>
.meeting_brief {
  position: relative;
  .el-form {
    table {
      border: 1px solid #ccc;

      th {
        width: 200px;
        text-align: center;
        box-sizing: border-box;
      }
      td {
        text-align: center;
        box-sizing: border-box;
      }
    }
  }
  .danger {
    position: absolute;
    top: 0;
    right: 0;
    width: 240px;
    height: 300px;
    padding: 10px;
    box-sizing: border-box;
    p {
      line-height: 40px;
    }
  }
  .order {
    height: 300px;
    margin-top: 10px;
    /* border: 1px solid red; */
    li {
      line-height: 10px;
      box-sizing: border-box;
      padding: 10px;
    }
  }
  .transfer {
    margin-top: 30px;
    height: 100px;
    width: 100%;
    box-sizing: border-box;
    .details {
      /* margin: 0px auto; */
      padding: 10px;
      li {
        line-height: 30px;
      }
    }
  }
}
</style>