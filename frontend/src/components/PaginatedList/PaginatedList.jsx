import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from "axios"
import { toast, ToastContainer } from 'react-toastify';
import '../../pages/users/Users.css';
import ListComponent from '../ListComponent/ListComponent';
import './PaginatedList.css'

export default function PaginatedList({
    data,
    listName,
    page,
    setPage,
    pageCount,
    setAction,
    setPageCount,
    setShouldUpdateCustomer,
    setCustomerData,
    setShouldDeleteCustomer
}) {

  function handlePagination(goNextPage) {
    setPage((page)=> goNextPage ? page + 1 : page - 1);
  }

  let disabled_previous = page === 1 
  let disabled_next = page === Math.ceil(pageCount)
  let disabled_style = {'background-color': 'gray', 'cursor': 'auto'}

  return (
    <>
      {/* <div className="wrapper col-12"> */}
        <div className='content'>
          <ul> 
            <h1>{listName}</h1>
            {
              data?.map((item, index) => (
                <ListComponent
                  data={item}
                  key={index}
                  setShouldUpdateCustomer={setShouldUpdateCustomer}
                  setAction={setAction}
                  setCustomerData={setCustomerData}
                  setShouldDeleteCustomer={setShouldDeleteCustomer}
                />
              ))
            }
            
          </ul>
          <footer>
              <button
                disabled={disabled_previous}
                onClick={() => handlePagination(false)}
                className='previous_btn'
                style={disabled_previous ? disabled_style : {}}
              >
                Previous
              </button>
              <button 
                disabled={disabled_next}
                onClick={() => handlePagination(true)}
                style={disabled_next ? disabled_style : {}}
              >
                Next
              </button>
          </footer>
        </div>
      {/* </div> */}
      <ToastContainer/>   
    </>
  );
}