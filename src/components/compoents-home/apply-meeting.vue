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
            <tr>
              <td>
                <el-radio-group v-model="form.ticket">
                  <el-radio label="普通票"></el-radio>
                </el-radio-group>
              </td>
              <td>3000</td>
            </tr>
            <tr>
              <td>
                <el-radio-group v-model="form.ticket">
                  <el-radio label="学生票">学生票</el-radio>
                </el-radio-group>
              </td>
              <td>1600</td>
            </tr>
          </table>
        </el-form-item>
        <el-form-item style="display:inline-block">
          <el-checkbox-group v-model="form.invoice">
            <el-checkbox @click.native="no">我需要发票</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item prop="invoice1" v-if="this.form.invoice!=''">
          <el-radio-group v-model="form.invoice1" style="margin-left:30px;">
            <el-radio label="普票" @click.native="handClick"></el-radio>
            <el-radio label="专票"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="发票抬头:" prop="invoice_rise">
          <el-input placeholder="请输入发票抬头" style="width:400px" v-model="form.invoice_rise"></el-input>
        </el-form-item>
        <el-form-item label="企业税号:" prop="taxation_number">
          <el-input placeholder="请输入企业税号" style="width:400px" v-model="form.taxation_number"></el-input>
        </el-form-item>
        <el-form-item label="邮寄地址:" prop="address">
          <el-input placeholder="请输入详细邮寄地址" style="width:400px" v-model="form.address"></el-input>
        </el-form-item>
        <div v-if="this.form.invoice1==='专票'">
          <el-form-item label="开户行地址电话:" prop="tel">
            <el-input placeholder="开户行地址电话" style="width:400px" v-model="form.tel"></el-input>
          </el-form-item>
          <el-form-item label="开户行及账号:" prop="account_number">
            <el-input placeholder="开户行及账号" style="width:400px" v-model="form.account_number"></el-input>
          </el-form-item>
        </div>

        <el-form-item>
          <el-checkbox-group v-model="form.hotl">
            <el-checkbox>我需要预定酒店（工作人员会与您联系确认具体信息，请保持工作时间的电话通畅）</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-checkbox-group v-model="form.taxi">
            <el-checkbox>我需要接送服务（工作人员会与您联系确认具体信息，请保持工作时间的电话通畅）</el-checkbox>
          </el-checkbox-group>
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
            <el-table-column property="invoice1" label="注册类型"></el-table-column>
            <el-table-column property="money" label="应付金额（单位：元）"></el-table-column>
          </el-table>
        </div>
        <div class="order">
          <ul>
            <li>姓名:{{order.name}}</li>
            <li>电话:{{order.tel}}</li>
            <li>邮箱:{{order.emal}}</li>
            <li>职称:{{order.zhicheng}}</li>
            <li>职位:{{order.zhiwei}}</li>
            <li>机构:{{order.jigou}}</li>
            <li>订单编号:{{order.code}}</li>
            <li>发票抬头:{{order.taitou}}</li>
            <li>企业税号:{{order.shuihao}}</li>
            <li>邮寄地址:{{order.dizhi}}</li>
          </ul>
        </div>
        <div class="transfer">
          <h3 class="fz_16">对公汇款</h3>
          <div class="details">
            <ul>
              <li>账户名称:中国腐蚀与防护学会</li>
              <li>开户银行:中国工商银行北京东升路支行</li>
              <li>银行账号: 0200006209089135234</li>
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
    // let change_tel = (rule, value, callback) => {
    //   if (value !== "") {
    //     let reg = /^1[3456789]\d{9}$/;
    //     if (!reg.test(value)) {
    //       callback(new Error("请输入正确的手机号码"));
    //     }
    //   }
    // };
    // let change_account_number = (rule, value, callback) => {
    //   if (value !== "") {
    //     let reg = /^[0-9a-zA-Z]+$/;
    //     if (!reg.test(value)) {
    //       callback(new Error("请输入正确的账号"));
    //     }
    //   }
    // };

    return {
      form: {
        ticket: "普通票",
        invoice: true,
        invoice1: "专票",
        invoice_rise: "",
        taxation_number: "",
        address: "",
        tel: "",
        account_number: "",
        hotl: true,
        taxi: true
      },
      gridData: [
        {
          invoice1: "普通票",
          money: "3000"
        }
      ],
      order: {
        code: "G12518113",
        name: "王小虎",
        tel: 13800138000,
        emal: "ekexiu@ekexiu.com",
        zhicheng: "教授",
        zhiwei: "院长",
        jigou: "北京科技大学新材料研究院",
        taitou: "个人/单位,北京科袖有限公司",
        shuihao: "xxxxxxxxxx",
        dizhi: "北京"
      },
      centerDialogVisible: false,
      rules: {
        invoice_rise: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ],
        taxation_number: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ],
        address: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        tel: [
          { required: true, message: "内容不能为空", trigger: "blur" }
          // { validator: change_tel, trigger: "blur" }
        ],
        account_number: [
          { required: true, message: "内容不能为空", trigger: "blur" }
          // { validator: change_account_number, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    open() {
      this.$message({
        message: "申请入会成功",
        type: "success"
      });
      this.centerDialogVisible = false;
    },
    handClick() {
      this.form.tel = "";
      window.console.log();
      this.form.account_number = "";
    },
    no() {
      let bol = this.form.invoice;
      if (bol) {
        this.form.invoice1 = "";
      } else {
        this.form.invoice1 = "普票";
      }
    },
    submitForm(form) {
      this.$refs[form].validate(valid => {
        window.console.log(valid);
        if (valid) {
          this.centerDialogVisible = true;
        } else {
          window.console.log(2);
          return false;
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