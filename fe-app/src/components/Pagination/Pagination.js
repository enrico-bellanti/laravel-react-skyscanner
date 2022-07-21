import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, PaginationItem } from "@material-ui/lab";

//actions
import { getFlightsBySearch } from "../../actions/flights";

import useStyles from "./styles";

const Paginate = () => {
  const { numberOfPages, searchParams } = useSelector((state) => state.flights);
  const [page, setPage] = useState(0);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (page)
      dispatch(
        getFlightsBySearch({
          code_departure: searchParams.code_departure,
          code_arrival: searchParams.code_arrival,
          page,
        })
      );
  }, [page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      onChange={(e) => setPage(e.target.value)}
      renderItem={(item) => <PaginationItem {...item} value={item.page} />}
    />
  );
};

export default Paginate;
