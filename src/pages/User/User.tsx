import React from 'react';
import { useParams } from 'react-router-dom';



const User = () => {
  
  const { city } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const dob = queryParams.get("dob") as string;
  const picture = queryParams.get("p") as string;
    const nationality = queryParams.get("nat") as string;



  return (
    <>
      <div>
        <img src={`${picture}`} alt="profile_image" />
        <p>City: { city }</p>
        <p>Date of Birth: { dob.substring(0,10)}</p>
        <p>Nationality: { nationality}</p>
      </div>
    </>
  );
}

export default User;
