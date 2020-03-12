<template>
  <el-container class>
    <el-header class="wrap" height="90px">
      <div class="left" style="padding:10px 0px">
        <h1 class="fz_45" style="font-weight:700">科袖会议</h1>
        <p style="letter-spacing:2px">科袖会议,致力于最专业的会议集成系统</p>
      </div>
      <div class="right" style="padding:10px 0px;">
        <div>
          <el-dropdown class="right">
            <span class="el-dropdown-link">{{username}}</span>
            <el-dropdown-menu slot="dropdown">
              <router-link to="/pcenter">
                <el-dropdown-item>个人中心</el-dropdown-item>
              </router-link>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div>
          <ul class="nav">
            <router-link to="/">
              <li v-for="(item,index) of this.nav_arr" :key="index">
                <a
                  href="javascript:"
                  @click="handClick(index)"
                  :class="active==index?'actve_nav':'actve_white' "
                >{{item}}</a>
              </li>
            </router-link>
          </ul>
        </div>
      </div>
    </el-header>

    <el-main class="wrap">
      <div class="main_content mt_10">
        <div class="sidebar left">
          <div class="meeting_intention meeting_box">
            <div class="meeting_title fz_25 fc_white text-center">参会意向</div>
            <div class="meeting_main">
              <p class="fz_18 fc_blue">尊敬的会员:</p>
              <p class="fz_18 fc_blue">我们诚挚的邀请您参加本次会议!</p>
              <div class="text-center">
                <a
                  href="javascript:"
                  style="line-height:180px;"
                  class="apply_meeting fz_18 fc_white"
                  @click="config"
                >申请参会</a>
              </div>
              <div class="right">
                <router-link to="/login">
                  <el-link style="margin-right:10px;color:rgb(51, 103, 149)">免费注册</el-link>
                </router-link>
                <router-link to="/login">
                  <el-link style="color:rgb(61, 167, 180)">立即登录</el-link>
                </router-link>
              </div>
            </div>
          </div>
          <div class="meeting_tips meeting_box">
            <div class="meeting_title fz_25 fc_white text-center">会议提示</div>
            <div class="meeting_main">
              <div class="text-center" style="line-height:30px;margin-top:20px">
                <p class="fc_blue">征文投稿截止日期</p>
                <p>2020年12月12日</p>
                <p class="fc_blue">网上注册截止日期</p>
                <p>2020年12月12日</p>
                <p class="fc_blue">现场报名时间</p>
                <p>2020年12月12日</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 主题内容容器 -->
        <apply-meeting v-if="this.active ==4"></apply-meeting>
        <div class="meeting_brief right" v-else>
          <p class="fz_18 content_wrap">个人信息</p>
          <div class="bg_line" style="height:20px;"></div>
          <div class="content_wrap">
            <p class="text-center">请务必提交真实信息，现场凭二维码或本人身份证件可领取胸卡。提供虚假信息者，主办方有权拒绝入场。</p>
            <div class="form_person" style>
              <div>
                <ul>
                  <li>姓名: {{person.name}}</li>
                  <li>手机:{{person.tel}}</li>
                  <li>邮箱:{{person.emal}}</li>
                  <li>职位:{{person.position}}</li>
                  <li>机构:{{person.institutions}}</li>
                </ul>
                <div class="keycode text-center">
                  <img src="../../img/微信图片_20200221162526.png" alt />
                  <div>
                    <el-link style="color:skyblue">点击下载二维码</el-link>
                  </div>
                </div>
                <el-button
                  style="margin-top:30px"
                  type="primary"
                  @click="dialogFormVisible = true"
                >修改</el-button>
              </div>
            </div>
            <div class="order">
              <p class="fz_18 content_wrap">参会订单</p>
              <div class="bg_line" style="height:20px;"></div>

              <div>
                <el-table :data="tableData" style="width: 100%">
                  <el-table-column label="序号" type="index"></el-table-column>
                  <el-table-column label="会议名称" prop="cname"></el-table-column>
                  <el-table-column prop="code" label="订单编号"></el-table-column>
                  <el-table-column prop="name" label="缴纳人"></el-table-column>
                  <el-table-column prop="address" label="所在机构"></el-table-column>
                  <el-table-column prop="payment" label="缴费方式"></el-table-column>
                  <el-table-column prop="date" label="缴费时间"></el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main_footer mt_10">
        <div class="sidebar left">
          <div class="meeting_intention meeting_box" style="width:320px; line-height:30px;  ">
            <div class="meeting_title fz_25 fc_white text-center">联系我们</div>
            <div class="meeting_main">
              <div style="margin:10px">
                <p>
                  <span class="fc_blue">会议联系人:</span>李某某
                </p>
                <p>
                  <span class="fc_blue">手 机:</span>13888888888
                </p>
              </div>
              <div style="margin:10px">
                <p>
                  <span class="fc_blue">会议联系人:</span>李某某
                </p>
                <p>
                  <span class="fc_blue">手 机:</span>13888888888
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-main>

    <el-footer height="200px" class="mt_10">
      <div class="wrap fc_white footer_box">
        <p>
          <span class="fz_30" style="margin-right:10px">科袖会议</span>服务于各行业会议需要
        </p>
        <p>
          <a href="#">关于我们</a>
          <a href="#">企业入驻</a>
          <a href="#">我是专家</a>
          <a href="#">平台入口</a>
          <a href="#" style="border-right:none">用户协议</a>
        </p>
      </div>
    </el-footer>
    <div class="gradient"></div>
    <!-- 弹窗 -->
    <el-dialog title="修改个人信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名:" :label-width="formLabelWidth">
          <el-input v-model="person.name"></el-input>
        </el-form-item>
        <el-form-item label="电话:" :label-width="formLabelWidth">
          <el-input v-model="person.tel"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" :label-width="formLabelWidth">
          <el-input v-model="person.emal"></el-input>
        </el-form-item>
        <el-form-item label="职位:" :label-width="formLabelWidth">
          <el-input v-model="person.position"></el-input>
        </el-form-item>
        <el-form-item label="所在机构:" :label-width="formLabelWidth">
          <el-input v-model="person.institutions"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">提 交</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import applyMeeting from "../../components/compoents-home/apply-meeting.vue";
export default {
  name: "pscenter",
  data() {
    return {
      username: "用户名称(后期修改)",
      nav_arr: ["首页", "会议信息", "会议日程", "征文投稿"],
      active: 0,
      tableData: [
        {
          date: "2020-05-02",
          name: "王小虎",
          code: " XXXXXXXXXXXXXX",
          address: "上海市普陀区金沙江路 1518 弄",
          payment: "线上缴费",
          cname: "海洋会"
        },
        {
          date: "2020-05-02",
          name: "王小虎",
          code: " XXXXXXXXXXXXXX",
          address: "上海市普陀区金沙江路 1518 弄",
          payment: "线上缴费",
          cname: "海洋会"
        }
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        //个人信息修改
        name: "",
        tel: "",
        emal: "",
        position: "",
        institutions: ""
      },
      formLabelWidth: "100px",
      person: {
        name: "王小虎",
        tel: 140000000,
        emal: "357@cons.com",
        position: "请务必提交真实信息",
        institutions: "上海市普陀区金沙江路 1518 弄"
      }
    };
  },
  methods: {
    handClick(index) {
      this.active = index;
      window.console.log(this.active);
    },
    config() {
      this.active = 4;
    }
  },
  components: {
    applyMeeting
  }
};
</script>

<style scoped lang=scss>
/* nav点击效果 */
.actve_nav {
  border-radius: 10px 10px 0px 0px;
  background-color: #fff;
  color: #3b6d9a;
  font-weight: 700;
}
.actve_white {
  color: #fff;
}

.el-container {
  position: relative;
  .el-header {
    padding: 0px;
    color: #36b3fa;
    .el-dropdown-link {
      color: #36b3fa;
    }
    .nav {
      height: 40px;
      margin-top: 37px;
      padding: 4px 50px 0px 20px;
      background: url("../../img/ding_01.png") no-repeat;
      li {
        float: left;
        text-align: center;
        padding: 8px 0px;
        a {
          font-size: 16px;
          padding: 8px 20px;
        }
      }
    }
  }
  .el-main {
    padding: 0px;
    margin-top: 22px;
    .main_top {
      height: 360px;
      margin-bottom: 20px;
      .notice {
        width: 320px;
        height: 100%;
        padding: 30px 20px;
        box-sizing: border-box;
        border: 1px solid #6ea1c6;
      }
      .banner {
        position: relative;
        width: 864px;
        height: 100%;
        border: 1px solid #6ea1c6;
        img {
          height: 100%;
          width: 100%;
        }
        .count_down {
          position: absolute;
          top: 10px;
          right: 10px;
        }
      }
    }
    .main_content {
      height: 680px;
      margin-bottom: 20px;

      .sidebar {
        width: 320px;
        height: 100%;
        .meeting_tips {
          margin-top: 17px;
        }
      }
      .meeting_brief {
        width: 864px;
        height: 1032px;
        border: 1px solid #ccc;
        padding: 10px;
        box-sizing: border-box;
        background-color: #fff;

        p {
          font-weight: 700;
        }
        .form_person {
          position: relative;
          width: 650px;
          height: 400px;
          margin: 0 auto;
          padding-top: 50px;
          box-sizing: border-box;
          ul {
            li {
              line-height: 40px;
            }
          }
          .keycode {
            height: 200px;
            width: 200px;
            position: absolute;
            top: 40px;
            right: -30px;
            img {
              width: 200px;
            }
          }
        }
      }
    }
  }
  .el-footer {
    background-color: rgb(51, 103, 149);
    .footer_box {
      padding: 10px;
      p {
        line-height: 40px;
      }
      a {
        color: #fff;
        padding: 0px 10px;
        border-right: 1px solid #fff;
      }
    }
  }
  .gradient {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 560px;
    width: 100%;
    z-index: -1;
    background: url("../../img/beijingguodu_01.png");
  }
}
</style>