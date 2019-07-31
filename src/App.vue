<template lang="pug">
  #app
    div.info
      .error(v-if='error')
        | {{ error }}
      div(v-else)
        | {{ finalTranscript }}
        span.interim
          | {{ interimTranscript }}
    .circle(
      :style='circleStyle'
    )
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import recognition from './utils/recognition'
import interpretation from './utils/interpretation'

const CIRCLE_SIZE = 50

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data() {
    return {
      finalTranscript: null,
      interimTranscript: null,
      error: null,
      circleSize: CIRCLE_SIZE,
      left: parseInt(window.innerWidth / CIRCLE_SIZE / 2),
      top: parseInt(window.innerHeight / CIRCLE_SIZE / 2)
    }
  },
  mounted() {
    recognition((finalTranscript, interimTranscript) => {
      this.finalTranscript = finalTranscript;
      this.interimTranscript = interimTranscript
    }, (text) => {
      try {
        const response = interpretation.validate(text)
        switch (response.direction) {
          case 'left': {
            this.left -= response.number.value
            break;
          }
          case 'right': {
            this.left += response.number.value
            break;
          }
          case 'back': {
            this.top += response.number.value
            break;
          }
          case 'straight': {
            this.top -= response.number.value
            break;
          }
        }
      } catch (error) {
        this.error = error
      }
    })
  },
  computed: {
    circleStyle() {
      return {
        '--rircle-top': (this.top * this.circleSize) + 'px',
        '--rircle-left': (this.left * this.circleSize) + 'px',
      }
    }
  },
  watch: {
    error() {
      if (this.error) {
        setTimeout(() => {
          this.error = null
          this.finalTranscript = null
          this.interimTranscript = null
        }, 1000)
      }
    }
  }
}
</script>

<style>
html, body {
  margin: 0
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #FFF;
  background: #333;
  height: 100vh;
  display: grid;
  grid-template-rows: repeat(10, 100px);
  grid-template-columns: repeat(10, 100px);
  grid-gap: 1px;
  background-origin: sol;
}

.interim {
  color: #ddd;
}

.circle {
  position: absolute;
  background: #fff;
  height: 50px;
  width: 50px;
  left: var(--rircle-left);
  top: var(--rircle-top);
  border-radius: 50%;
  transition: all 1s ease-in-out;
}

.info {
  position: absolute;
  width: 100%;
  top: 10px;
  font-size: 1.2em;
  opacity: 0.8;
}

.error {
  color: #ec4242;
  font-weight: bold;
}
</style>
