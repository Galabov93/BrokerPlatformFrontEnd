import React from "react";
import { makeStyles } from "@material-ui/core";
import ReactPaginate from "react-paginate";

const useStyles = makeStyles(theme => ({
  paginationContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    "& .pagination": {
      display: "flex",
      justifyContent: "center",
      width: "100%",
      "& li": {
        listStyleType: "none",
        margin: theme.spacing(1) / 2,
        color: "#2196f3",
        backgroundColor: "#fff",
        border: "none",
        borderRadius: 45,
        boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease 0s",
        cursor: "pointer",
        outline: "none",
        "& a": {
          padding: theme.spacing(1) + 4,
          outline: "none",
          width: "100%",
          height: "100%"
        }
      },
      "& .active": {
        color: "#0d47a1",
        boxShadow: "0px 4px 23px rgba(0, 0, 0, 0.3)",
        fontWeight: "bolder"
      }
    }
  }
}));

export default function Pagination({ page, total, handlePageClick, LIMIT }) {
  const classes = useStyles();
  return (
    <div className={classes.paginationContainer}>
      <ReactPaginate
        initialPage={page}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={total / LIMIT}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}
