<template>
  <div>
    <div class="meeting_date">
      <div class="meeting_data_title">
        <span class="small_title">会议投稿</span>
      </div>
      <div class="bg_line"></div>
      <div style="padding:10px">{{this.content.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "meeting-posting",
  data() {
    return {
      content: ""
    };
  },
  created() {
    this.getPosting();
  },
  methods: {
    getPosting() {
      this.$http.get("/app/paperrequire/info/1", {}, res => {
        if (res && res.msg == "success") {
          this.content = res.paperRequire;
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