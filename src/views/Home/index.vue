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
            <li v-for="(item,index) of this.nav_arr" :key="index">
              <a
                href="javascript:"
                @click="handClick(index)"
                :class="active==index?'actve_nav':'actve_white' "
              >{{item}}</a>
            </li>
          </ul>
        </div>
      </div>
    </el-header>

    <el-main class="wrap">
      <div class="main_top">
        <div class="notice left text-center">
          <h3 style="font-size:30px;color:#336795;font-weight:700">第20届腐蚀材料与防护大会第20届腐蚀材料与防护大会</h3>
          <p
            class="fz_20 mt_10"
            style="font-weight:700;color:#5596b3"
          >XXXXX学术研讨会XXXXX学术研讨会XXXXX学术研讨会</p>
          <p class="fz_20 mt_10" style="color:#3da7b4">
            2020年1月1日至2020年1月3日
            国家会议中心3号厅
          </p>
        </div>
        <div class="banner right">
          <a href="javascript:">
            <img src="../../img/ChMkJ1bKxr-IM5CbAANCMRdgBAEAALHpwD8-c8AA0JJ753.jpg" alt />
          </a>
          <div class="count_down text-center">
            <div class="fz_30" style="font-weight:700;color:#fff">距离会议开幕还有</div>
            <div>
              <time-down :endTime="endTime"></time-down>
            </div>
          </div>
        </div>
      </div>
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
                  @click.prevent='config'
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
          <meeting-information v-if="this.active==0||this.active==1"></meeting-information>
          <meeting-time v-else-if="this.active==2"></meeting-time>
          <meeting-posting v-else-if="this.active==3"></meeting-posting>
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
  </el-container>
</template>

<script>
import timeDown from "../../components/count-down";    //倒计时
import meetingInformation from "../../components/compoents-home/meeting-Information.vue"; //会议信息
import meetingTime from "../../components/compoents-home/meeting-time.vue"; //会议信息
import meetingPosting from "../../components/compoents-home/meeting-posting.vue"; //会议信息
import applyMeeting from "../../components/compoents-home/apply-meeting.vue"; //会议申请

export default {
  name: "",
  data() {
    return {
      username: "用户名称(后期修改)",
      nav_arr: ["首页", "会议信息", "会议日程", "征文投稿"],
      active: 0,
      endTime: "2020-02-24 20:16:00"
    };
  },
  methods: {
    handClick(index) {
      this.active = index;
    },
    config() {
      this.active = 4;
      
    }
  },
  components: {
    timeDown,
    meetingTime,
    meetingInformation,
    meetingPosting,
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
          /* color: #fff; */
          padding: 8px 20px;
        }
        /* border: 1px solid red; */
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
        background-color: #fff;
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
        height: 100%;
        border: 1px solid #ccc;
        padding: 10px;
        box-sizing: border-box;
        background-color: #fff;
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