<template>
  <main>
    <header>
      <h1>FanaTIC</h1>
      <label :class="{ enable: trainingModeEnable }">
        <span>Training mode</span>
        <input type="checkbox" v-model="trainingModeEnable" disabled="disabled" />
      </label>
    </header>
    <webcam></webcam>
    <timer v-if="timerSeconds > 0" :seconds="timerSeconds"></timer>
    <photo v-if="stillPhoto !== ''" :source="stillPhoto"></photo>
    <training-mode></training-mode>
    <footer>
      <!-- <img src="../assets/tic-logo.svg" alt="Tecnología de la Información y la Comunicación" width="140" height="120" />
      <img src="../assets/ort-logo.svg" alt="Escuelta Técnica ORT" width="260" height="120" /> -->
    </footer>
  </main>
</template>

<script>
import Webcam from './Webcam'
import Timer from './Timer'
import Photo from './Photo'
import TrainingMode from './TrainingMode'
export default {
  name: 'home',
  components: {
    'webcam': Webcam,
    'timer': Timer,
    'photo': Photo,
    'training-mode': TrainingMode
  },
  data () {
    return {
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
  background: url('../assets/grass.png');
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) { 
    background: url('../assets/grass@2x.png');
  }
  @media (-webkit-min-device-pixel-ratio: 3), (min-resolution: 288dpi) { 
    background: url('../assets/grass@3x.png');
  }
  box-shadow: inset 0 0 0 1em rgba(255,255,255,0.25);
  overflow: hidden;
  position: relative;
  header {
    margin: 2.5%;
    height: 10%;
    width: 100%;
    h1 {
      background-image: url('../assets/fanatic.svg');
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
      background-image: url('../assets/icons/off.svg');
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
        background-image: url('../assets/icons/on.svg');
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
    margin: 2.5%;
    height: 10%;
    width: 100%;
  }
}
.mask {
  position: absolute;
  width: 60%;
  height: 65%;
  margin: 0 auto;
  top: 0; right: 0; left: 0;
  border-radius: .0625em;
}
</style>
