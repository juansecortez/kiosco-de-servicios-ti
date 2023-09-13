import React, { useState, useEffect } from 'react';
import { fetchDeviceData } from '../../../redux/actions/deviceActions';
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar, CartesianGrid,Brush , ReferenceLine } from 'recharts';
import { connect } from 'react-redux';

const BarChartComponent = ({ year, area, ubicacion, tipo, fetchDeviceData, deviceData }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (year && area && ubicacion && tipo) {
      setLoading(true);
      fetchDeviceData(year, area, ubicacion, tipo)
        .finally(() => setLoading(false));
    }
  }, [year, area, ubicacion, tipo, fetchDeviceData]);

  useEffect(() => {
   
    if (deviceData && deviceData.length > 0) {
        setData(deviceData.map(device => ({
            Id: device.Id.toString(),
            Uptime: device['Uptime (raw)'],
            Downtime: device['Downtime (raw)']
        })));
    }
}, [deviceData]);


  if (loading) return <div>Cargando...</div>;
  if (!data || data.length === 0) return null;

  return (
    <BarChart width={1100} height={300} data={data} barCategoryGap={30}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="Id" />
      <YAxis domain={[0, 110]} />
      <Tooltip />
      <Legend />
      <Bar dataKey="Uptime" stackId="a" fill="green" />
      <Bar dataKey="Downtime" stackId="a" fill="red" />
      <ReferenceLine y={97} stroke="black" strokeDasharray="3 3" />

      <Brush dataKey="TableName" height={30} stroke="#8884d8" />
    </BarChart>
  );
};

const mapStateToProps = state => ({
  deviceData: state.deviceReducer.deviceData
});


const mapDispatchToProps = {
  fetchDeviceData,
};

export default connect(mapStateToProps, mapDispatchToProps)(BarChartComponent);
