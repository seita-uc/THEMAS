import { langs, modCount, subscribe } from './websocket.js';

let w = window.innerWidth;
let h = window.innerHeight;
let side_margin = Math.floor((w%300)/2)
var svgwrapper = d3.select("#svg-wrapper")
  .attr("width", Math.floor((w/300))*300)
  .attr("height", h)
  .style("margin-left", `${side_margin/3*2}px`)
  //.style("margin-right", side_margin);

var width = 300;
var height = 300;

const sound = new buzz.sound("./sound/heartbeat", {
  formats: ["mp3"]
});

var svgs = {}

for(let lang in langs) {
  let svg = d3.select("#svg-wrapper")
    .append("svg")
    .attr("id", lang)
    .attr("width", width)
    .attr("height", height)

  langs[lang].push(svg);
}

function randomColor() {
  let colors = [
    "red",
    "blue",
    "lightblue",
    "green",
    "yellow",
    "purple",
    "orange",
    "grey",
  ]

  let i = Math.floor(Math.abs(Math.random() * 100) % colors.length);
  return colors[i]
}

class LangListener {
 
  constructor(language) {
    this.svg = langs[language][2];
    this.language = language;
    this.color = colorScale(Math.random(1));
    this.socket = new WebSocket(langs[language][1]);
    this.mute = true;
    this.beating = false;
    this.colorScale = 0.1;
    this.circle_group = this.svg.append('g')
      .attr('transform', 'translate(' + width/2 + ', ' + height/2 + ')');
    this.heart = this.svg.append('circle')
      .attr('id', 'heart-' + language)
      .attr('transform', 'translate(' + width/2 + ', ' + height/2 + ')')
      .style('opacity', 0.1)
      .attr("r", 80)
      .attr("stroke", 'none')
      .attr('fill', d3.interpolateLab(this.color, "black")(this.colorScale));
    this.circle_group
      .append('text')
      .text(langs[this.language][0])
      .attr('fill', "black")
      .classed('article-label', true)
      .attr('text-anchor', 'middle');
  }

  subscribe() {
    let self = this
    const stop = setInterval(() => {
      let opacity = parseFloat($('#heart-' + self.language).css('opacity'));
      if(self.beating) {
        if (self.colorScale > 0.1) {
          let previousColor = self.colorScale;
          self.colorScale = previousColor - 0.1;
          let previousOpacity = opacity;
          opacity = previousOpacity - 0.1;
          if (opacity < 0.1) {
            opacity = 0.1;
          };
          self.heart
            .transition()
            .duration(1000)
            .attr('fill', d3.interpolateLab(self.color, "black")(self.colorScale))
            .style('opacity', opacity);
        }
      } else {
        let previousColor = self.colorScale;
        self.colorScale = previousColor + 0.1;
        if (self.colorScale >= 1) {
          self.colorScale = 1;
        } 
        opacity = opacity + 0.1;
        if (opacity >= 0.8) {
          opacity = 0.8;
        }
        self.heart
          .transition()
          .duration(1000)
          .attr('fill', d3.interpolateLab(self.color, "black")(self.colorScale))
          .style('opacity', opacity);
      }
    }, 3000);

    $('#' + self.language).mouseout(function (event) {
      self.mute = true;
    })

    $('#' + self.language).mouseover(function (event) {
      self.mute = false;
    })

    this.socket.addEventListener('open', function (event) {
      self.socket.send('Hello Server!');
    });

    this.socket.addEventListener('message', function (event) {
      let change_size = JSON.parse(event.data)["change_size"];
      self.beating = true;
      if (!self.mute) {
        sound.play();
      }
      self.beat()
      self.renderCircle(change_size);
    });
    self.beat()
  }

  renderCircle(csize) {
    var self = this;
    let size = Math.abs(csize);
    if(size > 100) {
      size = 100;
    }

    this.circle_group.append('circle')
      .style('opacity', 0.7)
      .attr("r", size + 20)
      .attr("stroke", 'none')
      .attr('fill', this.color)
      .transition()
      .attr('r', size + 40)
      .style('opacity', 0.1)
      .ease(d3.easeSin)
      .duration(2500)
      .remove()
      .on("end", () => {
        self.beating = false;
      });
  }

  beat() {
    let self = this;
    let beating = false;


    var radiusScale = d3.scaleLinear()
      .range([35, 80])
      .domain([60000, 1000]);

    if (beating) return;
    beating = true;

    //if (data.length > 0 && data[data.length - 1].date > now) {
      //data.splice(data.length - 1, 1);
    //}

    //data.push({
      //date: now,
      //value: 0
    //});

    let heartTransition = this.heart
      .transition()
      .duration(300)
      .attr("r", 80)

    //const stop = setInterval(() => {
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
}

const colorScale = d3.scaleSequential(d3.interpolateRainbow)
  .domain([0,1]);

const English = new LangListener('en')
const Japanese = new LangListener('ja');
const Russian = new LangListener('ru');
const Spanish = new LangListener('es');
const Chinese = new LangListener('zh');
const French = new LangListener('fr');
const Arabic = new LangListener('ar') 
const Ukrainian  = new LangListener('uk');          
const German = new LangListener('de');
const Dutch = new LangListener('nl');
const Italian = new LangListener('it');
const Swedish = new LangListener('sv');
const Farsi = new LangListener('fa');
const Hebrew = new LangListener('he');
const Indonesian = new LangListener('id');
const Assamese = new LangListener('as');
const Hindi = new LangListener('hi');
const Bengali = new LangListener('bn'); 
const Punjabi = new LangListener('pa');
const Telugu = new LangListener('te');
const Tamil =  new LangListener('ta');
const Malayalam = new LangListener('ml');
const Western = new LangListener('mr');
const Kannada = new LangListener('kn');
const Oriya = new LangListener('or');
const Sanskrit = new LangListener('sa');
const Gujarati = new LangListener('gu');
const Polish = new LangListener('pl');
const Macedonian = new LangListener('mk'); 
const Belarusian = new LangListener('be'); 
const Serbian = new LangListener('sr');
const Bulgarian = new LangListener('bg');
const Hungarian = new LangListener('hu');
const Finnish = new LangListener('fi');
const Norwegian = new LangListener('no');
const Greek = new LangListener('el');
const Esperanto = new LangListener('eo');
const Portuguese = new LangListener('pt'); 
const Estonian = new LangListener('et');

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
