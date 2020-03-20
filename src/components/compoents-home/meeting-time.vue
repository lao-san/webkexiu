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
            <h3>{{item.topic}}</h3>
            <p>开始时间{{item.createTime}}</p>
            <p>结束时间{{item.speechTime}}</p>
            <p>概要</p>
            <p>{{item.summary}}</p>
            <br>
            <hr>
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
      meetingTimeList: []
    };
  },
  created() {
    this.getMeetingTime();
  },
  methods: {
    getMeetingTime() {
      this.$http.get("/app/lecture/list/1", {}, res => {
        window.console.log(res.lectureList);
        if (res && res.msg == "success") {
          this.meetingTimeList = res.lectureList;
        }
      });
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