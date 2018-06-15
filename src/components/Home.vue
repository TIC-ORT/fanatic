<template>
  <main>
    <header>
      <h1>FanaTIC</h1>
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
    <footer>
      <img src="/static/img/logos/ort.svg" width="280" height="160" alt="ORT Argentina" style="position:relative;top:5%;" />
      <img src="/static/img/logos/tic.svg" width="182" height="160" alt="TIC" />
    </footer>
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
      timerSeconds: 0,
      stillPhoto: '',
      match: null
    }
  },
  methods: {
    fetchMatch () {
      var _this = this
      _this.feedbackMessage = 'Conectando con el servidor...'
      _this.$http.get('/match').then(function (res) {
        _this.feedbackMessage = ''
        _this.feedbackClass = ''
        _this.match = res.data
        _this.actionsAvailable = true
      }).catch(function (err) {
        _this.feedbackMessage = 'Ha ocurrido un error al conectarse con el servidor'
        _this.feedbackClass = 'error'
        console.error('Connection error!', err)
      })
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
    opacity: .85;
    h1 {
      background-image: url('/static/img/logos/fanatic.svg');
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      font-size: 1em;
      height: 160%;
      margin: 0;
      padding: 0;
      text-indent: -9000em;
    }
  }
  footer {
    margin: 0 4em 5vh 4em;
    height: 7.5vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    opacity: .85;
    img {
      display: block;
      margin: 0 2em;
      height: 120%;
      width: auto;
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
