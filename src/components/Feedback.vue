<template>
  <div id="feedback" class="mask">
    <span>{{ message }}</span>
  </div>
</template>

<script>
export default {
  name: 'feedback',
  props: {
    message: {
      type: String,
      default: ''
    }
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
      margin: 0;
      font-size: 1em;
      width: 12em;
      height: 12em;
      position: absolute;
      top: -4em; right: -4em;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      animation: bounceIn 1s;
    }
    &.neutral {
      span {
        background-image: url('/static/img/twemoji/1f610.svg');
      }
    }
    &.happy {
      span {
        background-image: url('/static/img/twemoji/1f603.svg');
      }
    }
    &.angry {
      span {
        background-image: url('/static/img/twemoji/1f621.svg');
      }
    }
    &.sad {
      span {
        background-image: url('/static/img/twemoji/1f622.svg');
      }
    }
  }
  &.error {
    span {
      color: #b0021b;
    }
  }
}
</style>
