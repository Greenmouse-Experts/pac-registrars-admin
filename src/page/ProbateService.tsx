// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";
import Loader from "../assets/Loader/Loader";
import { useTheme } from "@mui/material/styles";
import { Box, TableFooter, TablePagination } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
// import { CSVLink } from "react-csv";
// import jsPDF from "jspdf";
import "jspdf-autotable";
// import logo from '../assets/9159105.png'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useFetch from "../hooks/useFetch";
import { getToken } from "../helpers/getToken";
import { BASEURL } from "../config/url";
import axios from "axios";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}
const ProbateService = () => {
  interface Props {
    created_at: string;
    email: string;
    id: number;
    name: string;
    suggestions: string | null;
    updated_at: string;
  }
  const [tableData, setTableData] = useState<Props[]>([]);
  // const fetchWaitList = () => {
  //   fetch("https://api.gleemora.com/api/waitlist")
  //     .then((data) => data.json())
  //     .then((data) => {
  //       setTableData(data.data);
  //       setLoading(false);
  //     })
  //     .catch(error => console.error(error));
  // }
  const { data:_data, loading, refetch } = useFetch('/admin/probate/service');

  console.log(_data)
  useEffect(() => {
    setTableData(_data?.data)
  }, [_data]);
  // delete waitlister
  const deleteLister = (id: number) => {
    axios
      .delete(`${BASEURL}/admin/delete/probate/service`, {
        data: { id },
        headers: {
          Authorization: getToken(),
        },
      })
      .then((response) => {
        refetch();
        console.log("Deletion successful:", response);
        toast.success("Service deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting the service:", error);
      });
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
//   const data = tableData?.map(row => ({...row, created_at: dayjs(row.created_at).format("DD/MMM/YYYY")}))
  // pdf download
//   const downloadAsPDF = () => {
//     const doc = new jsPDF();
//     (doc as any).autoTable({
//       head: [
//         [
//           "S/N",
//           "Full Name",
//           "Email",
//           "Suggestions",
//           "Date Joined",
//         ],
//       ],
//       body: tableData?.map((item, index) => [
//           index + 1,
//           item.name,
//           item.email,
//           item.suggestions,
//           dayjs(item.created_at).format("DD-MMM -YYYY"),
//         ]),
//     });

//     doc.save("waitlist.pdf");
//   };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    event?.preventDefault();
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
    <ToastContainer />
      {/* <div>
        {!!tableData?.length && (
          <div className="download_style">
            <CSVLink data={data}><div className="csv_download">
              <img src={logo} alt="csv" width={26} height={26}/> <span>Csv Download</span></div></CSVLink>
            <button onClick={downloadAsPDF} className="pdf_download"></button>
          </div>
        )}
      </div> */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Whatsapp Number</TableCell>
              <TableCell>Organization Name</TableCell>
            
              <TableCell>Death Place</TableCell>
              <TableCell>Brief Details</TableCell>
              <TableCell>Accept Data Policy</TableCell>
              <TableCell>Date Sent</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!tableData?.length &&
              (rowsPerPage > 0
                ? tableData.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : tableData
              )?.map((row: Props) => (
                <TableRow
                  key={row.email}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phoneNumber}</TableCell>
                  <TableCell>{row.whatsappNumber}</TableCell>
                  <TableCell>{row.nameOrganization}</TableCell>
            
                  <TableCell>{row.placeDeath}</TableCell>
                  <TableCell>{row.serviceBriefDetails}</TableCell>
                  <TableCell>{row.acceptDataPrivacyPolicy}</TableCell>
                  <TableCell>
                    {dayjs(row.createdAt).format("dd DD, MMMM, YYYY")}
                  </TableCell>
                  <TableCell><p style={{cursor: 'pointer'}} onClick={() => deleteLister(row.id)}><AutoDeleteIcon/></p></TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={tableData?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {loading && (
        <div className="place-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ProbateService;
