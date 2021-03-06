import { modCount, subscribe, getModificationCount } from './script.js';
var randomScalingFactor = function() {
  return Math.round(Math.random() * 100);
};

// window.chartColors = {
//   red: 'rgb(255, 99, 132)',
//   orange: 'rgb(255, 159, 64)',
//   yellow: 'rgb(255, 205, 86)',
//   green: 'rgb(75, 192, 192)',
//   blue: 'rgb(54, 162, 235)',
//   purple: 'rgb(153, 102, 255)',
//   grey: 'rgb(201, 203, 207)'
// };

subscribe('en', modCount);
subscribe('ja', modCount);
subscribe('ru', modCount);
subscribe('es', modCount);
subscribe('zh', modCount);
subscribe('fr', modCount);
subscribe('ar', modCount);

var config = {
  type: 'pie',
  data: {
    datasets: [{
      data: [
        modCount['en'],
        modCount['ja'],
        modCount['ru'],
        modCount['es'],
        modCount['zh'],
        modCount['fr'],
        modCount['ar'],
      ],
      backgroundColor: [
        window.chartColors.red,
        window.chartColors.orange,
        window.chartColors.yellow,
        window.chartColors.green,
        window.chartColors.blue,
        window.chartColors.purple,
        window.chartColors.grey,
      ],
      label: 'World Languages'
    }],
    labels: [
      'English',
      'Japanese',
      'Russian',
      'Spanish',
      'Chinese',
      'French',
      'Arabic',
    ]
  },
  options: {
    responsive: true
  }
};
window.onload = function() {
  var ctx = document.getElementById('chart-area').getContext('2d');
  window.myPie = new Chart(ctx, config);

  setInterval(function() {
    config.data.datasets[0].data = [
      modCount['en'],
      modCount['ja'],
      modCount['ru'],
      modCount['es'],
      modCount['zh'],
      modCount['fr'],
      modCount['ar'],
    ];
    window.myPie.update();
    console.log(modCount)
  }, 2000)
};
document.getElementById('randomizeData').addEventListener('click', function() {
  config.data.datasets.forEach(function(dataset) {
    dataset.data = dataset.data.map(function() {
      return randomScalingFactor();
    });
  });
  window.myPie.update();
});

var colorNames = Object.keys(window.chartColors);
document.getElementById('addDataset').addEventListener('click', function() {
  var newDataset = {
    backgroundColor: [],
    data: [],
    label: 'New dataset ' + config.data.datasets.length,
  };
  for (var index = 0; index < config.data.labels.length; ++index) {
    newDataset.data.push(randomScalingFactor());
    var colorName = colorNames[index % colorNames.length];
    var newColor = window.chartColors[colorName];
    newDataset.backgroundColor.push(newColor);
  }
  config.data.datasets.push(newDataset);
  window.myPie.update();
});
document.getElementById('removeDataset').addEventListener('click', function() {
  config.data.datasets.splice(0, 1);
  window.myPie.update();
});
