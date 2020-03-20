<template>
  <div>
    <div class="meeting_date">
      <div class="meeting_data_title">
        <span class="small_title">会议信息</span>
      </div>
      <div class="bg_line"></div>
      <div style="padding:10px">
        <!-- 回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话
        回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话回话 -->
        {{this.information}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "meeting-Information",
  props: {
    information: {
      type: String
    }
  },

  data() {
    return {};
  },
  methods: {}
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