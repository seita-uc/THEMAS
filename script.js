import { langs, modCount, subscribe } from './wikipedia/script.js';

var w = window.innerWidth;
var h = window.innerHeight;
var grid = d3.select("#svg-wrapper")
  .attr("width", w)
  .attr("height", h);

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
    .attr("height", height);

  langs[lang].push(svg);
}

//svg.append("circle")
  //.attr("cx", 200)
  //.attr("cy", 50)
  //.attr("r", 20)
  //.attr("fill", "green");
//svg.append("circle")
  //.attr("cx", 50)
  //.attr("cy", 200)
  //.attr("r", 20)
  //.attr("fill", "green")
  //.transition()
  //.duration(2000)
  //.attr("fill", "lightblue");

//size = Math.max(Math.sqrt(abs_size) * scale_factor, 3);
var starting_opacity = 0.7

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
 
  constructor(svg, language, color) {
    this.svg = svg;
    this.language = language;
    this.color = color;
    this.socket = new WebSocket(langs[language][1]);
    this.mute = true;
    this.beating = false;
    this.colorScale = 0.1;
 
    this.heart = svg.append('circle')
      .attr('id', 'heart-' + language)
      .attr('transform', 'translate(' + width/2 + ', ' + height/2 + ')')
      .style('opacity', 0.1)
      .attr("r", 80)
      .attr("stroke", 'none')
      .attr('fill', d3.interpolateLab(color, "black")(this.colorScale));
  }

  subscribe() {
    let self = this
    let opacity = $('#heart-' + self.language).css('opacity')
    const stop = setInterval(() => {
      if(self.beating) {
        if (self.colorScale > 0.1) {
          let previousColor = self.colorScale;
          self.colorScale = previousColor - 0.1;
          let previousOpacity = parseFloat(opacity);
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
          self.colorScale = 0.9;
        } 
        self.heart
          .transition()
          .duration(1000)
          .attr('fill', d3.interpolateLab(self.color, "black")(self.colorScale))
          .style('opacity', parseFloat(opacity) + 0.1);
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
    let svg = this.svg;
    let x = width/2; 
    let y = height/2;

    let circle_group = svg.append('g')
      .attr('transform', 'translate(' + x + ', ' + y + ')')

    circle_group.append('circle')
      .style('opacity', starting_opacity)
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

    circle_group.append('text')
      .text(langs[this.language][0])
      .attr('fill', this.color)
      .classed('article-label', true)
      .attr('text-anchor', 'middle')
      .transition()
      .duration(2500)
      .remove();
  }

  beat() {
    let self = this;
    let beating = false;

    //var colorScale = d3.scaleLinear()
    //  .domain([BEAT_TIME, (MAX_LATENCY - BEAT_TIME) / 2, MAX_LATENCY])
    //  .range(["#6D9521", "#D77900", "#CD3333"]);

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

const English = new LangListener(langs['en'][2], 'en', 'red');
const Japanese = new LangListener(langs['ja'][2], 'ja', 'blue');
const Russian = new LangListener(langs['ru'][2], 'ru', 'green');
const Spanish = new LangListener(langs['es'][2], 'es', 'grey');
const Chinese = new LangListener(langs['zh'][2], 'zh', 'yellow');
const French = new LangListener(langs['fr'][2], 'fr', 'purple');
const Arabic = new LangListener(langs['ar'][2], 'ar', 'pink');
                                       
English.subscribe();                   
Japanese.subscribe();
Russian.subscribe();
Spanish.subscribe();
Chinese.subscribe();
French.subscribe();
Arabic.subscribe();

