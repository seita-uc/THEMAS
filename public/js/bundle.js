(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var langs = {
  'en': ['English', 'ws://wikimon.hatnote.com:9000'],
  'de': ['German', 'ws://wikimon.hatnote.com:9010'],
  'ru': ['Russian', 'ws://wikimon.hatnote.com:9020'],
  'uk': ['Ukrainian', 'ws://wikimon.hatnote.com:9310'],
  'ja': ['Japanese', 'ws://wikimon.hatnote.com:9030'],
  'es': ['Spanish', 'ws://wikimon.hatnote.com:9040'],
  'fr': ['French', 'ws://wikimon.hatnote.com:9050'],
  'nl': ['Dutch', 'ws://wikimon.hatnote.com:9060'],
  'it': ['Italian', 'ws://wikimon.hatnote.com:9070'],
  'sv': ['Swedish', 'ws://wikimon.hatnote.com:9080'],
  'ar': ['Arabic', 'ws://wikimon.hatnote.com:9090'],
  'fa': ['Farsi', 'ws://wikimon.hatnote.com:9210'],
  'he': ['Hebrew', 'ws://wikimon.hatnote.com:9230'],
  'id': ['Indonesian', 'ws://wikimon.hatnote.com:9100'],
  'zh': ['Chinese', 'ws://wikimon.hatnote.com:9240'],
  'as': ['Assamese', 'ws://wikimon.hatnote.com:9150'],
  'hi': ['Hindi', 'ws://wikimon.hatnote.com:9140'],
  'bn': ['Bengali', 'ws://wikimon.hatnote.com:9160'],
  'pa': ['Punjabi', 'ws://wikimon.hatnote.com:9120'],
  'te': ['Telugu', 'ws://wikimon.hatnote.com:9165'],
  'ta': ['Tamil', 'ws://wikimon.hatnote.com:9110'],
  'ml': ['Malayalam', 'ws://wikimon.hatnote.com:9250'],
  'mr': ['Western Mari', 'ws://wikimon.hatnote.com:9130'],
  'kn': ['Kannada', 'ws://wikimon.hatnote.com:9170'],
  'or': ['Oriya', 'ws://wikimon.hatnote.com:9180'],
  'sa': ['Sanskrit', 'ws://wikimon.hatnote.com:9190'],
  'gu': ['Gujarati', 'ws://wikimon.hatnote.com:9200'],
  'pl': ['Polish', 'ws://wikimon.hatnote.com:9260'],
  'mk': ['Macedonian', 'ws://wikimon.hatnote.com:9270'],
  'be': ['Belarusian', 'ws://wikimon.hatnote.com:9280'],
  'sr': ['Serbian', 'ws://wikimon.hatnote.com:9290'],
  'bg': ['Bulgarian', 'ws://wikimon.hatnote.com:9300'],
  'hu': ['Hungarian', 'ws://wikimon.hatnote.com:9320'],
  'fi': ['Finnish', 'ws://wikimon.hatnote.com:9330'],
  'no': ['Norwegian', 'ws://wikimon.hatnote.com:9340'],
  'el': ['Greek', 'ws://wikimon.hatnote.com:9350'],
  'eo': ['Esperanto', 'ws://wikimon.hatnote.com:9360'],
  'pt': ['Portuguese', 'ws://wikimon.hatnote.com:9370'],
  'et': ['Estonian', 'ws://wikimon.hatnote.com:9380'],
  'wikidata': ['Wikidata', 'ws://wikimon.hatnote.com:9220']
};
var w = window.innerWidth;
var h = window.innerHeight;
var side_margin = Math.floor(w % 300 / 2);
var svgwrapper = d3.select("#svg-wrapper").attr("width", Math.floor(w / 300) * 300).attr("height", h).style("margin-left", "".concat(side_margin / 3 * 2, "px")); //.style("margin-right", side_margin);

var width = 300;
var height = 300;
var sound = new buzz.sound("./sound/heartbeat", {
  formats: ["mp3"]
});
var svgs = {};

for (var lang in langs) {
  var svg = d3.select("#svg-wrapper").append("svg").attr("id", lang).attr("width", width).attr("height", height);
  langs[lang].push(svg);
}

function randomColor() {
  var colors = ["red", "blue", "lightblue", "green", "yellow", "purple", "orange", "grey"];
  var i = Math.floor(Math.abs(Math.random() * 100) % colors.length);
  return colors[i];
}

var LangListener =
/*#__PURE__*/
function () {
  function LangListener(language) {
    _classCallCheck(this, LangListener);

    this.svg = langs[language][2];
    this.language = language;
    this.color = colorScale(Math.random(1));
    this.socket = new WebSocket(langs[language][1]);
    this.mute = true;
    this.beating = false;
    this.colorScale = 0.1;
    this.circle_group = this.svg.append('g').attr('transform', 'translate(' + width / 2 + ', ' + height / 2 + ')');
    this.heart = this.svg.append('circle').attr('id', 'heart-' + language).attr('transform', 'translate(' + width / 2 + ', ' + height / 2 + ')').style('opacity', 0.1).attr("r", 80).attr("stroke", 'none').attr('fill', d3.interpolateLab(this.color, "black")(this.colorScale));
    this.circle_group.append('text').text(langs[this.language][0]).attr('fill', "black").classed('article-label', true).attr('text-anchor', 'middle');
  }

  _createClass(LangListener, [{
    key: "subscribe",
    value: function subscribe() {
      var self = this;
      var stop = setInterval(function () {
        var opacity = parseFloat($('#heart-' + self.language).css('opacity'));

        if (self.beating) {
          if (self.colorScale > 0.1) {
            var previousColor = self.colorScale;
            self.colorScale = previousColor - 0.1;
            var previousOpacity = opacity;
            opacity = previousOpacity - 0.1;

            if (opacity < 0.1) {
              opacity = 0.1;
            }

            ;
            self.heart.transition().duration(1000).attr('fill', d3.interpolateLab(self.color, "black")(self.colorScale)).style('opacity', opacity);
          }
        } else {
          var _previousColor = self.colorScale;
          self.colorScale = _previousColor + 0.1;

          if (self.colorScale >= 1) {
            self.colorScale = 1;
          }

          opacity = opacity + 0.1;

          if (opacity >= 0.8) {
            opacity = 0.8;
          }

          self.heart.transition().duration(1000).attr('fill', d3.interpolateLab(self.color, "black")(self.colorScale)).style('opacity', opacity);
        }
      }, 3000);
      $('#' + self.language).mouseout(function (event) {
        self.mute = true;
      });
      $('#' + self.language).mouseover(function (event) {
        self.mute = false;
      });
      this.socket.addEventListener('open', function (event) {
        self.socket.send('Hello Server!');
      });
      this.socket.addEventListener('message', function (event) {
        var change_size = JSON.parse(event.data)["change_size"];
        self.beating = true;

        if (!self.mute) {
          sound.play();
        }

        self.beat();
        self.renderCircle(change_size);
      });
      self.beat();
    }
  }, {
    key: "renderCircle",
    value: function renderCircle(csize) {
      var self = this;
      var size = Math.abs(csize);

      if (size > 100) {
        size = 100;
      }

      this.circle_group.append('circle').style('opacity', 0.7).attr("r", size + 20).attr("stroke", 'none').attr('fill', this.color).transition().attr('r', size + 40).style('opacity', 0.1).ease(d3.easeSin).duration(2500).remove().on("end", function () {
        self.beating = false;
      });
    }
  }, {
    key: "beat",
    value: function beat() {
      var self = this;
      var beating = false;
      var radiusScale = d3.scaleLinear().range([35, 80]).domain([60000, 1000]);
      if (beating) return;
      beating = true; //if (data.length > 0 && data[data.length - 1].date > now) {
      //data.splice(data.length - 1, 1);
      //}
      //data.push({
      //date: now,
      //value: 0
      //});

      var heartTransition = this.heart.transition().duration(300).attr("r", 80); //const stop = setInterval(() => {
      //  if (self.lastBeat === 0) {
      //    self.lastBeat = new Date().getTime();
      //  } else {
      //    const currentTime = new Date().getTime();
      //    const diff = currentTime - self.lastBeat
      //    self.lastBeat = currentTime;
      //    if(diff < 10000 || diff > 20000) {
      //      clearInterval(stop);
      //    } else if (diff < 20000) {
      //      console.log(radiusScale(diff))
      //      heartTransition = this.heart
      //        .transition()
      //        .duration(100)
      //        .attr("r", radiusScale(diff));
      //    } else {
      //      clearInterval(stop);
      //    }
      //  };
      //}, 100);
    }
  }]);

  return LangListener;
}();

var colorScale = d3.scaleSequential(d3.interpolateRainbow).domain([0, 1]);
var English = new LangListener('en');
var Japanese = new LangListener('ja');
var Russian = new LangListener('ru');
var Spanish = new LangListener('es');
var Chinese = new LangListener('zh');
var French = new LangListener('fr');
var Arabic = new LangListener('ar');
var Ukrainian = new LangListener('uk');
var German = new LangListener('de');
var Dutch = new LangListener('nl');
var Italian = new LangListener('it');
var Swedish = new LangListener('sv');
var Farsi = new LangListener('fa');
var Hebrew = new LangListener('he');
var Indonesian = new LangListener('id');
var Assamese = new LangListener('as');
var Hindi = new LangListener('hi');
var Bengali = new LangListener('bn');
var Punjabi = new LangListener('pa');
var Telugu = new LangListener('te');
var Tamil = new LangListener('ta');
var Malayalam = new LangListener('ml');
var Western = new LangListener('mr');
var Kannada = new LangListener('kn');
var Oriya = new LangListener('or');
var Sanskrit = new LangListener('sa');
var Gujarati = new LangListener('gu');
var Polish = new LangListener('pl');
var Macedonian = new LangListener('mk');
var Belarusian = new LangListener('be');
var Serbian = new LangListener('sr');
var Bulgarian = new LangListener('bg');
var Hungarian = new LangListener('hu');
var Finnish = new LangListener('fi');
var Norwegian = new LangListener('no');
var Greek = new LangListener('el');
var Esperanto = new LangListener('eo');
var Portuguese = new LangListener('pt');
var Estonian = new LangListener('et');
English.subscribe();
Japanese.subscribe();
Russian.subscribe();
Spanish.subscribe();
Chinese.subscribe();
German.subscribe();
French.subscribe();
Arabic.subscribe();
Ukrainian.subscribe();
Dutch.subscribe();
Italian.subscribe();
Swedish.subscribe();
Farsi.subscribe();
Hebrew.subscribe();
Indonesian.subscribe();
Assamese.subscribe();
Hindi.subscribe();
Bengali.subscribe();
Punjabi.subscribe();
Telugu.subscribe();
Tamil.subscribe();
Malayalam.subscribe();
Western.subscribe();
Kannada.subscribe();
Oriya.subscribe();
Sanskrit.subscribe();
Gujarati.subscribe();
Polish.subscribe();
Macedonian.subscribe();
Belarusian.subscribe();
Serbian.subscribe();
Bulgarian.subscribe();
Hungarian.subscribe();
Finnish.subscribe();
Norwegian.subscribe();
Greek.subscribe();
Esperanto.subscribe();
Portuguese.subscribe();
Estonian.subscribe();

},{}]},{},[1]);
