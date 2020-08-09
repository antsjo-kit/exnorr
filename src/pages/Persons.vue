<template>
  <Layout>
    <ClientOnly>
      <div class="persons-page" :class="{ show: !loading }">
        <carousel-3d
          v-show="
            !birthdays && $page.persons.edges && $page.persons.edges.length
          "
          :animation-speed="800"
          :display="7"
          :space="300"
          :min-swipe-distance="1"
          :width="1180"
          :infinite="true"
          :height="780"
          :perspective="180"
          ref="mycarousel"
          :count="$page.persons.edges.length"
        >
          <slide
            v-for="({ node }, i) in sortedPersonsByDate"
            :index="i"
            :key="i"
          >
            <template
              slot-scope="{ index, isCurrent, leftIndex, rightIndex }"
              v-if="node && node.bild"
            >
              <PersonCard
                :data-index="i"
                :imgSrc="node.bild.file.url"
                :birthday="node.fodelsedatum"
                :daysLeft="node.daysLeft"
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
          <template v-for="birthday of birthdays">
            <PersonBirthdayCard
              :key="birthday.node.id"
              :imgSrc="birthday.node.bild.file.url"
              :birthday="birthday.node.fodelsedatum"
              :surName="birthday.node.fornamn"
              :lastName="birthday.node.efternamn"
              v-if="birthday && birthday.node && birthday.node.bild"
            />
          </template>
        </div>
        <!-- <vue-progress-bar></vue-progress-bar> -->
      </div>
    </ClientOnly>
  </Layout>
</template>

<script>
import PersonCard from "@/components/PersonCard";
import PersonBirthdayCard from "@/components/PersonBirthdayCard";
import CountdownTimer from "@/components/CountdownTimer";

export default {
  components: {
    PersonCard,
    CountdownTimer,
    PersonBirthdayCard,
    Carousel3d: () =>
      import("vue-carousel-3d")
        .then((m) => m.Carousel3d)
        .catch(),
    Slide: () =>
      import("vue-carousel-3d")
        .then((m) => m.Slide)
        .catch(),
  },
  data() {
    return {
      birthdays: null,
      sliding: false,
      loading: true,
      personsInterval: null,
      slidePageInterval: null,
      changePageToSlideshow: null,
      fadeInLoadingPersonInterval: null,
      birthdayInterval: null,
    };
  },
  beforeDestroy() {
    if (this.personsInterval) {
      clearInterval(this.personsInterval);
    }
    if (this.fadeInLoadingPersonInterval) {
      clearTimeout(this.fadeInLoadingPersonInterval);
    }
    if (this.birthdayInterval) {
      clearTimeout(this.birthdayInterval);
    }
    if (this.changePageToSlideshow) {
      clearTimeout(this.changePageToSlideshow);
    }
  },
  computed: {
    slidesLeft: function() {
      return "test";
    },
    sortedPersonsByDate: function() {
      if (this.$page.persons.edges) {
        const personsArray = [...this.$page.persons.edges];
        const today = this.$moment().format("YYYY-MM-DD");

        for (const { node } of personsArray) {
          const birthday = this.$moment(node.fodelsedatum);

          // calculate age of the person
          var age = this.$moment(today).diff(birthday, "years");
          this.$moment(age).format("YYYY-MM-DD");
          console.log("person age", age, node.fornamn);

          var nextBirthday = this.$moment(birthday).add(age, "years");
          this.$moment(nextBirthday).format("YYYY-MM-DD");

          /* added one more year in case the birthday has already passed
  to calculate date till next one. */
          if (nextBirthday.isSame(today)) {
            console.log("Cake!!");
          } else {
            nextBirthday = this.$moment(birthday).add(age + 1, "years");
            node.daysLeft = nextBirthday.diff(today, "days");
            console.log("else sats", node.daysLeft);
          }

          // const birthday = new Date(Date.parse(node.fodelsedatum));
          // birthday.setFullYear(yearToday);
          // const bday = this.$moment().fromNow(birthday);
          // console.log(bday);
          // // var Difference_In_Time = birthday.getTime() - today.getTime();
          // // var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
          // // node.daysLeft = Math.abs(Difference_In_Days);
        }

        const sortedPersons = this._.orderBy(
          personsArray,
          ["node.birthday"],
          ["desc"]
        );
        return sortedPersons;
      } else {
        return false;
      }
    },
  },
  created() {
    if (process.isClient) {
      // browser only code
      this.fadeInLoadingPersonInterval = setTimeout(() => {
        this.loading = false;
      }, 1000);
    }
  },
  mounted: function() {
    this.$moment.locale("en");
    // this.$Progress.set(0);
    const hasBirthdays = this.checkForBirthdays();
    if (hasBirthdays) {
      this.birthdays = hasBirthdays;
      if (process.isClient) {
        // browser only code
        this.birthdayInterval = setTimeout(() => {
          this.$router.push({ path: "/slideshow" });
        }, 300000);
      }
    } else {
      let indexVariable = 0;
      let timeOut = 5000;
      if (
        this.$page &&
        this.$page.persons &&
        this.$page.persons.edges &&
        this.$page.persons.edges.length
      ) {
        this.$nextTick(function() {
          if (process.isClient) {
            // browser only code
            this.personsInterval = setInterval(() => {
              if (indexVariable < this.$page.persons.edges.length - 1) {
                indexVariable++;
                const progress =
                  (indexVariable / (this.$page.persons.edges.length - 1)) * 100;
                // this.$Progress.set(progress);
                this.changeSlide(indexVariable);
              } else {
                console.log("asd");
                this.loading = true;
                this.changePageToSlideshow = setTimeout(() => {
                  this.$router.push({ path: "/slideshow" });
                }, 5000);
              }
            }, 5000);
          }
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
            return false;
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
  background: transparent !important;
  border: 0px solid !important;
  opacity: 0.6 !important;
  will-change: transform !important;
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
    .rosa-tjaffs {
      opacity: 1 !important;
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
