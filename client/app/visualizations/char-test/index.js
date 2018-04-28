// import {
//   some, extend, has, partial, intersection, without, contains, isUndefined,
//   sortBy, each, pluck, keys, difference,
// } from 'underscore';
import angular from 'angular';
import charTemplate from './char-test.html';
import charEditorTemplate from './char-test-editor.html';

function charTest() {
  return {
    restrict: 'E',
    template: charTemplate,
    link($scope) {
      const refreshData = () => {
        const queryData = $scope.queryResult.getData();
        if (queryData) {
          // do the render logic.
          const xAxisData = $scope.visualization.options.xColumn;
          const seriesData = $scope.visualization.options.yColumns;
          const seriesName = $scope.visualization.options.chart.name;
          const xAxisDataArray = [];
          const seriesDataArray = [];
          angular.forEach(queryData, (value) => {
            xAxisDataArray.push(value[xAxisData]);
            seriesDataArray.push(value[seriesData]);
          });
          const series = {
            type: $scope.visualization.options.chart.type,
            name: seriesName,
            data: seriesDataArray,
          };
          console.log(seriesDataArray);

          $scope.barOption = $scope.visualization.options;
          $scope.barOption.title.text = $scope.visualization.name;
          $scope.barOption.legend.data = [seriesName];
          $scope.barOption.series = [series];
          $scope.barOption.xAxis = $scope.visualization.options.xAxis;
          $scope.barOption.xAxis.data = xAxisDataArray;
          console.log($scope.barOption);
        }
      };

      $scope.$watch('visualization.options', refreshData, true);
      $scope.$watch('queryResult && queryResult.getData()', refreshData);
    },
  };
}

function charTestEditor() {
  return {
    restrict: 'E',
    template: charEditorTemplate,
    link($scope) {
      const refreshData = () => {
        const queryData = $scope.queryResult.getData();
        if (queryData) {
          // do the render logic.
          $scope.chartTypes = {
            line: { name: 'Line', icon: 'line-chart' },
            bar: { name: 'Bar', icon: 'bar-chart' },
            area: { name: 'Area', icon: 'area-chart' },
            pie: { name: 'Pie', icon: 'pie-chart' },
            scatter: { name: 'Scatter', icon: 'circle-o' },
            bubble: { name: 'Bubble', icon: 'circle-o' },
            box: { name: 'Box', icon: 'square-o' },
          };
        }
      };

      $scope.$watch('visualization.options', refreshData, true);
      $scope.$watch('queryResult && queryResult.getData()', refreshData);
    },
  };
}

export default function init(ngModule) {
  ngModule.directive('charTestEditor', charTestEditor);
  ngModule.directive('charTestRenderer', charTest);

  const defaultOptions = {
    title: {},
    legend: {},
    tooltip: {},
    xAxis: {
      axisLabel: {
        interval: 0, // 横轴信息全部显示
        rotate: -30, // -30度角倾斜显示
      },
    },
    yAxis: {},
    series: [],
    defaultRows: 8,
  };

  const renderTemplate = '<char-test-renderer options="visualization.options" query-result="queryResult"></char-test-renderer>';
  const editorTemplate = '<char-test-editor></char-test-editor>';

  ngModule.config((VisualizationProvider) => {
    VisualizationProvider.registerVisualization({
      type: 'CHAR_TEST',
      name: 'Char Test',
      renderTemplate,
      editorTemplate,
      defaultOptions,
    });
  });
}
