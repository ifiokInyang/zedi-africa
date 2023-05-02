import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SingleUser } from "../../../utils/api/interfaces/index.dto";
import { fetchUser } from "../../api";
import "./Table.css";
import { UserDetails } from "./TableSlice";

const Table = () => {
  const [selectedNumber, setSelectedNumber] = useState<string>("");

  const dispatch = useDispatch();
  const { currentUser, isFetching, error } = useSelector(UserDetails);

  useEffect(() => {
    fetchUser(dispatch);
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
              fetchUser(dispatch, parseInt(selectedNumber));
            }}
          >
            <optgroup label="rows">
              <option value="5">5</option>
              <option value="10">10</option>
            </optgroup>
          </select>
        </caption>
        <thead>
          <tr>
            <th scope="col">Full Name</th>
            <th scope="col">Country</th>
            <th scope="col">Email Address</th>
            <th scope="col">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {currentUser?.map((user: SingleUser) => (
            <tr key={user.login.uuid}>
              <td data-label="Full Name">{`${user.name.first} ${user.name.last}`}</td>
              <td data-label="Country">{user.location.country}</td>
              <td data-label="Email Address">{user.email}</td>
              <td data-label="Phone Number">{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
