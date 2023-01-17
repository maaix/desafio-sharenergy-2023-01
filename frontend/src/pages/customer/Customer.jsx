import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Navbar from '../../components/Navbar/Navbar';
import ListComponent from '../../components/ListComponent/ListComponent';
import api from '../../services/api';
import '../users/Users.css';
import PaginatedList from '../../components/PaginatedList/PaginatedList';
import CreateCustomerModal from '../../components/CreateCustomerModal/CreateCustomerModal';
import './Customer.css'

export default function Customer() {
  const [allCustomers, setAllCustomers] = useState([]);
  const [ page, setPage ] = useState(1);
  const [ pageCount, setPageCount ] = useState(0);
  const [shouldReloadList, setShouldReloadList] = useState(false);
  const [customerData, setCustomerData] = useState({
    "name": "",
    "email": "",
    "phone": "",
    "address": "",
    "cpf": "",
  });
  const [shouldCreateCustomer,setShouldCreateCustomer] = useState(false);
  const [shouldUpdateCustomer, setShouldUpdateCustomer] = useState(false);
  const [shouldDeleteCustomer, setShouldDeleteCustomer] = useState(false);
  const [action, setAction] = useState("");
 
  useEffect( ()=> {
      async function getAllCustomers() {
        try {
          const response = await api.get(`/customer/read?page=${page}`);
    
          setAllCustomers(response.data.customer)
          setAllCustomers(response.data.customer)

          setPageCount(response.data.pagination.pageCount)
        }
        catch (error) {
          console.log(error);
        }
      }
      getAllCustomers();
      setShouldReloadList(false)
    },[page,shouldReloadList]);
  
  useEffect(() => {
    if (!shouldCreateCustomer) {
      return;
    }
    
    async function createCustomer() {
      try {
        const response = await api.post(`customer/create`,customerData);
        setShouldReloadList(true)
        
      }
      catch (error) {
        console.log(error);
      }
    }
    createCustomer()
    setShouldCreateCustomer(false)
  }, [shouldCreateCustomer])

  useEffect(() => {
    if (!shouldUpdateCustomer) {
      return;
    }
    
    async function updateCustomer() {
      try {
        console.log("Customer data antes do update", customerData)
        const response = await api.put(`customer/update?${customerData._id}`, customerData);
        setShouldReloadList(true)
      }
      catch (error) {
        console.log(error);
      }
    }
    updateCustomer()
    setShouldUpdateCustomer(false)
  }, [shouldUpdateCustomer])

  useEffect(() => {
    if (!shouldDeleteCustomer) {
      return;
    }
    
    async function deleteCustomer() {
      try {
        console.log("COSTUMER ADELETE", customerData)
        const response = await api.delete(`customer/delete?id=${customerData._id}`);
        setShouldReloadList(true)
      }
      catch (error) {
        console.log(error);
      }
    }
    deleteCustomer()
    setShouldDeleteCustomer(false)
  }, [shouldDeleteCustomer])

  return (

      <div className='customer-wrapper'>
        <Navbar />
        <div className="customer-content">
          <CreateCustomerModal
          //  mudar nome para CustomerModal
            customerData={customerData}
            setCustomerData={setCustomerData}
            allCustomers={allCustomers}
            setShouldCreateCustomer={setShouldCreateCustomer}
            setShouldUpdateCustomer={setShouldUpdateCustomer}
            action={action}
            setAction={setAction}
          />   

          <PaginatedList
            data={allCustomers}
            listName="Users"
            page={page}
            setPage={setPage}
            pageCount={pageCount}
            setPageCount={setPageCount}
            setShouldUpdateCustomer={setShouldUpdateCustomer}
            setAction={setAction}
            setCustomerData={setCustomerData}
            setShouldDeleteCustomer={setShouldDeleteCustomer}
          />
        </div>
      
      </div>
    );
  
}