<template>
  <div>
    <div class="meeting_date">
      <div class="meeting_data_title">
        <span class="small_title">会议日程</span>
      </div>
      <div class="bg_line"></div>
      <div style="padding:10px">
        <ul>
          <li v-for="(item) in meetingTimeList " :key="item.id">
            <h3>演讲人: {{item.truename}}</h3>
            <p style="line-height:50px">演讲时间:{{item.speech_time}}</p>
            <p>演讲题目:{{item.topic}}</p>
            <br />
            <hr />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "meeting-time",
  data() {
    return {
      meetingTimeList: [],
      pageNo: 0,
      limit: 10,
      meetingId: 1,
      key: ""
    };
  },
  created() {
    this.getMeetingTime();
  },
  methods: {
    getMeetingTime() {
      this.$http.get(
        "/app/lecture/list",
        {
          page: this.pageNo,
          limit: this.limit,
          meetingId: this.meetingId,
          key: this.key
        },
        res => {
          window.console.log(res);
          if (res && res.msg == "success") {
            this.meetingTimeList = res.page.list;
          }
        }
      );
    }
  }
};
</script>

<style scoped lang=scss>
.meeting_date {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}
</style>