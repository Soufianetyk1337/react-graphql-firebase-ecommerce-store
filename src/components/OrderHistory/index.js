/* eslint-disable jsx-a11y/anchor-is-valid */
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
import "./OrderHistoryStyle.scss";
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
    <div className="wrapper">
      {Array.isArray(orders) &&
        orders.length > 0 &&
        orders.map((row, index) => {
          console.log(row);
          const { documentId, order_created_at, orderTotal, orderItems } = row;
          return (
            <>
              <div className="center-line">
                <a href="#" className="scroll-icon">
                  <i className="fas fa-caret-up"></i>
                </a>
              </div>
              <div
                className={index % 2 ? "row row-2" : "row row-1"}
                key={index}
              >
                <section>
                  <i className="icon bx bx-history"></i>
                  <div className="details">
                    <span className="title">ID:{"   "}</span>
                    {row.documentId}
                  </div>
                  <p>
                    <span className="title">Date:{"  "}</span>
                    {moment(order_created_at.nano).format("LLLL")}
                    <br />
                    <span className="title">Amount:</span> {orderTotal} $<br />
                    <span className="title">Items: </span> {orderItems.length}
                  </p>
                  <div className="bottom">
                    <a
                      href="#"
                      onClick={() => history.push(`/order/${documentId}`)}
                    >
                      Order Details
                    </a>
                  </div>
                </section>
              </div>
            </>
          );
        })}
    </div>
  );
}

export default OrderHistory;
/*

<div className="wrapper">
        <div className="center-line">
          <a href="#" className="scroll-icon">
            <i className="fas fa-caret-up"></i>
          </a>
        </div>
        <div className="row row-1">
          <section>
            <i className="icon fas fa-home"></i>
            <div className="details">
              <span className="title">Title of Section 1</span>
              <span>1st Jan 2021</span>
            </div>
            <p>
              Lorem ipsum dolor sit ameters consectetur adipisicing elit. Sed
              qui veroes praesentium maiores, sint eos vero sapiente voluptas
              debitis dicta dolore.
            </p>
            <div className="bottom">
              <a href="#">Read more</a>
              <i>- Someone famous</i>
            </div>
          </section>
        </div>
        <div className="row row-2">
          <section>
            <i className="icon fas fa-star"></i>
            <div className="details">
              <span className="title">Title of Section 2</span>
              <span>2nd Jan 2021</span>
            </div>
            <p>
              Lorem ipsum dolor sit ameters consectetur adipisicing elit. Sed
              qui veroes praesentium maiores, sint eos vero sapiente voluptas
              debitis dicta dolore.
            </p>
            <div className="bottom">
              <a href="#">Read more</a>
              <i>- Someone famous</i>
            </div>
          </section>
        </div>
        <div className="row row-1">
          <section>
            <i className="icon fas fa-rocket"></i>
            <div className="details">
              <span className="title">Title of Section 3</span>
              <span>3rd Jan 2021</span>
            </div>
            <p>
              Lorem ipsum dolor sit ameters consectetur adipisicing elit. Sed
              qui veroes praesentium maiores, sint eos vero sapiente voluptas
              debitis dicta dolore.
            </p>
            <div className="bottom">
              <a href="#">Read more</a>
              <i>- Someone famous</i>
            </div>
          </section>
        </div>
        <div className="row row-2">
          <section>
            <i className="icon fas fa-globe"></i>
            <div className="details">
              <span className="title">Title of Section 4</span>
              <span>4th Jan 2021</span>
            </div>
            <p>
              Lorem ipsum dolor sit ameters consectetur adipisicing elit. Sed
              qui veroes praesentium maiores, sint eos vero sapiente voluptas
              debitis dicta dolore.
            </p>
            <div className="bottom">
              <a href="#">Read more</a>
              <i>- Someone famous</i>
            </div>
          </section>
        </div>
        <div className="row row-1">
          <section>
            <i className="icon fas fa-paper-plane"></i>
            <div className="details">
              <span className="title">Title of Section 5</span>
              <span>5th Jan 2021</span>
            </div>
            <p>
              Lorem ipsum dolor sit ameters consectetur adipisicing elit. Sed
              qui veroes praesentium maiores, sint eos vero sapiente voluptas
              debitis dicta dolore.
            </p>
            <div className="bottom">
              <a href="#">Read more</a>
              <i>- Someone famous</i>
            </div>
          </section>
        </div>
        <div className="row row-2">
          <section>
            <i className="icon fas fa-map-marker-alt"></i>
            <div className="details">
              <span className="title">Title of Section 6</span>
              <span>6th Jan 2021</span>
            </div>
            <p>
              Lorem ipsum dolor sit ameters consectetur adipisicing elit. Sed
              qui veroes praesentium maiores, sint eos vero sapiente voluptas
              debitis dicta dolore.
            </p>
            <div className="bottom">
              <a href="#">Read more</a>
              <i>- Someone famous</i>
            </div>
          </section>
        </div>
        <div className="row row-1">
          <section>
            <i className="icon fas fa-map-marker-alt"></i>
            <div className="details">
              <span className="title">Title of Section 7</span>
              <span>6th Jan 2021</span>
            </div>
            <p>
              Lorem ipsum dolor sit ameters consectetur adipisicing elit. Sed
              qui veroes praesentium maiores, sint eos vero sapiente voluptas
              debitis dicta dolore.
            </p>
            <div className="bottom">
              <a href="#">Read more</a>
              <i>- Someone famous</i>
            </div>
          </section>
        </div>
      </div>
*/
