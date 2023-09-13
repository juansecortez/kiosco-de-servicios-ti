import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line, CartesianGrid, Brush} from 'recharts';
import { fetchStatsByType } from '../../../redux/actions/deviceActions';

const transformData = (data) => {
  const uniqueMonths = [...new Set(data.map(item => item.TableName))];
  return uniqueMonths.map(month => {
    const monthData = data.filter(item => item.TableName === month);
    let transformed = { TableName: month };
    monthData.forEach(item => {
      transformed[item.Tipo] = item.Uptime_A_P_;
    });
    return transformed;
  });
};

const GroupedLineChartTypeComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStatsByType());
  }, [dispatch]);

  const data = useSelector(state => state.deviceReducer.statsByType);
  const transformedData = transformData(data);

  const types = ["A.P.", "Switch", "WLC"];
  const colors = {
    "A.P.": "#8884d8",
    "Switch": "#ff7300",
    "WLC": "#34a4eb"
  };

  const [visibleTypes, setVisibleTypes] = useState({
    "A.P.": true,
    "Switch": true,
    "WLC": true
  });



  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          {types.map(type => (
            <span key={type} style={{ margin: 10 }}>
              <input
                type="checkbox"
                style={{ transform: 'scale(1.5)' }}
                checked={visibleTypes[type]}
                onChange={() => setVisibleTypes(prev => ({ ...prev, [type]: !prev[type] }))}
              />
              <label style={{ marginLeft: 5 }}>{type}</label>
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
        {types.map(type => visibleTypes[type] && (
          <Line key={type} type="monotone" strokeWidth={3}  dataKey={type} stroke={colors[type]} dot={true} activeDot={{ r: 8 }} />
        ))}
      

        <Brush dataKey="TableName" height={30} stroke="#8884d8"  />
      </LineChart>
    </div>
  );
};

export default GroupedLineChartTypeComponent;
