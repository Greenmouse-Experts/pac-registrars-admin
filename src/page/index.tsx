// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import React from "react";
import { Tab, Tabs } from "@mui/material";
import "../index.css";
import WaitlistTable from "./waitlist";
import Box from "@mui/material/Box";

import DocumentManagement from "./DocumentManagement";
import ProbateService from "./ProbateService";
import RegistrarService from "./RegistrarService";
import UpdateName from "./updateName";
import UpdateSignature from "./UpdateSignature";
import UpdateAddress from "./UpdateAddress";
import ShareHolderUpdate from "./ShareHolder";
import KycService from "./KycService";

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
            src="https://asqyfzgqnbxthtasplew.supabase.co/storage/v1/object/public/cabin-images/logo.svg"
            alt="logo"
            className="logo_img"
          />
        </div>
        <div>
          <Box
            sx={{
              bgcolor: "background.paper",
              margin: "20px",
              paddingTop: "20px",
              paddingX: "9px",
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
              <Tab label="Company Secretarial" {...a11yProps(0)} />
              <Tab label="Document Management" {...a11yProps(1)} />
              <Tab label="Probate Services" {...a11yProps(2)} />
              <Tab label="Registrar Service" {...a11yProps(3)} />
              <Tab label="Update Name" {...a11yProps(4)} />
              <Tab label="Update Signature" {...a11yProps(5)} />
              <Tab label="Update Address" {...a11yProps(6)} />
              <Tab label="Shareholder Update" {...a11yProps(7)} />
             
              <Tab label="Kyc Service" {...a11yProps(8)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <WaitlistTable />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <DocumentManagement />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <ProbateService />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <RegistrarService />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <UpdateName />
            </TabPanel>
            <TabPanel value={value} index={5}>
              <UpdateSignature />
            </TabPanel>
            <TabPanel value={value} index={6}>
              <UpdateAddress />
            </TabPanel>
            <TabPanel value={value} index={7}>
              <ShareHolderUpdate />
            </TabPanel>
           
            <TabPanel value={value} index={8}>
              <KycService />
            </TabPanel>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Homepage;
