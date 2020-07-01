<template>
  <div class="countdown-timer-wrapper">
    <div class="countdown-timer-content">
      <template v-if="daysLeft == 1">
        <CountdownTime />
      </template>
      <template v-else>
        <template v-if="daysLeft != 0">
          <DaysLeft :number="daysLeft" :text="'DAGAR KVAR'" />
        </template>
        <template v-else>
          <DaysLeft :number="'GRATTIS'" :text="surName" />
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import DaysLeft from "./DaysLeft";
import CountdownTime from "./CountdownTime";
export default {
  props: [
    "birthday",
    "isBirthday",
    "isBirthdayTomorrow",
    "daysLeft",
    "surName",
  ],
  components: {
    DaysLeft,
    CountdownTime,
  },
};
</script>

<style lang="scss">
.countdown-timer-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: white;
  opacity: 0;
  margin-top: 1em;
  transition: opacity 0.3s ease;
  .countdown-timer-content {
    display: flex;
    align-items: center;
    .vuejs-countdown {
      li {
        display: inline-block;
        margin: 0 8px;
        text-align: center;
        margin-right: 125px;
        position: relative;
        &::after {
          content: ":";
          position: absolute;
          right: -100px;
          font-size: 256px;
          line-height: 0;
          top: 105px;
        }
        &:last-child {
          margin-right: 0px;
          &::after {
            display: none;
          }
        }
      }
      .digit {
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
    .dot-wrapper {
      position: relative;
      height: 190px;
      width: 50px;
      margin: auto 2em;
      .dot {
        position: absolute;
        font-size: 256px;
        line-height: 0;
        top: 45px;
        left: -8px;
      }
    }
  }
}
</style>
