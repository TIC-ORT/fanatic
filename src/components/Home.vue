<template>
  <main>
    <header>
      <h1>FanaTIC</h1>
      <label :class="{ enable: trainingMode }">
        <input type="checkbox" v-model="trainingMode" />
        <span>Training mode:</span> <strong>{{ trainingMode ? 'On' : 'Off' }}</strong>
      </label>
    </header>
    <video id="webcam" width="960" height="720"></video>
    <footer>
      <!-- <img src="../assets/tic-logo.svg" alt="Tecnología de la Información y la Comunicación" width="140" height="120" />
      <img src="../assets/ort-logo.svg" alt="Escuelta Técnica ORT" width="260" height="120" /> -->
    </footer>
  </main>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      trainingMode: true
    }
  },
  mounted () {
    window.webcam = document.getElementById('webcam')
    navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(function (stream) {
      window.webcam.srcObject = stream
      window.webcam.play()
    }).catch(function (err) {
      console.log('An error occured! ' + err)
    })
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
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  video {
    width: auto;
    max-height: 60vh;
    box-shadow: 0 0 0 1em rgba(255,255,255,0.25);
    border-radius: .0625em;
  }
  header {
    position: absolute;
    top: 0; right: 0; left: 0;
    padding: 2em;
    h1 {
      background-image: url('../assets/fanatic.svg');
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      font-size: 1em;
      height: 8em;
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
      opacity: .65;
      transition: all .25s;
      cursor: pointer;
      width: 10em;
      text-align: center;
      input {
        display: block;
        appearance: none;
        width: 4em;
        height: 4em;
        background-image: url('../assets/training.svg');
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        margin: .5em auto;
      }
      span, strong {
        /* font-size: 1.25em; */
      }
      span {
        margin-right: .5em;
      }
      strong {
        display: inline-block;
        font-family: $alt-font;
        font-weight: 400;
      }
      &.enable {
        opacity: .85;
      }
      &:hover {
        opacity: 1;
      }
    }
  }
  footer {
    position: absolute;
    right: 0; bottom: 0; left: 0;
  }
}
</style>
