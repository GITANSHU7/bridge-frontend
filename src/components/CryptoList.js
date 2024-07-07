import {
  Container,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useTheme } from "../ThemeContext";
import { getCryptoInfo, getCryptoList } from "../utils/api";
import CoinDetailsModal from './CoinDetailsModal';

const CryptoList = () => {
  const { toggleTheme, theme } = useTheme();
  const [cryptoList, setCryptoList] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchCryptoList = async () => {
      setLoading(true);
      const data = await getCryptoList(page, rowsPerPage);
      setCryptoList(data);
      setLoading(false);
    };
    fetchCryptoList();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleRowClick = async (id) => {
    setLoading(true);
    const coin = await getCryptoInfo(id);
    setSelectedCoin(coin);
    setLoading(false);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCoin(null);
  };

  const styles = {
    row: {
      cursor: "pointer",
      "&:hover": {
        backgroundColor: theme.palette.mode === 'dark' ? "#333" : "gold",
      },
      fontFamily: "Montserrat",
    },
    pagination: {
      color: theme.palette.mode === 'dark' ? "white" : "gold",
    },
    container: {
      textAlign: "center",
    },
    header: {
      margin: 18,
      fontFamily: "Montserrat",
    },
    tableHead: {
      backgroundColor: "#EEBC1D",
    },
    tableCellHead: {
      fontWeight: "700",
      fontFamily: "Montserrat",
    },
    image: {
      marginBottom: 10,
    },
    coinDetails: {
      display: "flex",
      gap: 15,
    },
    coinInfo: {
      display: "flex",
      flexDirection: "column",
    },
    coinSymbol: {
      textTransform: "uppercase",
      fontSize: 22,
    },
    positiveChange: {
      color: "rgb(14, 203, 129)",
      fontWeight: 500,
    },
    negativeChange: {
      color: "red",
      fontWeight: 500,
    },
  };

  return (
    <>
      <Container style={styles.container}>
        <Typography variant="h4" style={styles.header}>
          Cryptocurrency Tracker
        </Typography>
        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead style={styles.tableHead}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={styles.tableCellHead}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {cryptoList
                  .filter(
                    (coin) =>
                      coin.name.toLowerCase().includes(search.toLowerCase()) ||
                      coin.symbol.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => handleRowClick(row.id)}
                        style={styles.row}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={styles.coinDetails}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={styles.image}
                          />
                          <div style={styles.coinInfo}>
                            <span style={styles.coinSymbol}>
                              {row.symbol}
                            </span>
                            <span>{row.name}</span>
                          </div>
                        </TableCell>
                        <TableCell align="right">${row?.current_price}</TableCell>
                        <TableCell
                          align="right"
                          style={profit ? styles.positiveChange : styles.negativeChange}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">{row?.market_cap}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={100}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
      <CoinDetailsModal
        open={openModal}
        handleClose={handleCloseModal}
        coin={selectedCoin}
      />
    </>
  );
};

export default CryptoList;
