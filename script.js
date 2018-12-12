import { langs, modCount, subscribe } from './wikipedia/script.js';

var w = window.innerWidth;
var h = window.innerHeight;
var grid = d3.select("#grid")
  .attr("width", w)
  .attr("height", h);

var width = 300;
var height = 300;
var English_svg = d3.select("#grid")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

var Japanese_svg = d3.select("#grid")
  .append("svg")
  .attr("width", width)
  .attr("height", height);


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
var starting_opacity = 1

function renderCircle(svg, color) {
  var x = Math.random() * (width - size) + size;
  var y = Math.random() * (height - size) + size;

  var circle_group = svg.append('g')
    .attr('transform', 'translate(' + x + ', ' + y + ')')
    .attr('fill', color)
    .style('opacity', starting_opacity)

  circle_group.append('circle')
    .attr("r", size + 20)
    .attr("stroke", 'none')
    .transition()
    .attr('r', size + 40)
    .style('opacity', 0)
    .ease(Math.sqrt)
    .duration(2500)
    .remove();
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

  constructor(svg, language, color) {
    this.svg = svg;
    this.language = language;
    this.color = color;
    //this.count = count;
    this.socket = new WebSocket(langs[language][1]);
  }

  subscribe() {
    var self = this
    this.socket.addEventListener('open', function (event) {
      self.socket.send('Hello Server!');
    });

    this.socket.addEventListener('message', function (event) {
      //console.log('Message from server in ' + self.language + ': ' + event.data);
      //self.count[self.language]++
      let change_size = JSON.parse(event.data)["change_size"];
      self.renderCircle(change_size)
    });
  }

  renderCircle(csize) {
    let size = Math.sqrt(Math.abs(Math.random())) * Math.abs(csize);
    console.log(size)
    if(size > 300) {
      size = 250;
    }
    console.log(size)
    let svg = this.svg;
    let x = Math.random() * (width - size) + size;
    let y = Math.random() * (height - size) + size;

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
      .ease(Math.sqrt)
      .duration(2500)
      //.remove();

    circle_group.append('text')
      .text(langs[this.language][0])
      .attr('fill', this.color)
      .classed('article-label', true)
      .attr('text-anchor', 'middle')

  }
}

const English = new LangListener(English_svg, 'en', 'red');
const Japanese = new LangListener(Japanese_svg, 'ja', 'blue');
//const Russian = new LangListener(svg, 'ru', 'green');
//const Spanish = new LangListener(svg, 'es', 'grey');
//const Chinese = new LangListener(svg, 'zh', 'yellow');
//const French = new LangListener(svg, 'fr', 'purple');
//const Arabic = new LangListener(svg, 'ar', 'pink');
                                       
English.subscribe();                   
Japanese.subscribe();
//Russian.subscribe();
//Spanish.subscribe();
//Chinese.subscribe();
//French.subscribe();
//Arabic.subscribe();

//var circle_container = circle_group.append('a')
//.attr('xlink:href', "hoge")
//.attr('target', '_blank')
//.attr('fill', "black");

//var circle = circle_container.append('circle')
//.attr('r', size)
//.transition()
//.duration(2000)
//.style('opacity', 0)
//.remove();
//.each('end', function() {
//  circle_group.remove();
//})
