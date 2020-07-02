<template>
  <div class="person-card">
    <svg
      width="262"
      height="96"
      viewBox="0 0 262 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="rosa-tjaffs"
      :class="{ 'birthday-tomorrow': isBirthdayTomorrow, birthday: isBirthday }"
    >
      <path
        d="M143.676 52.3326L143.641 0L119.943 0.037798L119.978 52.3704L143.676 52.3326Z"
        fill="#FF00FF"
      />
      <path
        d="M231.38 95.2501L261.983 56.4818L243.388 41.8096L212.784 80.5779L231.38 95.2501Z"
        fill="#FF00FF"
      />
      <path
        d="M48.7922 80.9576L18.8398 41.7357L-4.47681e-05 56.1304L29.9523 95.3523L48.7922 80.9576Z"
        fill="#FF00FF"
      />
    </svg>
    <div
      class="person-image"
      :style="{ backgroundImage: 'url(' + imgSrc + ')' }"
    />
    <CountdownTimer
      :birthday="formatBirthday"
      :isBirthday="isBirthday"
      :isBirthdayTomorrow="isBirthdayTomorrow"
      :daysLeft="Math.abs(daysLeft)"
      :surName="surName"
    />
  </div>
</template>

<script>
import CountdownTimer from "./CountdownTimer";
export default {
  props: {
    imgSrc: {
      type: String,
    },
    birthday: {
      type: String,
    },
    surName: {
      type: String,
    },
    lastName: {
      type: String,
    },
  },
  data() {
    return {
      daysLeft: 0,
    };
  },
  components: {
    CountdownTimer,
  },
  computed: {
    formatBirthday: function() {
      const year = new Date().getFullYear();
      const birthday = new Date(Date.parse(this.birthday));
      birthday.setHours(0, 0, 0, 0);
      birthday.setYear(year);
      return this.$moment(birthday).format("LL");
    },
    isBirthday: function() {
      const birthday = new Date(Date.parse(this.birthday));
      birthday.setHours(0, 0, 0, 0);
      birthday.setYear(0);

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      today.setYear(0);

      if (today.valueOf() == birthday.valueOf()) {
        return true;
      } else {
        return false;
      }
    },
    isBirthdayTomorrow: function() {
      const birthday = new Date(Date.parse(this.birthday));
      birthday.setHours(0, 0, 0, 0);
      birthday.setYear(0);

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      today.setYear(0);
      var Difference_In_Time = birthday.getTime() - today.getTime();
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      this.daysLeft = Difference_In_Days;
      if (Math.abs(Difference_In_Days) == 1) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="scss">
.person-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  .rosa-tjaffs {
    opacity: 0;
    transition: all 0.3s ease;
    width: 25em;
    &.birthday-tomorrow {
      opacity: 1;
    }
    &.birthday {
      opacity: 1;
    }
  }
  .person-image {
    border-radius: 50rem;
    background-color: #cccccc;
    height: 5rem;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    transition: height 0.3s ease, width 0.3s ease;
  }
}
</style>
