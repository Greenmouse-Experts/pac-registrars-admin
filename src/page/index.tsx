import React from "react";
import { Tab, Tabs } from "@mui/material";
import "../index.css";
import WaitlistTable from "./waitlist";
import Box from "@mui/material/Box";
import SurvivorList from "./survivorList";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
const Homepage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault()
    setValue(newValue);
  };
  return (
    <>
      <div className="home-bg">
        <div className="img_con">
          <img
            src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1701951271/Gleemora/Group_48097509_4_1_dyftig.png"
            alt="logo"
            className="logo_img"
          />
        </div>
        <div>
          <Box
            sx={{
              bgcolor: "background.paper",
              margin: "20px",
              borderRadius: "20px",
              minHeight: '500px'
            }}
          >
            <Tabs
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
              value={value}
              onChange={handleChange}
              centered
            >
              <Tab label="Waitlist" {...a11yProps(0)} />
              <Tab label="Survivor / Caregiver Mentor" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <WaitlistTable />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <SurvivorList />
            </TabPanel>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Homepage;
