<template>
  <div class="persons-page">
    <carousel-3d
      :loop="true"
      :animation-speed="800"
      :display="7"
      :perspective="0"
      :space="300"
      :min-swipe-distance="1"
      :inverse-scaling="100"
      :disable3d="false"
      :width="1180"
      :height="780"
      ref="mycarousel"
      :count="$page.persons.edges.length"
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
  </div>
</template>

<script>
import PersonCard from "@/components/PersonCard";
import CountdownTimer from "@/components/CountdownTimer";
import { Carousel3d, Slide } from "vue-carousel-3d";

export default {
  components: {
    PersonCard,
    CountdownTimer,
    Carousel3d,
    Slide,
  },
  data() {
    return {
      currentBirthday: null,
      sliding: false,
    };
  },
  mounted: function() {
    this.checkForBirthdays();
    let indexVariable = 0;
    let timeOut = 10000;
    this.$nextTick(function() {
      window.setInterval(() => {
        if (indexVariable < this.$page.persons.edges.length) {
          indexVariable++;
          this.changeSlide(indexVariable);
        } else {
          this.changeSlide(0);
          indexVariable = 0;
        }
      }, timeOut);
    });
  },
  methods: {
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
          }
        });
        birthdays.length
          ? console.log({ "has birthdays": birthdays })
          : console.log("no birthdays");
      }
    },
  },
};
</script>

<style lang="scss">
body {
  font-family: Arial;
}
.persons-page {
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
  //   &.left-2 {
  //     width: 106px !important;
  //     height: 106px !important;
  //   }
  //   &.left-3 {
  //     width: 69px !important;
  //     height: 69px !important;
  //   }
  //   &.right-1 {
  //     width: 145px !important;
  //     height: 145px !important;
  //   }
  //   &.right-2 {
  //     width: 106px !important;
  //     height: 106px !important;
  //   }
  //   &.right-3 {
  //     width: 69px !important;
  //     height: 69px !important;
  //   }
}
// .app-hooper-slider {
//   height: 500px;
//   .hooper-slide {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }
// }

// .is-active {
//   .person-img {
//     width: 10em;
//     height: 10em;
//     opacity: 0.5;
//   }
//   &.is-current {
//     .person-img {
//       width: 320px;
//       height: 320px;
//       opacity: 1;
//     }
//   }
// }
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
