<template>
  <div>
    <vac :end-time="getTomorrow">
      <div class="clock-timer" slot="process" slot-scope="{ timeObj }">
        {{ `${timeObj.h} : ${timeObj.m} : ${timeObj.s}` }}
        <div class="clock-timer-text">
          <div>HOUR</div>
          <div>MINUTES</div>
          <div>SECONDS</div>
        </div>
      </div>
    </vac>
  </div>
</template>

<script>
export default {
  computed: {
    getTomorrow: function() {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      return this.$moment(tomorrow).format("LL");
    },
  },
};
</script>

<style lang="scss">
.clock-timer {
  font-family: Arial;
  font-style: normal;
  font-weight: normal;
  font-size: 236px;
  line-height: initial;
  align-items: center;
  display: flex;
  flex-direction: column;

  .clock-timer-text {
    margin-left: 5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    line-height: initial;
    font-family: Arial;
    font-style: normal;
    font-weight: normal;
    width: 91%;
    font-size: 48px;
    text-transform: uppercase;
  }
}
</style>
