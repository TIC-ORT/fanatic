<template>
  <video id="webcam" width="960" height="720"></video>
</template>

<script>
export default {
  name: 'webcam',
  mounted () {
    var _this = this
    window.webcam = document.getElementById('webcam')
    navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(function (stream) {
      window.webcam.srcObject = stream
      window.webcam.play()
      _this.$parent.feedbackMessage = ''
      _this.$parent.feedbackClass = ''
      _this.$parent.actionsAvailable = true
    }).catch(function (err) {
      console.log('An error occured! ' + err)
    })
  }
}
</script>

<style scoped lang="scss">
video {
  display: block;
  width: 80%;
  height: 65vh;
  max-width: 960px;
  margin: 5vh auto;
  box-shadow: 0 0 0 1em rgba(255,255,255,0.25);
  border-radius: .0625em;
  object-fit: initial;
}
</style>
