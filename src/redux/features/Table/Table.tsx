import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SingleUser } from "../../../utils/api/interfaces/index.dto";
import { toast } from "react-hot-toast";
import { fetchAllUsers } from "../../api";
import "./Table.css";
import { UserDetails } from "./TableSlice";
import { useNavigate } from "react-router-dom";

const Table = () => {
  const { currentUser, isFetching, error } = useSelector(UserDetails);

  const [selectedNumber, setSelectedNumber] = useState<string>("");
  const [isPageLoad, setIsPageLoad] = useState<boolean>(false);
  const [trackedUser, setTrackedUser] = useState<null | any[]>(currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNext = () => {
    if (selectedNumber === "") {
      return toast.error("Select a valid row to see next page");
    }
    setIsPageLoad(false);
    fetchAllUsers(dispatch, parseInt(selectedNumber));
    setTrackedUser((previous: null | any[]) => {
      return (previous = [...(trackedUser as any), currentUser]);
    });
  };

  const handlePrev = () => {
    console.log("tracked user is ", trackedUser);

    console.log("tracked user pop is ", trackedUser?.pop());
    console.log("i am active");
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
    <div className="App">
      <table>
        <caption>Random Users Summary</caption>
        <caption>
          <label htmlFor="cars">Select number of rows to display:</label>
          <select
            name="cars"
            id="cars"
            value={selectedNumber}
            onChange={(e) => {
              setSelectedNumber(e.target.value);
              fetchAllUsers(dispatch, parseInt(e.target.value));
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
        <button type="button" className="navButton" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
