import React from "react";
import { MantineProvider, AppShell, Title, Container, AppShellHeader, createTheme,} from "@mantine/core";
import agricultureData from "./Data/agricultureData.json";
import CropProductionTable from "./components/CropProductionTable.tsx";
import CropYieldChart from "./components/CropYieldChart.tsx";

const theme = createTheme({
  fontFamily: 'sans-serif',
  primaryColor: 'orange',
});

const App: React.FC = () => {
  return (
    <MantineProvider theme={theme}>
      <AppShell
        padding="md"
        header={
          <AppShellHeader height={60} p="xs">
            <Title order={1}>Indian Agriculture Data Visualization</Title>
          </AppShellHeader>
        }
      >
        <Container size="xl">
          <div style={{ marginTop: '2rem' }}>
            <CropProductionTable data={agricultureData}/>
          </div>
          <div style={{ marginTop: '2rem' }}>
            <CropYieldChart data={agricultureData} />
          </div>
        </Container>
      </AppShell>
    </MantineProvider>
  );
};

export default App;
