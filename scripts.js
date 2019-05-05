let pomodoro = {
    started: false,
    session: false,
    sessions: 0,
    minutes: 0,
    seconds: 0,
    breaks: 0,
    minutesDom: 0,
    scondsDom: 0,
    sessionsDom: 0,
    breaksDom: 0,
    interval: null,
    init: function() {
        let self = this;
        this.minutesDom = document.querySelector('#minutes');
        this.secondsDom = document.querySelector('#seconds');
        this.sessionsDom = document.querySelector('#sessions');
        this.breaksDom = document.querySelector('#breaks');
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
    resetValues: function(mins, secs, started, sess) {
        this.minutes = mins;
        this.seconds = secs;
        this.started = started; 
        this.session= sess;
    },
    startWork: function () {
        this.resetValues(25,0,true, true)
    },
    breakWork: function() {
        this.resetValues(5,0,true, false)
    },
    stopWork: function() {
        this.resetValues(25,0,false, false)
        this.updateTime();
    },
    workComplete: function() {
        this.started = false;
        if(this.session){
            this.sessions += 1;
        }else{ 
            this.breaks += 1;
        }
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
            this.updateStats();
            return;
          }
          this.seconds = 59;
          this.minutes--;
        } else {
          this.seconds--;
        }
        this.updateTime();
    },
    updateTime : function() {
        this.minutesDom.innerHTML = this.doubleDigit(this.minutes);
        this.secondsDom.innerHTML = this.doubleDigit(this.seconds);
    },
    updateStats: function() {
        this.sessionsDom.innerHTML = this.sessions;
        this.breaksDom.innerHTML = this.breaks;
    }
}

window.onload = function(){
    pomodoro.init();
};