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
          $scope.chartOption = $scope.visualization.options;

          $scope.chartOption.dataset.dimensions = [
            $scope.visualization.options.xColumn,
            $scope.visualization.options.yColumns,
          ];
          $scope.chartOption.dataset.source = queryData;
          $scope.chartOption.series = [
            {
              type: $scope.visualization.options.chart.type,
              name: $scope.visualization.options.chart.name,
            },
          ];
          if ($scope.visualization.options.chart.type === 'pie') {
            $scope.chartOption.xAxis.show = false;
            $scope.chartOption.yAxis.show = false;
          } else {
            $scope.chartOption.xAxis.show = true;
            $scope.chartOption.yAxis.show = true;
          }

          console.log($scope.chartOption);
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
      $scope.currentTab = 'general';

      $scope.changeTab = (tab) => {
        $scope.currentTab = tab;
      };

      const refreshData = () => {
        const queryData = $scope.queryResult.getData();
        if (queryData) {
          // do the render logic.
          $scope.chartTypes = {
            line: { name: 'Line', icon: 'line-chart' },
            bar: { name: 'Bar', icon: 'bar-chart' },
            // area: { name: 'Area', icon: 'area-chart' },
            pie: { name: 'Pie', icon: 'pie-chart' },
            // scatter: { name: 'Scatter', icon: 'circle-o' },
            // bubble: { name: 'Bubble', icon: 'circle-o' },
            // box: { name: 'Box', icon: 'square-o' },
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
    dataset: {},
    xAxis: {
      type: 'category',
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
