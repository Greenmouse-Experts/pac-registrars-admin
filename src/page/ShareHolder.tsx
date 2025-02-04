/* eslint-disable @typescript-eslint/no-unused-vars */
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
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../assets/9159105.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
const ShareHolderUpdate = () => {
  interface Props {
    created_at: string;
    email: string;
    id: number;
    name: string;
    suggestions: string | null;
    updated_at: string;
  }
  const [tableData, setTableData] = useState<Props[]>([]);

  const {
    data: _data,
    loading,
    refetch,
  } = useFetch("/admin/shareholder/update");

  console.log(_data);
  useEffect(() => {
    setTableData(_data?.data);
  }, [_data]);
  // delete waitlister
  const deleteLister = (id: number) => {
    axios
      .delete(`${BASEURL}/admin/delete/shareholder/update`, {
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
  const data = tableData?.map((row) => ({
    ...row,
    created_at: dayjs(row.created_at).format("DD/MMM/YYYY"),
  }));
  // pdf download
  const downloadAsPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });
  
    // Set the font size for the table
    const fontSize = 5;
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (doc as any).autoTable({
      head: [
        [
          "S/N",
          "First Name",
          "Middle Name",
          "Last Name",
          "Email",
          "Phone Number",
          "BVN",
          "NIN",
          "Gender",
          "Clearing",
          "Clearing House",
          "Kin First Name",
          "Kin Last Name",
          "Relationship with Kin",
          "Kin Phone Number",
          "Kin Email",
          "Data Policy",
          "Date Sent",
        ],
      ],
      body: tableData?.map((item, index) => [
        index + 1,
        item.firstName,
        item.middleName,
        item.lastName,
        item.email,
        item.phoneNumber,
        item.bvn,
        item.nin,
        item.gender,
        item.clearingHouseNumber,
        item.kinFirstName,
        item.kinLastName,
        item.kinRelationship,
        item.kinPhoneNumber,
        item.kinEmail,
        item.acceptDataPrivacyPolicy,
        dayjs(item.created_at).format("DD-MMM-YYYY"),
      ]),
      styles: {
        fontSize: fontSize,
      },
    });
  
    doc.save("shareholder.pdf");
  };
  

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
      <div>
        {!!tableData?.length && (
          <div className="download_style">
            {/* <CSVLink data={data}><div className="csv_download">
              <img src={logo} alt="csv" width={26} height={26}/> <span>Csv Download</span></div>
              </CSVLink> */}
            <button onClick={downloadAsPDF} className="pdf_download"></button>
          </div>
        )}
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 2000 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> First Name</TableCell>
              <TableCell> Middle Name</TableCell>
              <TableCell> Last Name</TableCell>

              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>

              <TableCell>BVN</TableCell>
              <TableCell>NIN</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Clearing House</TableCell>

              <TableCell>Next of Kin First Name</TableCell>
              <TableCell>Next of Kin Last Name</TableCell>
              <TableCell>Relationship with Next of Kin</TableCell>
              <TableCell>Next of Kin Phone Number</TableCell>
              <TableCell>Next of Kin Email</TableCell>

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
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.middleName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>

                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phoneNumber}</TableCell>

                  <TableCell>{row.bvn}</TableCell>
                  <TableCell>{row.nin}</TableCell>

                  <TableCell>{row.clearingHouseNumber}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell>{row.kinFirstName}</TableCell>
                  <TableCell>{row.kinLastName}</TableCell>
                  <TableCell>{row.kinRelationship}</TableCell>
                  <TableCell>{row.kinPhoneNumber}</TableCell>
                  <TableCell>{row.kinEmail}</TableCell>

                  <TableCell>{row.acceptDataPrivacyPolicy}</TableCell>
                  <TableCell>
                    {dayjs(row.createdAt).format("dd DD, MMMM, YYYY")}
                  </TableCell>
                  <TableCell>
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => deleteLister(row.id)}
                    >
                      <AutoDeleteIcon />
                    </p>
                  </TableCell>
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

export default ShareHolderUpdate;
