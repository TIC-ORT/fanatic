<template>
  <div id="timer" class="mask">
    <span class="animated" :class="{ zoomOut: play }">{{ countdown }}</span>
  </div>
</template>

<script>
export default {
  name: 'timer',
  props: {
    seconds: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      countdown: 0,
      play: false
    }
  },
  watch: {
    countdown () {
      var _this = this
      if (_this.countdown > 0) {
        _this.play = true
        window.setTimeout(function () {
          _this.play = false
        }, 950)
        window.setTimeout(function () {
          _this.countdown--
        }, 1000)
      }
    }
  },
  mounted () {
    console.log(this.seconds)
    this.countdown = this.seconds
  }
}
</script>

<style scoped lang="scss">
#timer {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36em;
  font-weight: 700;
  color: white;
  span {
    opacity: 0;
  }
}
</style>
