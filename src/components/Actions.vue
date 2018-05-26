<template>
  <div id="actions" class="mask">
    <h2>¿Qué gesto vas a hacer?</h2>
    <div class="buttons">
      <button id="neutral" @click="takePicture()">Neutral</button>
      <button id="happy" @click="takePicture()">Feliz</button>
      <button id="angry" @click="takePicture()">Enojado</button>
      <button id="sad" @click="takePicture()">Triste</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'actions',
  methods: {
    takePicture () {
      var _this = this
      _this.$parent.actionsAvailable = false
      window.setTimeout(function () {
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

          // var photo = document.createElement('img')
          // photo.setAttribute('src', data)
          // photo.setAttribute('style', 'position:absolute;top:0;left:0;')
          // document.getElementById('app').appendChild(photo)
          // console.log(photo)

          _this.$parent.timerSeconds = 0
          _this.$parent.stillPhoto = data

          window.setTimeout(function () {
            _this.$parent.stillPhoto = ''
            _this.$parent.actionsAvailable = true
          }, 4500)
        }, 5000)
      }, 1000)
    },
    keydown (event) {
      console.log(event.keyCode)
      switch (event.keyCode) {
        case 65:
          document.getElementById('neutral').click()
          break
        case 49:
          document.getElementById('happy').click()
          break
        case 66:
          document.getElementById('angry').click()
          break
        case 50:
          document.getElementById('sad').click()
          break
      }
    }
  },
  mounted () {
    document.getElementById('actions').style.top = window.webcam.offsetTop + 'px'
    document.addEventListener('keydown', this.keydown, false)
  },
  destroyed () {
    document.removeEventListener('keydown', this.keydown, true)
  }
}
</script>

<style scoped lang="scss">
#actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  h2 {
    margin: 0 2em 1em 2em;
    font-size: 4em;
    font-weight: 700;
    color: white;
    text-align: center;
    text-shadow: 0 .25em .25em rgba(0,0,0,.25);
  }
  div.buttons {
    margin: 0 4em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      width: 10em;
      height: 10em;
      appearance: none;
      border-radius: 100%;
      border: none;
      cursor: pointer;
      box-shadow: 0 .25em .25em rgba(0,0,0,.25);
      transition: all .25s;
      font-family: $main-font;
      background-size: 95%;
      background-position: center;
      background-repeat: no-repeat;
      text-indent: -9000px;
      &#neutral {
        background-color: #eee;
        // border-color: darken(#eee, 5%);
        // color: darken(#eee, 50%);
        background-image: url('../assets/twemoji/1f610.svg');
      }
      &#happy {
        background-color: #7ed321;
        // border-color: darken(#7ed321, 5%);
        // color: darken(#7ed321, 15%);
        background-image: url('../assets/twemoji/1f603.svg');
      }
      &#angry {
        background-color: #b0021b;
        // border-color: darken(#b0021b, 5%);
        // color: darken(#b0021b, 15%);
        background-image: url('../assets/twemoji/1f621.svg');
      }
      &#sad {
        background-color: #4a90e2;
        // border-color: darken(#4a90e2, 5%);
        // color: darken(#4a90e2, 15%);
        background-image: url('../assets/twemoji/1f622.svg');
      }
      &:hover {
        transform: scale(1.15);
        box-shadow: 0 .5em .25em rgba(0,0,0,.25);
      }
      &:active {
        transform: scale(1);
        box-shadow: 0 .25em .25em rgba(0,0,0,.25), inset 0 0 .25em rgba(0,0,0,.25);
      }
    }
  }
}
</style>
