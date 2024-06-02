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
      <nav className="navbar">
        <div className="logo">
          <h1>
            <span style={{ color: "yellow" }}>MY</span>Dash
          </h1>
        </div>
        <div className="nav-right">
          <a href="#barchart">ALERT DISTRIBUTION | </a>
          <a href="#piechart"> ALERT PROPORTION | </a>
          <a href="#linechart"> AlERT TRENDS | </a>
          <a href="#areachart"> CUMULATIVE COUNT OF ALERTS </a>
        </div>
      </nav>
      <div>
        <div className="description">
          <h2 id="barchart">Distribution of Alerts by category</h2>
          <p>
            This bar chart shows the distribution of network security alerts
            across different categories. It helps in understanding which types
            of alerts are most common and can assist in prioritizing security
            measures.
          </p>
        </div>

        <ResponsiveContainer width="80%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="yellow" />
          </BarChart>
        </ResponsiveContainer>
        <div className="description">
          <h2 id="piechart">Proportion of Alert Categories</h2>
          <p>
            The pie chart visualizes the proportion of each category of alerts
            relative to the total number of alerts. This provides a clear
            overview of the relative frequency of different types of network
            threats.
          </p>
        </div>
        <ResponsiveContainer width="80%" height={400}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="yellow"
              label
            />
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <div className="description">
          <h2 id="linechart">Trends in Alerts Over Time</h2>
          <p>
            The line chart depicts the trend of alerts over time for each
            category. This helps in identifying periods of increased activity
            and can be useful for spotting trends or patterns in security
            incidents.
          </p>
        </div>

        <ResponsiveContainer width="80%" height={400}>
          <LineChart data={chartData}>
            <Line stroke="yellow" dataKey="count" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
          </LineChart>
        </ResponsiveContainer>

        <div className="description">
          <h2 id="areachart">Cumulative Count of Alerts by Category</h2>
          <p>
            The area chart illustrates the cumulative count of alerts over time
            by category. This gives a sense of the overall volume of alerts and
            the growth of each category, which can be important for long-term
            analysis and resource planning.
          </p>
        </div>
        <ResponsiveContainer width="80%" height={400}>
          <AreaChart data={chartData}>
            <Area stroke="yellow" fill="yellow" dataKey="count" />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <footer>COPYRIGHT © CHAVI SINGHAL * WIJUNGLE</footer>
    </div>
  );
}

export default App;
