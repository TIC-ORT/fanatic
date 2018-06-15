<template>
  <div id="actions" class="mask" v-if="$parent.match">
    <h3>
      <img :src="'/static/img/flags/' + $parent.match.team_one.toLowerCase() + '.svg'" width="36" height="36" :alt="$parent.match.team_one" />
      <abbr title="versus">vs</abbr>
      <img :src="'/static/img/flags/' + $parent.match.team_two.toLowerCase() + '.svg'" width="36" height="36" :alt="$parent.match.team_two" />
    </h3>
    <h2>¿Qué sensasión tenes para el partido?</h2>
    <div class="buttons animated fadeInUpBig">
      <button id="guess" @click="takePicture('guess')" @mousedown="holdingAction(true, 'ceroKey')" @mouseup="holdingAction(false)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
          <path fill="#66757F" d="M4 5s0-1 1-1h6s1 0 1 1v2H4V5z"/>
          <path fill="#292F33" d="M0 10s0-4 4-4h28s4 0 4 4v18s0 4-4 4H4s-4 0-4-4V10z"/>
          <circle fill="#CCD6DD" cx="21" cy="19" r="10"/>
          <circle fill="#292F33" cx="21" cy="19" r="8"/>
          <circle fill="#3B88C3" cx="21" cy="19" r="5"/>
          <circle fill="#FFF" cx="32.5" cy="9.5" r="1.5"/>
          <path fill="#F5F8FA" d="M12 9.5c0 .829-.671 1.5-1.5 1.5h-5C4.671 11 4 10.329 4 9.5S4.671 8 5.5 8h5c.829 0 1.5.671 1.5 1.5z"/>
          <path class="flash" fill="#FFAC33" d="M16 9l3-6-6 2-4-5-2 5-6-1 4 6-5 4h6l-2 6 6-3 6 5-1-8 6-1z"/>
          <path class="flash" fill="#FFF" d="M10 14l-3 2 1-3-3-1 3-2-3-3h4l1-3 2 3 3-1-2 3 3 3-3 1 1 4z"/>
        </svg>
      </button>
    </div>
  </div>
  <div id="actions" class="mask" v-else>
    <h3>Enseñale a Watson cómo siente un hincha argentin@</h3>
    <h2>¿Qué sentimiento vas a hacer?</h2>
    <div class="buttons training animated fadeInUpBig">
      <button id="victory" @click="takePicture('victory')" @mousedown="holdingAction(true, 'firstKey')" @mouseup="holdingAction(false)"><victory></victory></button>
      <button id="defeat" @click="takePicture('defeat')" @mousedown="holdingAction(true, 'secondKey')" @mouseup="holdingAction(false)"><defeat></defeat></button>
    </div>
  </div>
</template>

<script>
import Victory from './Victory'
import Defeat from './Defeat'
export default {
  name: 'actions',
  components: {
    'victory': Victory,
    'defeat': Defeat
  },
  data () {
    return {
      settingKey: '',
      actionStarted: false
    }
  },
  methods: {
    takePicture (category) {
      var _this = this
      _this.$parent.actionsAvailable = false
      window.setTimeout(function () {
        _this.$parent.timerSeconds = 3
        window.setTimeout(function () {
          var width = 1920
          var height = 1080

          var canvas = document.createElement('canvas')
          var context = canvas.getContext('2d')

          canvas.width = width
          canvas.height = height

          context.drawImage(window.webcam, 0, 0, width, height)

          canvas.toBlob(function (blob) {
            if (category === 'guess') {
              _this.classify(blob).then(function (res) {
                _this.$parent.feedbackMessage = 'thanks'
                _this.$parent.feedbackClass = 'success'
                window.setTimeout(function () {
                  _this.$parent.feedbackMessage = ''
                  _this.$parent.feedbackClass = ''
                  _this.$parent.stillPhoto = ''
                }, 1000)
                window.setTimeout(function () {
                  _this.$parent.actionsAvailable = true
                }, 1500)
              }).catch(function (err) {
                _this.handleError(err)
              })
            } else {
              _this.upload(blob, category).then(function (res) {
                _this.$parent.feedbackMessage = category
                _this.$parent.feedbackClass = 'success'
                window.setTimeout(function () {
                  _this.$parent.feedbackMessage = ''
                  _this.$parent.feedbackClass = ''
                  _this.$parent.stillPhoto = ''
                }, 1000)
                window.setTimeout(function () {
                  _this.$parent.actionsAvailable = true
                }, 1500)
              }).catch(function (err) {
                _this.handleError(err)
              })
            }
          }, 'image/jpeg', 1)

          var data = canvas.toDataURL('image/jpeg')

          _this.$parent.timerSeconds = 0
          _this.$parent.stillPhoto = data
          _this.$parent.feedbackClass = 'loading'
        }, 3000)
      }, 1000)
    },
    upload (photo, category) {
      var data = new FormData()
      data.append('photo', photo)
      data.append('category', category)
      data.append('bucket', process.env.FANATIC_BUCKET)
      return this.$http.post('/upload', data)
    },
    classify (photo) {
      var data = new FormData()
      data.append('photo', photo)
      return this.$http.post('/classify', data)
    },
    handleError (error) {
      var _this = this
      _this.$parent.feedbackMessage = 'Ha ocurrido un error al enviar la imagen'
      _this.$parent.feedbackClass = 'error'
      console.error('Uploading error!', error)
      window.setTimeout(function () {
        _this.$parent.feedbackMessage = ''
        _this.$parent.feedbackClass = ''
        _this.$parent.stillPhoto = ''
      }, 3000)
      window.setTimeout(function () {
        _this.$parent.actionsAvailable = true
      }, 3500)
    },
    holdingAction (holding, action) {
      var _this = this
      if (holding) {
        _this.keyboardTimeout = window.setTimeout(function () {
          window.alert('Presione la tecla que desea configurar a continuación.')
          _this.settingKey = action
        }, 3000)
      } else {
        clearTimeout(_this.keyboardTimeout)
      }
    },
    pushingButton (event) {
      if (this.settingKey === '') {
        if (!this.actionStarted) {
          if (event.keyCode === parseInt(localStorage.getItem('ceroKey'))) {
            this.actionStarted = true
            this.pushAction('guess')
          } else if (event.keyCode === parseInt(localStorage.getItem('firstKey'))) {
            this.actionStarted = true
            this.pushAction('victory')
          } else if (event.keyCode === parseInt(localStorage.getItem('secondKey'))) {
            this.actionStarted = true
            this.pushAction('defeat')
          }
        }
      } else {
        localStorage.setItem(this.settingKey, event.keyCode)
        this.settingKey = ''
      }
    },
    pushAction (action) {
      var _this = this
      document.getElementById(action).classList.add('active')
      document.getElementById(action).parentElement.classList.add('pressed')
      window.setTimeout(function () {
        _this.takePicture(action)
      }, 1000)
    }
  },
  mounted () {
    document.getElementById('actions').style.top = window.webcam.offsetTop + 'px'
    document.addEventListener('keyup', this.pushingButton, false)
  },
  destroyed () {
    document.removeEventListener('keyup', this.pushingButton, true)
  }
}
</script>

<style scoped lang="scss">
#actions {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  h2, h3 {
    font-weight: 700;
    color: white;
    text-align: center;
    text-shadow: 0 0 .25em rgba(0,0,0,.25);
  }
  h2 {
    margin: .75em 4rem 0 4rem;
    font-size: 3em;
  }
  h3 {
    margin: 2em 4rem 0 4rem;
    font-size: 2em;
    img {
      display: inline-block;
      height: 3em;
      width: auto;
      vertical-align: middle;
    }
    abbr {
      display: inline-block;
      text-decoration: none;
      margin: 1em 1em;
    }
  }
  div.buttons {
    position: absolute;
    right: 0; bottom: 0; left: 0;
    width: 100%;
    margin: 0;
    display: flex;
    justify-content: space-evenly;
    button {
      width: 50%;
      height: 25vh;
      appearance: none;
      border: none;
      cursor: pointer;
      transition: all .25s;
      font-family: $main-font;
      background: none;
      div {
        height: 100%;
      }
      &#guess {
        width: 25vh;
        height: 25vh;
        margin: 2.5vh auto;
        background: rgba(255,255,255,0.25);
        border-radius: 100%;
        svg {
          display: block;
          width: 60%;
          height: auto;
          margin: 0 auto;
          .flash {
            opacity: 0;
            transition: all .5s;
            animation-name: fadeOut;
            animation-timing-function: ease;
            animation-duration: 1s;
            animation-fill-mode: both;
          }
        }
        &:hover, &.active {
          svg {
            .flash {
              animation-name: flash;
            }
          }
        }
      }
    }
    &.training {
      background: rgba(255,255,255,0.25);
      &.pressed {
        button {
          transition: all ease .75s;
          opacity: 0;
          &.active {
            opacity: 1;
            &:first-child {
              transform: translateX(50%);
            }
            &:last-child {
              transform: translateX(-50%);
            }
          }
        }
      }
    }
  }
}
</style>
