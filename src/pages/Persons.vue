<template>
  <Layout>
    <div class="persons-page" :class="{ show: !loading }">
      <carousel-3d
        v-show="!birthdays"
        :animation-speed="800"
        :display="7"
        :space="300"
        :min-swipe-distance="1"
        :width="1180"
        :height="780"
        :perspective="180"
        ref="mycarousel"
        :count="$page.persons.edges.length"
        @last-slide="onLastSlide"
      >
        <slide v-for="({ node }, i) in $page.persons.edges" :index="i" :key="i">
          <template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
            <PersonCard
              :data-index="i"
              :imgSrc="node.bild.file.url"
              :birthday="node.fodelsedatum"
              :surName="node.fornamn"
              :lastName="node.efternamn"
              :class="{
                current: isCurrent,
                onLeft: leftIndex >= 0,
                onRight: rightIndex >= 0,
              }"
            />
          </template>
        </slide>
      </carousel-3d>
      <div class="person-birthdays" v-if="birthdays" style="color: white;">
        <PersonBirthdayCard
          v-for="birthday of birthdays"
          :key="birthday.node.id"
          :imgSrc="birthday.node.bild.file.url"
          :birthday="birthday.node.fodelsedatum"
          :surName="birthday.node.fornamn"
          :lastName="birthday.node.efternamn"
        />
      </div>
      <vue-progress-bar></vue-progress-bar>
    </div>
  </Layout>
</template>

<script>
import PersonCard from "@/components/PersonCard";
import PersonBirthdayCard from "@/components/PersonBirthdayCard";
import CountdownTimer from "@/components/CountdownTimer";
import { Carousel3d, Slide } from "vue-carousel-3d";

export default {
  components: {
    PersonCard,
    CountdownTimer,
    PersonBirthdayCard,
    Carousel3d,
    Slide,
  },
  data() {
    return {
      birthdays: null,
      sliding: false,
      loading: true,
      personsInterval: null,
      lastSlideInterval: null,
      slidePageInterval: null,
      fadeInLoadingPersonInterval: null,
      birthdayInterval: null,
    };
  },
  beforeDestroy() {
    clearInterval(this.personsInterval);
    clearInterval(this.lastSlideInterval);
    clearInterval(this.fadeInLoadingPersonInterval);
    clearInterval(this.birthdayInterval);
  },
  created() {
    this.fadeInLoadingPersonInterval = window.setInterval(() => {
      this.loading = false;
    }, 1000);
  },
  mounted: function() {
    this.$moment.locale("en");
    this.$Progress.set(0);
    const hasBirthdays = this.checkForBirthdays();
    if (hasBirthdays) {
      this.birthdays = hasBirthdays;
      this.birthdayInterval = window.setInterval(() => {
        this.$router.push({ path: "/slideshow" });
      }, 1800000);
    } else {
      let indexVariable = 0;
      let timeOut = 15000;
      if (this.$page.persons.edges.length) {
        this.$nextTick(function() {
          this.personsInterval = window.setInterval(() => {
            if (indexVariable < this.$page.persons.edges.length - 1) {
              indexVariable++;
              const progress =
                (indexVariable / (this.$page.persons.edges.length - 1)) * 100;
              this.$Progress.set(progress);
              this.changeSlide(indexVariable);
            }
          }, timeOut);
        });
      }
    }
  },

  methods: {
    start() {
      this.$Progress.start();
    },
    changeSlide(index) {
      if (this.$refs && this.$refs.mycarousel && index) {
        this.$refs.mycarousel.goSlide(index);
      }
    },
    onLastSlide(index) {
      this.$nextTick(() => {
        this.lastSlideInterval = window.setInterval(() => {
          this.$router.push({ path: "/slideshow" });
        }, 15000);
      });
    },
    checkForBirthdays() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      today.setYear(0);

      if (this.$page.persons.edges && this.$page.persons.edges.length) {
        const birthdays = this.$page.persons.edges.filter(({ node }) => {
          const birthday = new Date(Date.parse(node.fodelsedatum));
          birthday.setHours(0, 0, 0, 0);
          birthday.setYear(0);
          if (today.valueOf() == birthday.valueOf()) {
            return node;
          } else {
            console.log({ "not birthday": node });
          }
        });
        return birthdays.length ? birthdays : false;
      }
    },
  },
};
</script>

<style lang="scss">
body {
  font-family: Arial;
}

.person-birthdays {
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 100vh;
  justify-content: center;
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.95)),
    url("~@/assets/happy.gif");
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
  .person-birthday-card {
    margin-right: 86px;
    z-index: 9999;
    &:last-child {
      margin-right: 0px;
    }
  }
}
.persons-page {
  opacity: 0;
  transition: opacity 3s ease;
  &.show {
    opacity: 1;
  }
  background: black;
  height: 100%;
  min-height: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}
.carousel-3d-container {
  margin-top: 2em !important;
}
.carousel-3d-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: 0px solid !important;
  opacity: 0.6 !important;
  &.left-1 {
    transform: translateX(-330px) translateZ(-200px) rotateY(0deg) !important;
    .person-image {
      width: 145px !important;
      height: 145px !important;
    }
    .rosa-tjaffs {
      &.birthday-tomorrow {
        width: 10rem;
      }
      &.birthday {
        width: 10rem;
      }
    }
  }
  &.left-2 {
    transform: translateX(-560px) translateZ(-300px) rotateY(0deg) !important;
    .person-image {
      width: 106px !important;
      height: 106px !important;
    }
    .rosa-tjaffs {
      &.birthday-tomorrow {
        width: 5rem;
        height: 50px;
        margin-top: 2.6em;
      }
      &.birthday {
        width: 5rem;
        height: 50px;
        margin-top: 2.6em;
      }
    }
  }
  &.left-3 {
    transform: translateX(-760px) translateZ(-400px) rotateY(0deg) !important;
    .person-image {
      width: 69px !important;
      height: 69px !important;
    }
    .rosa-tjaffs {
      &.birthday-tomorrow {
        width: 2rem;
        height: 35px;
        margin-top: 3em;
      }
      &.birthday {
        width: 2rem;
        height: 35px;
        margin-top: 3em;
      }
    }
  }
  &.right-1 {
    transform: translateX(330px) translateZ(-200px) rotateY(0deg) !important;
    .person-image {
      width: 145px !important;
      height: 145px !important;
    }
    .rosa-tjaffs {
      &.birthday-tomorrow {
        width: 10rem;
      }
      &.birthday {
        width: 10rem;
      }
    }
  }
  &.right-2 {
    transform: translateX(560px) translateZ(-300px) rotateY(0deg) !important;
    .person-image {
      width: 106px !important;
      height: 106px !important;
    }
    .rosa-tjaffs {
      &.birthday-tomorrow {
        width: 5rem;
        height: 50px;
        margin-top: 2.6em;
      }
      &.birthday {
        width: 5rem;
        height: 50px;
        margin-top: 2.6em;
      }
    }
  }
  &.right-3 {
    transform: translateX(760px) translateZ(-400px) rotateY(0deg) !important;
    .person-image {
      width: 69px !important;
      height: 69px !important;
    }
    .rosa-tjaffs {
      &.birthday-tomorrow {
        width: 2rem;
        height: 35px;
        margin-top: 3em;
      }
      &.birthday {
        width: 2rem;
        height: 35px;
        margin-top: 3em;
      }
    }
  }
  &.current {
    .person-image {
      width: 320px !important;
      height: 320px !important;
    }

    .countdown-timer-wrapper {
      opacity: 1;
    }
  }
  &:not(.current):not(.left-1):not(.left-2):not(.left-3):not(.right-1):not(.right-2):not(.right-3) {
    .rosa-tjaffs {
      display: none;
    }
  }
}
</style>

<page-query>
query {
  persons: allContentfulPerson {
    edges {
      node {
        id
        fornamn
        efternamn
        fodelsedatum
        bild {
          file {
            url
          },
          title
        },
      }
    }
  }
}
</page-query>
