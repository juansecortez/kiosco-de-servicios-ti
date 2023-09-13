import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  LineChart, XAxis, YAxis, Tooltip, Legend, Line, CartesianGrid,Brush
} from 'recharts';
import { fetchStatsByArea } from '../../../redux/actions/deviceActions';

const transformData = (data) => {
  const uniqueMonths = [...new Set(data.map(item => item.TableName))];
  return uniqueMonths.map(month => {
    const monthData = data.filter(item => item.TableName === month);
    let transformed = { TableName: month };
    monthData.forEach(item => {
      transformed[item.Area] = item.Uptime;
    });
    return transformed;
  });
};

const GroupedLineChartComponent = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchStatsByArea());
  }, [dispatch]);

  const data = useSelector(state => state.deviceReducer.statsByArea);
  const transformedData = transformData(data);

  const [visibleAreas, setVisibleAreas] = useState({
    Mina: true,
    Peletizado: true,
    Presas: true
  });



  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          {Object.keys(visibleAreas).map(area => (
            <span key={area} style={{ margin: 10 }}>
              <input
                type="checkbox"
                style={{ transform: 'scale(1.5)' }}
                checked={visibleAreas[area]}
                onChange={() => setVisibleAreas(prev => ({ ...prev, [area]: !prev[area] }))}
              />
              <label style={{ marginLeft: 5 }}>{area}</label>
            </span>
          ))}
        </div>

      
      </div>

      <LineChart width={1100} height={500} data={transformedData} margin={{ top: 20, right: 40, left: 10, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="TableName" />
        <YAxis domain={[90, 100]} />
        <Tooltip />
        <Legend />
        {visibleAreas.Mina && <Line type="monotone" dataKey="Mina" strokeWidth={3} stroke="#8884d8" activeDot={{ r: 8 }} />}
        {visibleAreas.Peletizado && <Line type="monotone" dataKey="Peletizado" strokeWidth={3} stroke="#82ca9d" activeDot={{ r: 8 }} />}
        {visibleAreas.Presas && <Line type="monotone" dataKey="Presas" stroke="#ff7300" strokeWidth={3} activeDot={{ r: 8 }} />}
        
        <Brush dataKey="TableName" height={30} stroke="#8884d8"  />
      </LineChart>
    </div>
  );
};

export default GroupedLineChartComponent;
