<template>
  <div>
    <Countdown v-if="getTomorrow" :deadline="getTomorrow"></Countdown>
  </div>
</template>

<script>
import Countdown from "vuejs-countdown";
export default {
  components: {
    Countdown,
  },
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

<style lang="scss"></style>
