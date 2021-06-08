/* eslint-disable no-unused-vars */
import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import moment from "moment";
import { useHistory } from "react-router-dom";

const columns = [
  {
    id: "order_created_at",
    label: "Order Date",
  },
  {
    id: "documentId",
    label: "Order ID",
  },
  {
    id: "orderTotal",
    label: "Amount",
  },
];
const styles = {
  fontSize: "16px",
  width: "10%",
  cursor: "pointer",
};
const formatText = (colName, colValue) => {
  switch (colName) {
    case "orderTotal":
      return `£${colValue}`;
    case "order_created_at":
      return moment(colValue.nano).format("DD/MM/YYYY");

    default:
      return colValue;
  }
};
function OrderHistory({ orders }) {
  const history = useHistory();
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col, index) => {
              const { label } = col;
              return (
                <TableCell key={index} style={styles}>
                  {label}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(orders) &&
            orders.length > 0 &&
            orders.map((row, index) => {
              const { documentId } = row;
              return (
                <TableRow
                  style={styles}
                  key={index}
                  onClick={() => history.push(`/order/${documentId}`)}
                >
                  {columns.map((col, index) => {
                    const colName = col.id;
                    const colValue = row[colName];
                    const formattedText = formatText(colName, colValue);
                    return (
                      <TableCell key={index} style={styles}>
                        {formattedText}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrderHistory;
