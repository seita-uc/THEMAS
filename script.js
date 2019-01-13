let langs = {
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
  'he': ['Hebrew' , 'ws://wikimon.hatnote.com:9230'],
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
  'gu': ['Gujarati' , 'ws://wikimon.hatnote.com:9200'],
  'pl': ['Polish' , 'ws://wikimon.hatnote.com:9260'],
  'mk': ['Macedonian' , 'ws://wikimon.hatnote.com:9270'],
  'be': ['Belarusian' , 'ws://wikimon.hatnote.com:9280'],
  'sr': ['Serbian' , 'ws://wikimon.hatnote.com:9290'],
  'bg': ['Bulgarian' , 'ws://wikimon.hatnote.com:9300'],
  'hu': ['Hungarian', 'ws://wikimon.hatnote.com:9320'],
  'fi': ['Finnish', 'ws://wikimon.hatnote.com:9330'],
  'no': ['Norwegian', 'ws://wikimon.hatnote.com:9340'],
  'el': ['Greek', 'ws://wikimon.hatnote.com:9350'],
  'eo': ['Esperanto', 'ws://wikimon.hatnote.com:9360'],
  'pt': ['Portuguese', 'ws://wikimon.hatnote.com:9370'],
  'et': ['Estonian', 'ws://wikimon.hatnote.com:9380'],
  'wikidata': ['Wikidata' , 'ws://wikimon.hatnote.com:9220']
};

let w = window.innerWidth;
let h = window.innerHeight;
let side_margin = Math.floor((w%300)/2)
var svgwrapper = d3.select("#svg-wrapper")
  .attr("width", Math.floor((w/300))*300)
  .attr("height", h)
  .style("margin-left", `${side_margin/3*2}px`)

var width = 300;
var height = 300;

const sound = new buzz.sound("./sound/heartbeat", {
  formats: ["mp3"]
});

var svgs = {}

for(let lang in langs) {
  let container = d3.select("#svg-wrapper")
    .append("div")
    .attr("id", 'container-' + lang)
    .attr("onClick", " ")
    .style("width", `${width}px`)
    .style("height", `${height}px`)

  let svg = container
    .append("svg")
    .attr("id", lang)
    .style("width", `${width}px`)
    .style("height", `${height}px`)

  //container
  //.append("label")
  //.attr("type", "button")
  //.attr("name", "toggle")
  //.attr("value", "Toggle")

  langs[lang].push(svg);
}

//var now = new Date(),
  //fromDate = new Date(now.getTime() - 5 * 1000);

//var x = d3.scaleTime()
  //.domain([fromDate, new Date(now.getTime())])
  //.range([0, 100]),
  //y = d3.scaleLinear()
  //.domain([-10, 10])
  //.range([100, 0]);

//var line = d3.line()
  //.x(function(d) {
    //return x(d.date);
  //})
  //.y(function(d) {
    //return y(d.value);
  //})

//var data = [];
//var BEAT_VALUES = [0, 0, 3, -4, 10, -7, 3, 0, 0];
//for (var i = 1; i < BEAT_VALUES.length; i++) {
  //data.push({
    //date: new Date(now.getTime() + i * 5),
    //value: BEAT_VALUES[i]
  //});
//}

//var svg = d3.select('#svg-wrapper').append("svg")
  //.attr("width", width)
  //.attr("height", height)
  //.append("g")
  //.attr("transform", "translate(" + 10 + "," + 10 + ")");

//var clip_path = svg
  //.append("g")
  //.attr("clip-path", "url(#clip)")
  //.append("path")
  //.attr("class", "line")

//var transition = svg
  //.append("path")
  //.attr("d", line(data))
  //.transition()
  //.duration(100)
  //.ease(d3.easeLinear);

////var xAxis = d3.axisBottom()
  ////.scale(x)
  ////.ticks(d3.timeSecond.every(1))
  ////.tickFormat(function(d) {
    ////var seconds = d.getSeconds() === 0 ? "00" : d.getSeconds();
    ////return seconds % 10 === 0 ? d.getMinutes() + ":" + seconds : ":" + seconds;
  ////});

////var axis = d3.select("svg").append("g")
  ////.attr("class", "axis")
  ////.attr("transform", "translate(0," + 100 + ")")
  ////.call(xAxis);

//(function tick() {
  //transition = transition.each(function() {

    //// update the domains
    //now = new Date();
    //fromDate = new Date(now.getTime() - 5 * 1000);
    //x.domain([fromDate, new Date(now.getTime() - 100)]);

    //var translateTo = x(new Date(fromDate.getTime()) - 100);

    //// redraw the line
    //svg.select(".line")
      //.attr("d", line(data))
      //.attr("transform", null)
    ////     .transition()
    ////.attr("transform", "translate(" + translateTo + ")");

    //// slide the x-axis left
    ////axis.call(xAxis);

  //}).transition().on("start", tick);
//})();


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

    //$('div#svg-wrapper').on('dblclick', '#container-' + self.language, function (event) {
      //self.mute = true;
    //})

    //$('div#svg-wrapper').on('click', '#container-' + self.language, function (event) {
      //self.mute = false;
      //self.beat()
    //})

    $('#container-' + self.language).on('dblclick', function (event) {
      self.mute = true;
    })

    $('#container-' + self.language).on('click', function (event) {
      self.mute = false;
      self.beat()
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
      .duration(250)
      .attr("r", 80)
      .transition()
      .duration(1000)
      .attr("r", 70)

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
