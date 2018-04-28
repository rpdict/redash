import * as echarts from 'echarts';
import * as _ from 'underscore';

const EchartsChart = () => ({
  restrict: 'E',
  template: '<div class="echarts-chart-container" resize-event="getDom()"></div>',
  link($scope, element, attrs) {
    const echartsParentElement = element[0].parentNode.parentNode;
    const myChart = echarts.init(element[0], null, {
      width: Math.floor(echartsParentElement.offsetWidth),
      height: Math.floor(echartsParentElement.offsetHeight),
    });

    $scope.$watch(attrs.eData, () => {
      const option = $scope.$eval(attrs.eData);
      if (_.isObject(option)) {
        myChart.setOption(option);
      }
    }, true);

    $scope.getDom = () => ({
      width: Math.floor(echartsParentElement.offsetWidth),
      height: Math.floor(echartsParentElement.offsetHeight) ? Math.floor(echartsParentElement.offsetHeight) : '400px',
    });

    $scope.$watch($scope.getDom, () => {
      // resize echarts图表
      myChart.resize($scope.getDom());
    }, true);
  },
});

export default function init(ngModule) {
  ngModule.directive('echartsChart', EchartsChart);
}
