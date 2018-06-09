<template>
  <div id="feedback" class="mask">
    <span>{{ message }}</span>
    <victory v-if="message === 'victory'" class="feedback"></victory>
    <defeat  v-if="message === 'defeat'" class="feedback"></defeat>
  </div>
</template>

<script>
import Victory from './Victory'
import Defeat from './Defeat'
export default {
  name: 'feedback',
  props: {
    message: {
      type: String,
      default: ''
    }
  },
  components: {
    'victory': Victory,
    'defeat': Defeat
  },
  mounted () {
    document.getElementById('feedback').style.top = window.webcam.offsetTop + 'px'
  }
}
</script>

<style scoped lang="scss">
@keyframes loading {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
#feedback {
  z-index: 1500;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: .85;
  span {
    display: block;
    margin: 1em 2em;
    font-size: 3em;
    font-weight: 700;
    text-align: center;
    color: white;
  }
  &.webcam {
    background: url('/static/img/backgrounds/noise.gif');
  }
  &.loading {
    span {
      font-size: 1em;
      margin: 0;
      width: 2em;
      height: 2em;
      position: absolute;
      top: 1em; right: 1em;
      border: solid .125em white;
      border-radius: 100%;
      animation: loading ease 1s infinite;
      box-shadow: 0 0 .5em rgba(0,0,0,.25);
      transition: all ease .5s;
    }
  }
  &.success {
    span {
      display: none;
    }
    div {
      width: 100%;
      height: 100%;
    }
  }
  &.error {
    span {
      color: #b0021b;
    }
  }
}
</style>
