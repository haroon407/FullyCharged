import axios from 'axios';

class AnalyticsServiceClass {

    getChargerDetails() {
        const URL = 'http://localhost:3001';
        return axios(URL, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
        }).then(response => {
          return {
              chargerNames: ["Charger 1", "Charger 2", "Charger 3"],
              chargerLevels: ["Level 1", "Level 2", "Level 3"],
              chargerPowers: ["Charger 1", "Charger 2", "Charger 3"],
              chargerConnectors: ["Charger 1", "Charger 2", "Charger 3"],
              chargerCosts: ["Charger 1", "Charger 2", "Charger 3"],

              chargerLocation: "Baker str 22, 81733, Munich",

              chargersBar: {
                names: ["Charger 1", "Charger 2", "Charger 3"],
                types: ["info", "danger", "warning"]
              },

              dataEnegry: {
                labels: [
                  "Week 1",
                  "Week 2",
                  "Week 3",
                  "Week4"
                ],
                series: [
                  [287, 385, 490, 492],
                  [67, 152, 143, 240],
                  [554, 586, 698, 695]
                ]
              },

              dataRevenue: {
                labels: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "Mai",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec"
                ],
                series: [
                  [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
                  [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695],
                  [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
                ]
              },

              dataChargeTime: {
                labels: ["40%", "20%", "40%"],
                series: [40, 20, 40]
              },

              dataBookings: {
                labels: [
                  "09:00",
                  "12:00",
                  "15:00",
                  "18:00",
                  "21:00",
                  "00:00",
                  "03:00",
                  "06:00"
                ],
                series: [
                  [287, 385, 490, 492, 554, 586, 698, 695],
                  [67, 152, 143, 240, 287, 335, 435, 437],
                  [23, 113, 67, 108, 190, 239, 307, 308]
                ]
              }
          };
          // return response.data;
        }).catch(error => {
          throw error;
        });
    }

    getEnergySold() {
        const URL = 'http://localhost:3001/test';
        return axios(URL, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
        }).then(response => {
          return response.data;
        }).catch(error => {
          throw error;
        });
    }
}
const AnalyticsService = new AnalyticsServiceClass();
export default AnalyticsService;
