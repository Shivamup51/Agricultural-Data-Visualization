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
    // Group data by year
    const yearlyData: Record<string, AgricultureData[]> = data.reduce((acc: { [key: string]: AgricultureData[] }, item) => {
      const year = item.Year;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(item);
      return acc;
    }, {});

    // Calculate max and min for each year
    return Object.entries(yearlyData).map(([year, yearData]) => {
      let maxProduction = -Infinity;
      let minProduction = Infinity;
      let maxCrop = '';
      let minCrop = '';

      yearData.forEach(item => {
        // Convert production value to number and handle potential NaN
        const production = parseFloat(item["Crop Production (UOM:t(Tonnes))"].toString());
        if (!isNaN(production)) {
          if (production > maxProduction) {
            maxProduction = production;
            maxCrop = item["Crop Name"];
          }
          if (production < minProduction) {
            minProduction = production;
            minCrop = item["Crop Name"];
          }
        }
      });

      return {
        year,
        maxCrop,
        minCrop,
      };
    }).sort((a, b) => parseInt(a.year) - parseInt(b.year));
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
