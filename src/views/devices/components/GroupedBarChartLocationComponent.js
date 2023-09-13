import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line, CartesianGrid, Brush } from 'recharts';
import { fetchStatsByLocation } from '../../../redux/actions/deviceActions';

const transformData = (data) => {
  const uniqueMonths = [...new Set(data.map(item => item.TableName))];
  return uniqueMonths.map(month => {
    const monthData = data.filter(item => item.TableName === month);
    let transformed = { TableName: month };
    monthData.forEach(item => {
      transformed[item.Ubicacion] = item.Uptime_1020;
    });
    return transformed;
  });
};

const GroupedLineChartLocationComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStatsByLocation());
  }, [dispatch]);

  const data = useSelector(state => state.deviceReducer.statsByLocation);
  const transformedData = transformData(data);

  const locations = ['10 20', 'Administrativo', 'Guasimas', 'Operativo', 'Pastas_Acip', 'Poblado', 'Zona A', 'Zona B'];
  const colors = {
    '10 20': "#8884d8",
    'Administrativo': "#ff7300",
    'Guasimas': "#34a4eb",
    'Operativo': "#a3cd3b",
    'Pastas_Acip': "#ffec64",
    'Poblado': "#f78e69",
    'Zona A': "#83d0c9",
    'Zona B': "#8e44ad"
  };
  
  const [visibleLocations, setVisibleLocations] = useState({
    '10 20': true,
    'Administrativo': true,
    'Guasimas': true,
    'Operativo': true,
    'Pastas_Acip': true,
    'Poblado': true,
    'Zona A': true,
    'Zona B': true
  });

  const categories = {
    'Mina': ['Zona B', 'Zona A', 'Poblado'],
    'Peleetizado': ['Administrativo', 'Operativo'],
    'Presas': ['Guasimas', 'Pastas_Acip', '10 20']
  };

  if (!data.length) {
    return <div>No hay datos disponibles</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap',  }}>
        {Object.keys(categories).map(category => (
          <div key={category} style={{ marginBottom: '15px' }}>
            <strong>{category}</strong>
            {categories[category].map(location => (
              <div key={location} style={{ margin: '10px 0 0 20px' }}>
                <input
                  type="checkbox"
                  style={{ transform: 'scale(1.5)' }}
                  checked={visibleLocations[location]}
                  onChange={() => setVisibleLocations(prev => ({ ...prev, [location]: !prev[location] }))}
                />
                <label style={{ marginLeft: 5 }}>{location}</label>
              </div>
            ))}
          </div>
        ))}
      </div>

      <LineChart width={1100} height={500} data={transformedData} margin={{ top: 20, right: 40, left: 10, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="TableName" />
        <YAxis domain={[90, 100]} />
        <Tooltip />
        <Legend />
        {locations.map(location => visibleLocations[location] && (
          <Line key={location} type="monotone" strokeWidth={3} dataKey={location} stroke={colors[location]} dot={true
        } activeDot={{ r: 8 }} />
        ))}
        <Brush dataKey="TableName" height={30} stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default GroupedLineChartLocationComponent;
