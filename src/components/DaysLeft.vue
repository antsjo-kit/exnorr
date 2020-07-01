<template>
  <div class="countdown-timer-time">
    <div class="number">{{ number }}</div>
    <div class="text">{{ text }}</div>
  </div>
</template>

<script>
export default {
  props: ["number", "text"],
};
</script>

<style lang="scss" scoped>
.countdown-timer-time {
  display: flex;
  flex-direction: column;
  text-align: center;
  .number {
    font-family: Arial;
    font-style: normal;
    font-weight: normal;
    font-size: 236px;
    line-height: 15rem;
  }
  .text {
    font-family: Arial;
    font-style: normal;
    font-weight: normal;
    font-size: 48px;
    text-transform: uppercase;
  }
}
</style>
