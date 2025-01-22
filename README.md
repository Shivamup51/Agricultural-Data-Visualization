# Indian Agriculture Data Visualization

A TypeScript-based project that visualizes Indian agriculture data, using Apache ECharts for data visualization and Mantine UI for responsive design. The project aims to display insights from Indian agricultural statistics, such as crop yields and production trends, through interactive charts and data tables.
## Features

- **Bar Chart**: Displays the average crop yields from 1950-2020, allowing users to observe trends over time.
- **Data Table**: Shows detailed crop production statistics, providing a granular look at individual crop outputs.
- **Responsive Design**: The application is fully responsive, ensuring a seamless experience across devices (desktop, tablet, and mobile).
- **Data Handling**: The project handles missing or incomplete data gracefully, using placeholder values or error messages as necessary.
- **Memoization for Performance**: To ensure the app performs well with large datasets, memoization techniques are used for computationally expensive operations.
##  Screenshots



## Technical Stack

- **TypeScript**: Provides strong typing and better tooling for handling complex data and logic.
- **Apache ECharts**: A powerful charting library that is used directly to create the bar chart and other visualizations.
- **Mantine UI**: A modern React component library used for the responsive design and UI components like the data table and layout.
- **React**: The core framework used for building the user interface.
## Setup and Running the Project

To get the project running locally, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/indian-agriculture-visualization.git
   cd indian-agriculture-visualization

2. **Install Dependencies Install the project dependencies using Yarn:**
   ```bash
   yarn install

3. **Run the Development Server Start the project in development mode:**
    ```bash
    yarn dev
4. **Open the Project in Your Browser Once the development server is running, open the project by visiting http://localhost:3000 in your browser.**




## Data Handling & Improvements


**Missing Values:** In case of missing or incomplete data, the app will either show default placeholder values or an error message indicating the issue.

**Performance Optimization:** Memoization is used in various components to prevent unnecessary re-renders and improve the overall performance of the app, especially when dealing with large datasets.


## Planned Improvements

**Error Handling:** We plan to implement more robust error handling, especially for API responses or data fetch failures, to improve reliability.

**Advanced Data Filtering:** We aim to add more filtering options for the data table, allowing users to view crop statistics based on different parameters (e.g., region, crop type).
Dynamic Chart Updates: The bar chart will be made interactive, allowing users to filter or select specific years or crop types to visualize data more effectively.

## License
This project is licensed under the MIT License - see the LICENSE file for details.


### Notes:
1. Replace `path/to/bar-chart.png` and `path/to/data-table.png` with the actual paths to your images.
2. Feel free to adjust any links or information as per your actual project details.
