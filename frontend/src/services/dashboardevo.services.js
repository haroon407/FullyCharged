import axios from "axios";

class DashboardEVOServiceClass {
  getDetailsDashboardEVO(evoDetailsObject) {
    const URL = "http://localhost:3000/admin/dashboard-evo";
    return axios(URL, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      },
      data: evoDetailsObject
    })
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }
}
const DashboardEVOServiceClass = new DashboardEVOServiceClass();
export default DashboardEVOServiceClass;
