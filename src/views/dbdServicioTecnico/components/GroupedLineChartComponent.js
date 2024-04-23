import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  LineChart, XAxis, YAxis, Tooltip, Legend, Line, CartesianGrid, Brush
} from 'recharts';
import { fetchMonthlyServicesByArea } from '../../../redux/actions/deviceActions';

const transformData = (data, selectedYear) => {
  let result = [];

  for (let month = 1; month <= 12; month++) {
    let transformed = { YearMonth: `${selectedYear}-${month < 10 ? '0' + month : month}` };

    ["Mina", "Peletizado", "Presas", "Otro"].forEach(area => {
      const monthData = data.find(item => item.Year === selectedYear && item.Month === month && item.Area === area);
      transformed[area] = monthData ? monthData.TotalServices : 0;
    });

    result.push(transformed);
  }

  return result;
};

const GroupedLineChartComponent = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchMonthlyServicesByArea());
  }, [dispatch]);

  const data = useSelector(state => state.deviceReducer.monthlyServicesByArea);

  const years = [...new Set(data.map(item => item.Year))];
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const transformedData = transformData(data, selectedYear);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        {years.map(year => (
          <span key={year} style={{ margin: 10 }}>
            <input
              type="checkbox"
              style={{ transform: 'scale(1.5)' }}
              checked={selectedYear === year}
              onChange={() => setSelectedYear(year)}
            />
            <label style={{ marginLeft: 5 }}>{year}</label>
          </span>
        ))}
      </div>

      <LineChart width={1100} height={500} data={transformedData} margin={{ top: 20, right: 40, left: 10, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="YearMonth" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Mina" strokeWidth={3} stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="Peletizado" strokeWidth={3} stroke="#82ca9d" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="Presas" strokeWidth={3} stroke="#ff7300" activeDot={{ r: 8 }} />
        

        <Brush dataKey="YearMonth" height={30} stroke="#8884d8"  />
      </LineChart>
    </div>
  );
};

export default GroupedLineChartComponent;
