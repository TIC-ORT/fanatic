<template>
  <div id="training-mode">
    <button id="neutral" @click="takePicture()">Neutral</button>
    <button id="happy">Feliz</button>
    <button id="angry">Enojado</button>
    <button id="sad">Triste</button>
  </div>
</template>

<script>
export default {
  name: 'training-mode',
  methods: {
    takePicture () {
      var _this = this
      _this.$parent.timerSeconds = 5
      window.setTimeout(function () {
        var width = 960
        var height = 720

        var canvas = document.createElement('canvas')
        var context = canvas.getContext('2d')

        canvas.width = width
        canvas.height = height

        context.drawImage(window.webcam, 0, 0, width, height)

        var data = canvas.toDataURL('image/jpeg')

        var photo = document.createElement('img')
        photo.setAttribute('src', data)
        // photo.setAttribute('style', 'position:absolute;top:0;left:0;')
        // document.getElementById('app').appendChild(photo)
        console.log(photo)
        _this.$parent.timerSeconds = 0
      }, 5000)
    }
  }
}
</script>

<style scoped lang="scss">
#training-mode {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  margin: 0 auto;
  position: absolute;
  right: 0; bottom: 22.5%; left: 0;
  button {
    width: 8em;
    height: 8em;
    appearance: none;
    border-radius: 100%;
    border: solid .5em;
    cursor: pointer;
    box-shadow: 0 .25em .25em rgba(0,0,0,.25);
    transition: all .25s;
    font-family: $main-font;
    &#neutral {
      background: #eee;
      border-color: darken(#eee, 5%);
      color: darken(#eee, 50%);
    }
    &#happy {
      background: #7ed321;
      border-color: darken(#7ed321, 5%);
      color: darken(#7ed321, 15%);
    }
    &#angry {
      background: #b0021b;
      border-color: darken(#b0021b, 5%);
      color: darken(#b0021b, 15%);
    }
    &#sad {
      background: #4a90e2;
      border-color: darken(#4a90e2, 5%);
      color: darken(#4a90e2, 15%);
    }
    &:hover {
      transform: translateY(-.25em);
      box-shadow: 0 .5em .25em rgba(0,0,0,.25);
    }
    &:active {
      transform: translateY(.25em);
      box-shadow: 0 .25em .25em rgba(0,0,0,.25), inset 0 0 .25em rgba(0,0,0,.25);
    }
  }
}
</style>
