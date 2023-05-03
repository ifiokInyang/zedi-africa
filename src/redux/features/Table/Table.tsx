import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SingleUser } from "../../../utils/api/interfaces/index.dto";
import { toast } from "react-hot-toast";
import { fetchAllUsers } from "../../api";
import "./Table.css";
import { UserDetails } from "./TableSlice";
import { useNavigate } from "react-router-dom";

const Table = () => {
  const { currentUser, isFetching, error, total } = useSelector(UserDetails);
  
  const [currPage, setCurrPage] = useState<number>(1);
  const [selectedNumber, setSelectedNumber] = useState<string>("");
  const [isPageLoad, setIsPageLoad] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //function to handle Next click
  const handleNext = () => {
    if (selectedNumber === "") {
      return toast.error("Select a valid row to see next page");
    } else if (total < 50) {
      setIsPageLoad(false);
      setCurrPage((prev: number) => prev + 1);
      fetchAllUsers(dispatch, "", parseInt(selectedNumber), currPage + 1);
    } else {
      toast.error("You've reached the end of the list");
    }
  };

  const handlePrev = () => {
    if (selectedNumber === "") {
      return toast.error("Select a valid row to see next page");
    }

    setCurrPage((prev: number) => (prev > 1 ? prev - 1 : 1));
    if (currPage === 1) {
      setIsPageLoad(true);
    }

    fetchAllUsers(dispatch, "", parseInt(selectedNumber), currPage - 1);
  };

  const handleUserClick = (user: SingleUser) => {
    if (user.location.city.includes("/")) {
      const replaced = user.location.city.replace("/", "_");
      navigate(
        `/user/${replaced}?p=${user.picture.large}&dob=${user.dob.date}&nat=${user.nat}`
      );
    } else {
      navigate(
        `/user/${user.location.city}?p=${user.picture.large}&dob=${user.dob.date}&nat=${user.nat}`
      );
    }
  };

  useEffect(() => {
    return () => {
      setIsPageLoad(true);

      fetchAllUsers(dispatch);
    };
  }, []);

  return (
    <div className="tableContainer">
      <table>
        <caption className="tableTitle">Random Users Table</caption>
        <caption>
          <label htmlFor="users">Select number of rows to display: </label>
          <select
            className="selectGroup"
            name="users"
            id="users"
            value={selectedNumber}
            onChange={(e) => {
              setSelectedNumber(e.target.value);
              fetchAllUsers(dispatch, "", parseInt(e.target.value));
            }}
          >
            <optgroup label="rows">
              <option value="">--Select Row--</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </optgroup>
          </select>
        </caption>
        <thead>
          <tr>
            <th scope="col">S/N</th>
            <th scope="col">Full Name</th>
            <th scope="col">Country</th>
            <th scope="col">Email Address</th>
            <th scope="col">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {currentUser?.map((user: SingleUser, index: number) => (
            <tr key={user.login.uuid}>
              <td data-label="S/N">{1 + index++}</td>

              <td
                data-label="Full Name"
                onClick={() => handleUserClick(user)}
                className="nameField"
              >{`${user.name.first} ${user.name.last}`}</td>
              <td data-label="Country">{user.location.country}</td>
              <td data-label="Email Address">{user.email}</td>
              <td data-label="Phone Number">{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttonContainer">
        <button
          type="button"
          className="navButton"
          disabled={isPageLoad}
          onClick={handlePrev}
        >
          Previous
        </button>
        <button
          type="button"
          className="navButton"
          onClick={handleNext}
          disabled={isFetching}
        >
          Next
        </button>
      </div>
      <div>
        <p className="pageNum">
          Page: {currPage}
        </p>
      </div>
    </div>
  );
};

export default Table;
