<template>
  <el-container class>
    <el-header class="wrap" height="90px">
      <div class="left" style="padding:10px 0px">
        <h1 class="fz_45" style="font-weight:700">科袖会议</h1>
        <p style="letter-spacing:2px">科袖会议,致力于最专业的会议集成系统</p>
      </div>
      <div class="right" style="padding:10px 0px;">
        <div>
          <el-dropdown class="right" v-if="show">
            <span class="el-dropdown-link">{{username}}</span>
            <el-dropdown-menu slot="dropdown">
              <router-link to="/pcenter">
                <el-dropdown-item>个人中心</el-dropdown-item>
              </router-link>
              <el-dropdown-item @click.native="clearUser()">退出登录</el-dropdown-item>
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
          <h3 style="font-size:30px;color:#336795;font-weight:700">{{this.meetingCollection.nameCn}}</h3>
          <p
            class="fz_20 mt_10"
            style="font-weight:700;color:#5596b3"
          >{{this.meetingCollection.address}}</p>
          <p class="fz_20 mt_10" style="color:#3da7b4">{{this.starTime|time}}至{{this.endTime |time}}</p>
          <p class="fz_20 mt_10" style="color:#3da7b4">{{this.meetingCollection.address}}</p>
        </div>
        <div class="banner right">
          <!-- <a href="javascript:">
            <img src="../../img/ChMkJ1bKxr-IM5CbAANCMRdgBAEAALHpwD8-c8AA0JJ753.jpg" alt />
          </a>-->
          <el-carousel height="360px">
            <el-carousel-item v-for="item in imgList" :key="item">
              <img :src="url+item" style="height:100%" />
            </el-carousel-item>
          </el-carousel>

          <div class="count_down text-center">
            <div class="fz_30" style="font-weight:700;color:#fff; ">距离会议开幕还有</div>
            <div>
              <time-down :endTime="this.meetingCollection.onlineRegDeadline"></time-down>
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
                  @click.prevent="config"
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
                <p>{{this.PaperRequireinfoTime}}</p>
                <p class="fc_blue">网上注册截止日期</p>
                <p>{{this.meetingCollection.onlineRegDeadline}}</p>
                <p class="fc_blue">现场报名时间</p>
                <p>{{this.meetingCollection.onlineRegDeadline}}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 主题内容容器 -->
        <apply-meeting v-if="this.active ==4"></apply-meeting>

        <div class="meeting_brief right" v-else>
          <meeting-information
            v-if="this.active==0||this.active==1"
            :information="this.meetingCollection.introduction"
          ></meeting-information>
          <meeting-time v-else-if="this.active==2"></meeting-time>
          <meeting-posting v-else-if="this.active==3"></meeting-posting>
        </div>
      </div>
      <div class="main_footer mt_10">
        <div class="sidebar left">
          <div class="meeting_intention meeting_box" style="width:320px; line-height:30px;  ">
            <div class="meeting_title fz_25 fc_white text-center">联系我们</div>
            <div class="meeting_main">
              <div style="margin:10px" v-for=" item in personList" :key="item.id">
                <p>
                  <span class="fc_blue">会议联系人:</span>
                  {{item.truename}}
                </p>
                <p>
                  <span class="fc_blue">手 机:</span>
                  {{item.phone}}
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
import timeDown from "../../components/count-down"; //倒计时
import meetingInformation from "../../components/compoents-home/meeting-Information.vue"; //会议信息
import meetingTime from "../../components/compoents-home/meeting-time.vue"; //会议信息
import meetingPosting from "../../components/compoents-home/meeting-posting.vue"; //会议信息
import applyMeeting from "../../components/compoents-home/apply-meeting.vue"; //会议申请

export default {
  name: "",
  data() {
    return {
      username: "个人中心",
      nav_arr: ["首页", "会议信息", "会议日程", "征文投稿"],
      active: 0,
      starTime: "",
      endTime: "",
      show: "", //个人中心显示,,
      meetingCollection: {},
      PaperRequireinfoTime: "", //投稿截止时间
      imgList: [],
      url: "http://121.42.53.174:9008/static",
      personList: []
    };
  },
  created() {
    this.personal();
    this.getMeeting(); //获取会议信息
    this.getUser(); //获取会员id
    this.getPaperRequireinfo(); //获取投稿时间
    this.getContactUs(); //联系我们
  },
  filters: {
    time(val) {
      return val
        .split(" ")
        .splice(0, 1)
        .join();
    }
  },
  methods: {
    handClick(index) {
      this.active = index;
    },
    config() {
      this.active = 4;
      const key = window.sessionStorage.getItem("token");
      if (!key) {
        this.$router.push({ path: "/login" });
      }
    },
    personal() {
      this.show = window.sessionStorage.getItem("token");
    },
    clearUser() {
      window.sessionStorage.removeItem("token");
      this.$router.go(0);
    },
    getMeeting() {
      this.$http.get(`/app/meeting/info/${this.baseMeetintgId}`, {}, res => {
        if (res && res.code === 0) {
          this.meetingCollection = res.meeting;
          this.starTime = res.meeting.startTime;
          this.endTime = res.meeting.endTime;
          this.imgList = res.meeting.titlePicture.split(",");
          window.sessionStorage.setItem("meetingId", res.meeting.id);
        }
      });
    },
    getUser() {
      //获取用户id
      this.$http.get("/app/user/info", {}, res => {
        window.sessionStorage.setItem("userId", res.user.userId);
      });
    },
    //投稿时间
    getPaperRequireinfo() {
      this.$http.get(`/app/meeting/paperrequireinfo/${this.baseMeetintgId}`, {}, res => {
        if (res && res.code === 0) {
          this.PaperRequireinfoTime = res.paperRequir.deadline;
        }
      });
    },
    //联系我们
    getContactUs() {
      this.$http.get(`/app/meeting/contact/${this.baseMeetintgId}`, {}, res => {
        if (res && res.code === 0) {
          this.personList = res.list;
        } else {
          window.console.log(res.success);
        }
      });
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
          z-index: 10000000000;
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
        overflow: hidden;
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