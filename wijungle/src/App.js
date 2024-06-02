import logo from "./logo.svg";
import "./App.css";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
function App() {
  const rawData = `
{"timestamp":"2019-01-02T03:50:09.097718","flow_id":52373568,"in_iface":"eth0","event_type":"alert","src_ip":"8.42.77.171","src_port":65036,"dest_ip":"138.68.3.71","dest_port":3306,"proto":"TCP","alert":{"action":"allowed","gid":1,"signature_id":2010937,"rev":3,"signature":"ET SCAN Suspicious inbound to mySQL port 3306","category":"Potentially Bad Traffic","severity":2}}
{"timestamp":"2019-01-02T03:50:10.386108","flow_id":52491840,"in_iface":"eth0","event_type":"alert","src_ip":"8.42.77.171","src_port":65386,"dest_ip":"138.68.3.71","dest_port":5915,"proto":"TCP","alert":{"action":"allowed","gid":1,"signature_id":2002911,"rev":5,"signature":"ET SCAN Potential VNC Scan 5900-5920","category":"Attempted Information Leak","severity":2}}
{"timestamp":"2019-01-02T03:50:10.421359","flow_id":52507296,"in_iface":"eth0","event_type":"alert","src_ip":"8.42.77.171","src_port":65438,"dest_ip":"138.68.3.71","dest_port":5432,"proto":"TCP","alert":{"action":"allowed","gid":1,"signature_id":2010939,"rev":3,"signature":"ET SCAN Suspicious inbound to PostgreSQL port 5432","category":"Potentially Bad Traffic","severity":2}}
{"timestamp":"2019-01-02T03:50:10.576769","flow_id":52568784,"in_iface":"eth0","event_type":"alert","src_ip":"8.42.77.171","src_port":49238,"dest_ip":"138.68.3.71","dest_port":1433,"proto":"TCP","alert":{"action":"allowed","gid":1,"signature_id":2010935,"rev":3,"signature":"ET SCAN Suspicious inbound to MSSQL port 1433","category":"Potentially Bad Traffic","severity":2}}
{"timestamp":"2019-01-02T03:50:10.585758","flow_id":52576512,"in_iface":"eth0","event_type":"alert","src_ip":"8.42.77.171","src_port":49269,"dest_ip":"138.68.3.71","dest_port":1521,"proto":"TCP","alert":{"action":"allowed","gid":1,"signature_id":2010936,"rev":3,"signature":"ET SCAN Suspicious inbound to Oracle SQL port 1521","category":"Potentially Bad Traffic","severity":2}}
{"timestamp":"2019-01-02T03:50:10.621656","flow_id":52589280,"in_iface":"eth0","event_type":"alert","src_ip":"8.42.77.171","src_port":49306,"dest_ip":"138.68.3.71","dest_port":5811,"proto":"TCP","alert":{"action":"allowed","gid":1,"signature_id":2002910,"rev":5,"signature":"ET SCAN Potential VNC Scan 5800-5820","category":"Attempted Information Leak","severity":2}}
{"timestamp":"2019-01-02T03:50:11.315110","flow_id":52710912,"in_iface":"eth0","event_type":"alert","src_ip":"8.42.77.171","src_port":49678,"dest_ip":"138.68.3.71","dest_port":22,"proto":"TCP","alert":{"action":"allowed","gid":1,"signature_id":2001219,"rev":19,"signature":"ET SCAN Potential SSH Scan","category":"Attempted Information Leak","severity":2}}
{"timestamp":"2019-01-02T03:51:01.124914","flow_id":52713600,"in_iface":"eth0","event_type":"alert","src_ip":"61.176.222.167","src_port":59947,"dest_ip":"138.68.3.71","dest_port":1433,"proto":"TCP","alert":{"action":"allowed","gid":1,"signature_id":2010935,"rev":3,"signature":"ET SCAN Suspicious inbound to MSSQL port 1433","category":"Potentially Bad Traffic","severity":2}}
{"timestamp":"2019-01-02T03:51:01.124914","flow_id":52713600,"in_iface":"eth0","event_type":"alert","src_ip":"61.176.222.167","src_port":59947,"dest_ip":"138.68.3.71","dest_port":1433,"proto":"TCP","alert":{"action":"allowed","gid":1,"signature_id":2010935,"rev":3,"signature":"ET SCAN Suspicious inbound to MSSQL port 1433","category":"Potentially Bad Traffic","severity":2}}
{"timestamp":"2019-01-02T03:51:01.124914","flow_id":52713600,"in_iface":"eth0","event_type":"alert","src_ip":"61.176.222.167","src_port":59947,"dest_ip":"138.68.3.71","dest_port":1433,"proto":"TCP","alert":{"action":"allowed","gid":1,"signature_id":2403410,"rev":46061,"signature":"ET CINS Active Threat Intelligence Poor Reputation IP TCP group 56","category":"Misc Attack","severity":2}}
{"timestamp":"2019-01-02T03:52:18.860928","flow_id":52714944,"in_iface":"eth0","event_type":"alert","src_ip":"8.42.77.171","src_port":49720,"dest_ip":"138.68.3.71","dest_port":3306,"proto":"TCP","alert":{"action":"allowed","gid":1,"signature_id":2010937,"rev":3,"signature":"ET SCAN Suspicious inbound to mySQL port 3306","category":"Potentially Bad Traffic","severity":2}}`;

  const parsedData = rawData
    .trim()
    .split("\n")
    .map(JSON.parse)
    .map((entry) => entry.alert);

  const aggregatedData = parsedData.reduce((acc, alert) => {
    const category = alert.category;

    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category]++;
    return acc;
  }, {});

  const chartData = Object.keys(aggregatedData).map((category) => ({
    category,
    count: aggregatedData[category],
  }));
  return (
    <div className="App">
      <h1>DASHBOARD</h1>
      <h2>Bar Chart</h2>
      <ResponsiveContainer width="80%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#007bff" />
        </BarChart>
      </ResponsiveContainer>

      <h2>Pie Chart</h2>
      <ResponsiveContainer width="80%" height={400}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#007bff"
            label
          />
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <h2>Line Chart</h2>
      <ResponsiveContainer width="80%" height={400}>
        <LineChart data={chartData}>
          <Line stroke="#007bff" dataKey="count" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
      <h2>Area Chart</h2>
      <ResponsiveContainer width="80%" height={400}>
        <AreaChart data={chartData}>
          <Area stroke="#007bff" fill="#007bff" dataKey="count" />
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default App;
