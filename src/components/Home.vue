<template>
  <main>
    <header>
      <!-- <h1>FanaTIC</h1>
      <label :class="{ enable: trainingModeEnable }">
        <span>Training mode</span>
        <input type="checkbox" v-model="trainingModeEnable" disabled="disabled" />
      </label> -->
    </header>
    <webcam></webcam>
    <timer v-if="timerSeconds > 0" :seconds="timerSeconds"></timer>
    <transition enter-active-class="burnIn" leave-active-class="animated bounceOutUp">
      <photo v-if="stillPhoto !== ''" :source="stillPhoto"></photo>
    </transition>
    <transition enter-active-class="animated zoomInDown" leave-active-class="animated fadeOut">
      <actions v-if="actionsAvailable"></actions>
    </transition>
    <transition leave-active-class="animated fadeOut">
      <feedback v-if="feedbackMessage !== '' || feedbackClass !== ''" :message="feedbackMessage" :class="feedbackClass"></feedback>
    </transition>
    <!-- <footer>
      <div class="left">
        <img src="/static/img/logos/ort.svg" width="240" height="102" alt="Escuelas Técnica ORT" />
        <div class="watson">
          <span>Hecho con</span>
          <img src="/static/img/logos/watson.svg" width="260" height="76" alt="IBM Watson" />
        </div>
      </div>
      <div class="right">
        <a href="https://twitter.com/TIC_ORT" target="_blank" title="TIC en Twitter" class="twitter"><font-awesome-icon :icon="['fab', 'twitter']" /></a>
        <a href="https://github.com/TIC-ORT/fanatic" target="_blank" title="FanaTIC en GitHub" class="github"><font-awesome-icon :icon="['fab', 'github']" /></a>
      </div>
    </footer> -->
  </main>
</template>

<script>
import Webcam from './Webcam'
import Timer from './Timer'
import Photo from './Photo'
import Actions from './Actions'
import Feedback from './Feedback'
export default {
  name: 'home',
  components: {
    'webcam': Webcam,
    'timer': Timer,
    'photo': Photo,
    'actions': Actions,
    'feedback': Feedback
  },
  data () {
    return {
      feedbackMessage: 'La aplicación necesita acceso a la cámara para funcionar',
      feedbackClass: 'webcam',
      actionsAvailable: false,
      trainingModeEnable: true,
      timerSeconds: 0,
      stillPhoto: ''
    }
  }
}
</script>

<style scoped lang="scss">
main {
  width: 100%;
  height: 100vh;
  background: url('/static/img/backgrounds/grass.png');
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) { 
    background: url('/static/img/backgrounds/grass@2x.png');
  }
  @media (-webkit-min-device-pixel-ratio: 3), (min-resolution: 288dpi) { 
    background: url('/static/img/backgrounds/grass@3x.png');
  }
  box-shadow: inset 0 0 0 1em rgba(255,255,255,0.25);
  overflow: hidden;
  position: relative;
  header {
    margin: 2.5vh 4em 0 4em;
    height: 10vh;
    h1 {
      background-image: url('/static/img/logos/fanatic.svg');
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      font-size: 1em;
      height: 100%;
      margin: 0;
      padding: 0;
      text-indent: -9000em;
      opacity: .85;
    }
    label {
      display: block;
      position: absolute;
      top: 2em; right: 2em;
      color: white;
      transition: all .5s;
      cursor: pointer;
      width: 8em;
      height: 6em;
      text-align: center;
      background: #444;
      background-image: url('/static/img/icons/off.svg');
      background-size: contain;
      background-position: center 1em;
      background-repeat: no-repeat;
      border: solid .125em #222;
      transform: translateX(6em);
      input {
        display: block;
        appearance: none;
        background: none;
        cursor: pointer;
        position: absolute;
        top: 0; right: 0; bottom: 0; left: 0;
        &:disabled {
          cursor: not-allowed;
        }
      }
      span {
        display: block;
        width: 100%;
        height: 2em;
        line-height: 2em;
        background: #222;
        text-align: center;
        text-transform: uppercase;
        font-size: .75em;
        font-weight: 700;
      }
      &.enable {
        background-image: url('/static/img/icons/on.svg');
        transform: translateX(0);
        opacity: 1;
      }
      &:hover {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }
  footer {
    margin: 0 4em 5vh 4em;
    height: 7.5vh;
    display: flex;
    align-items: center;
    color: white;
    opacity: .85;
    div {
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      &.left {
        justify-content: flex-start;
        img {
          display: block;
          width: auto;
          height: 100%;
        }
        div.watson {
          display: block;
          width: auto;
          margin-left: 4em;
          height: 80%;
          span {
            display: block;
            height: 25%;
            text-align: center;
            font-size: .95em;
          }
          img {
            height: 75%;
          }
        }
      }
      &.right {
        justify-content: flex-end;
        a {
          display: block;
          font-size: 2em;
          margin: 0 .25em;
          color: white;
          text-decoration: none;
          transition: all .25s;
          &.twitter:hover {
            color: #1da1f3;
          }
          &.github:hover {
            color: #191717;
          }
        }
      }
    }
  }
}
.mask {
  position: absolute;
  width: 80%;
  height: 65vh;
  max-width: 1280px;
  margin: 0 auto;
  top: 0; right: 0; left: 0;
  border-radius: .0625em;
}
</style>
