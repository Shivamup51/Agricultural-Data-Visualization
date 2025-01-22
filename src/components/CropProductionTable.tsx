import React, { useMemo } from "react";
import { Table, Title, Paper } from "@mantine/core";

interface AgricultureData {
  Country: string;
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": string | number;
}

interface CropProductionTableProps {
  data: AgricultureData[];
}

const CropProductionTable: React.FC<CropProductionTableProps> = ({ data }) => {
  const tableData = useMemo(() => {
    // Pre-calculate the length for better performance
    const dataLength = data.length;
    const yearlyData: Record<string, AgricultureData[]> = {};
    
    // Direct object assignment instead of reduce
    for (let i = 0; i < dataLength; i++) {
      const item = data[i];
      const year = item.Year;
      if (!yearlyData[year]) yearlyData[year] = [];
      yearlyData[year].push(item);
    }
    
    // Use typed arrays for better performance
    return Object.entries(yearlyData)
      .map(([year, yearData]) => {
        const len = yearData.length;
        let maxProduction = -Infinity;
        let minProduction = Infinity;
        let maxCrop = '';
        let minCrop = '';

        // Single loop for better performance
        for (let i = 0; i < len; i++) {
          const production = +yearData[i]["Crop Production (UOM:t(Tonnes))"];
          if (production > maxProduction) {
            maxProduction = production;
            maxCrop = yearData[i]["Crop Name"];
          }
          if (production < minProduction) {
            minProduction = production;
            minCrop = yearData[i]["Crop Name"];
          }
        }
        return { year, maxCrop, minCrop };
      })
      .sort((a, b) => +a.year - +b.year);  // Using unary + for faster conversion
  }, [data]);


  return (
    <Paper shadow="lg" p="md" style={{
      margin: '20px', maxWidth: '900px', marginLeft: 'auto', marginRight: 'auto', mt: '40px', borderRadius: '12px',
    }}>
      <Title order={2} align="center" mb="md" style={{ color: '#2C3E50', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
        Crop Production Summary (1950-2020)
      </Title>
      <Table
        striped
        highlightOnHover
        bordered= 'true'
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '16px',
          borderRadius: '8px',
        }}
      >
        <thead>
          <tr>
            <th style={{
              padding: '15px',
              textAlign: 'center',
              border: '1px solid #ddd',
              backgroundColor: '#4CAF50',
              color: '#fff',
              fontWeight: 'bold',
              borderRadius: '8px 8px 0 0',
              fontFamily: 'Arial, sans-serif',
            }}>
              Year
            </th>
            <th style={{
              padding: '15px',
              textAlign: 'center',
              border: '1px solid #ddd',
              backgroundColor: '#4CAF50', 
              color: '#fff',
              fontWeight: 'bold',
              borderRadius: '8px 8px 0 0',
              fontFamily: 'Arial, sans-serif',
            }}>
              Crop with Maximum Production in that Year
            </th>
            <th style={{
              padding: '15px',
              textAlign: 'center',
              border: '1px solid #ddd',
              backgroundColor: '#4CAF50', 
              color: '#fff',
              fontWeight: 'bold',
              borderRadius: '8px 8px 0 0',
              fontFamily: 'Arial, sans-serif',
            }}>
              Crop with Minimum Production in that Year
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr
              key={row.year}
              style={{
                backgroundColor: '#f9f9f9',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#eaf0e6'} // Hover effect
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'} // Reset background
            >
              <td style={{
                padding: '12px',
                textAlign: 'center',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontFamily: 'Arial, sans-serif',
              }}>
                {row.year}
              </td>
              <td style={{
                padding: '12px',
                textAlign: 'center',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontFamily: 'Arial, sans-serif',
              }}>
                {row.maxCrop}
              </td>
              <td style={{
                padding: '12px',
                textAlign: 'center',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontFamily: 'Arial, sans-serif',
              }}>
                {row.minCrop}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Paper>
  );
};

export default CropProductionTable;
