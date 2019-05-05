let pomodoro = {
    started: false,
    minutes: 0,
    seconds: 0,
    minutesDom: 0,
    scondsDom: 0,
    interval: null,
    init: function() {
        let self = this;
        this.minutesDom = document.querySelector('#minutes');
        this.secondsDom = document.querySelector('#seconds');
        this.interval = setInterval(() => {
            self.intervalCallback.apply(self);
        }, 1000);
        document.querySelector('#start').onclick = () => {
            self.startWork.apply(self);
        };
        document.querySelector('#break').onclick = () => {
            self.breakWork.apply(self);
        };
        document.querySelector('#stop').onclick = () => {
            self.stopWork.apply(self);
        };
    },
    resetValues: function(mins, secs, started) {
        this.minutes = mins;
        this.seconds = secs;
        this.started = started; 
    },
    startWork: function () {
        this.resetValues(25,0,true)
    },
    breakWork: function() {
        this.resetValues(5,0,true)
    },
    stopWork: function() {
        this.resetValues(25,0,false)
        this.updateDom();
    },
    workComplete: function() {
        this.started = false;
    },
    doubleDigit: function(number) {
        if(number < 10) {
            return "0" + parseInt(number, 10);
        }
        return number;
    },
    intervalCallback : function() {
        if(!this.started) return false;
        if(this.seconds == 0) {
          if(this.minutes == 0) {
            this.workComplete();
            return;
          }
          this.seconds = 59;
          this.minutes--;
        } else {
          this.seconds--;
        }
        this.updateDom();
    },
    updateDom : function() {
        this.minutesDom.innerHTML = this.doubleDigit(this.minutes);
        this.secondsDom.innerHTML = this.doubleDigit(this.seconds);
    }
}

window.onload = function(){
    pomodoro.init();
};