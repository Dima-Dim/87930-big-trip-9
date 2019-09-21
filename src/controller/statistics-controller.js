import Statistics from "../components/statistics";
import AbstractComponent from "../components/abstract-component";
import {ACTIVITY_EVENT_TYPES, ClassesElements} from "../components/config";
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';


export default class StatisticsController {
  constructor(container, data) {
    this._statisics = new Statistics();
    this._container = container;
    this._data = data;
    this._parsedData = {
      money: {},
      transport: {},
      time: {},
    };
  }

  init() {
    AbstractComponent.renderElement(this._container, this._statisics.getElement(), `insertAfter`);
  }

  hide() {
    this._statisics.hide();
  }

  show(data = this._data) {
    this._parsedData = {
      money: {},
      transport: {},
      time: {},
    };
    this._parseAllData(data);
    this._makeMoneyChart();
    this._statisics.show();
  }

  _parseDataItem(parsedDataKey, eventKey, eventValue) {
    let value = null;
    if (!Array.isArray(eventValue)) {
      value = eventValue;
    } else {
      value = eventValue[1] - eventValue[0];
    }

    if (eventKey in this._parsedData[parsedDataKey]) {
      this._parsedData[parsedDataKey][eventKey] += value;
    } else {
      this._parsedData[parsedDataKey][eventKey] = value;
    }
  }

  _parseAllData(data) {
    data.forEach((it) => {
      this._parseDataItem(`money`, it.type, it.price);
      if (ACTIVITY_EVENT_TYPES.has(it.type)) {
        this._parseDataItem(`transport`, it.type, 1);
      }
      this._parseDataItem(`time`, it.type, [it.startDate, it.endDate]);
    });
  }

  _getMoneyChartData(data) {
    const labelsForChart = [];
    const dataForChart = [];

    Object.entries(data).forEach((it) => {
      labelsForChart.push(it[0]);
      dataForChart.push(it[1]);
    });

    return [labelsForChart, dataForChart];
  }

  _makeMoneyChart() {
    const sourceDataForChart = this._getMoneyChartData(this._parsedData.money);
    const canvas = this._statisics.getElement().querySelector(`.${ClassesElements.STATISTICS_MONEY}`);
    const ctxTags = canvas.getContext(`2d`);
    ctxTags.clearRect(0, 0, canvas.width, canvas.height);

    return new Chart(ctxTags, {
      type: `horizontalBar`,
      plugins: [ChartDataLabels],
      data: {
        labels: sourceDataForChart[0],
        datasets: [{
          data: sourceDataForChart[1],
          backgroundColor: [
            `rgba(255, 99, 132, 0.3)`,
            `rgba(54, 162, 235, 0.3)`,
            `rgba(255, 206, 86, 0.3)`,
            `rgba(75, 192, 192, 0.3)`,
            `rgba(153, 102, 255, 0.3)`,
            `rgba(255, 159, 64, 0.3)`,
          ],
          borderColor: [
            `rgba(255, 99, 132, 1)`,
            `rgba(54, 162, 235, 1)`,
            `rgba(255, 206, 86, 1)`,
            `rgba(75, 192, 192, 1)`,
            `rgba(153, 102, 255, 1)`,
            `rgba(255, 159, 64, 1)`,
          ],
          borderWidth: 1
        }],
      },
      options: {
        plugins: {
          datalabels: {
            anchor: `end`,
            align: `end`,
            offset: -50,
            formatter: (value) => `€ ${value}`
          },
        }
      }
    });
  }
}