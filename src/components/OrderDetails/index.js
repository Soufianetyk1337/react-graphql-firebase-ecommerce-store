import React, { useEffect } from "react";
import "./style.scss";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setOrderDetails } from "../../redux/Orders/orderActions";

const columns = [
  {
    id: "productThumbnail",
    label: "",
  },
  {
    id: "productName",
    label: "Name",
  },
  {
    id: "productPrice",
    label: "Price",
  },
  {
    id: "quantity",
    label: "Quantity",
  },
];
const styles = {
  fontSize: "16px",
  width: "10%",
  cursor: "pointer",
};
const formatText = (colName, colValue) => {
  switch (colName) {
    case "productPrice":
      return `$${colValue}`;
    case "productThumbnail":
      return <img src={colValue} alt={colName} width={250} />;
    default:
      return colValue;
  }
};
function OrderDetails({ order }) {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setOrderDetails({}));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const orderItems = order && order.orderItems;
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col, index) => {
              return (
                <TableCell key={index} style={styles}>
                  {col.label}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(orderItems) &&
            orderItems.length > 0 &&
            orderItems.map((row, index) => {
              return (
                <TableRow key={index}>
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

export default OrderDetails;
