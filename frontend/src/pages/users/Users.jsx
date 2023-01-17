import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from "axios"
import { toast, ToastContainer } from 'react-toastify';
import Navbar from '../../components/Navbar/Navbar';
import ListComponent from '../../components/ListComponent/ListComponent';
import api from '../../services/api';
import './Users.css';
import PaginatedList from '../../components/PaginatedList/PaginatedList';

export default function Users() {
  const navigate = useNavigate();
  const [cookies,  setCookie, removeCookie] = useCookies([]);
  const [allUsers, setAllUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [initalPageCount, setInitialPageCount] = useState(0);
  const [shouldReloadList, setShouldReloadList] = useState(false)
  const [searchValue,setSearchValue] = useState("");
  const [values, setValues] = useState({
    email: "",
    password: "",
    
  });

  useEffect(()=> {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        console.log("ta fazendo esse login varias vezes")
        const {data} = await axios.post(
          "http://localhost:3333/",
          {},
          {withCredentials: true},
        ).then(() => console.log("entrou no then, ou seja, deu bom")).catch(e => console.log("erororororo", e));
        if (!data.status){
          removeCookie("jwt");
          navigate("/login");
        } else toast(`HI ${data.user}`, {theme: "dark"});
      };
    };
    verifyUser();
  }, [cookies,navigate, removeCookie]);

  useEffect( ()=> {
    async function getAllUsers() {
      try {
        console.log("should reload list", shouldReloadList)
        const response = await api.get(`/user/users?page=${page}`);
  
        setAllUsers(response.data.user)
  
        setPageCount(response.data.pagination.pageCount)
        setInitialPageCount(pageCount)
      }
      catch (error) {
        console.log(error);
      }
    }
    getAllUsers();
  },[page,shouldReloadList]);

  useEffect(()=> {
    async function getSearchedUsers() {
      try {
        setPage(1);
        
        const response = await api.get(`/user/users_by_string?searchedString=${searchValue}&page=${page}`);
        if(!searchValue && pageCount !== initalPageCount) {
          setPageCount(initalPageCount);
        } else {
          setPageCount(response.data.pagination.pageCount);
        }
        setAllUsers(response.data.user);
      }
      catch (error) {
        console.log(error);
      }
    }
  
    getSearchedUsers();
  },[searchValue])

  const handleSubmit = async (userFilter) => {
    
    try{
      console.log("valor", values);
      console.log("user", userFilter);
        const {data} = await api.post("/user/generate_user",{
          ...userFilter,
        },{
            withCredentials: true,
        });
        console.log("pos", data);
    
    } catch(err){
        console.log(err);
    }
  }
  
  function handleChange (e) {
    e.preventDefault();
  
    setSearchValue(e.target.value)
  }

  const fetchUser = async () => { 

    const APIresponse = await fetch('https://randomuser.me/api/');

    if (APIresponse.status === 200){
      console.log(APIresponse.data)
      const user = await APIresponse.json();
      const fullName = user.results[0]['name']['title']+" "+user.results[0]['name']['first']+ " " + user.results[0]['name']['last']
      const userFilter = {
        "email": user.results[0]['email'],
        "password": user.results[0]['login']['password'],
        "photo" : user.results[0]['picture']['thumbnail'],
        "full_name": fullName,
        "user_name": user.results[0]['login']['username'], 
        "age": user.results[0]['registered']['age']
      }
      console.log(user.results[0]['name'],
      user.results[0]['email'],
      user.results[0]['login']['password'], 
      user.results[0]['dob']['age'],

      );

      setValues(userFilter);
      console.log("pre", values)
      setShouldReloadList(!shouldReloadList);
      handleSubmit(userFilter);
  } 
  }
  console.log("pageeee", page)

  return (
    <>
      <div className="users-wrapper col-12">
        <Navbar />
        <div className='users-content p-5 mb-9'>
          <div className="top-bar">
            <div class="input-group search-bar">
              <span className='search-img' /*class="input-group-text"*/>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
              </span>

              <input 
                type="text" 
                className='  search-input' 
                aria-label="Dollar amount (with dot and two decimal places)"
                value={searchValue}
                onChange={handleChange}
                placeholder = "Search user..."
              />
              
              
            </div>
            <button
              className='generate-user'
              onClick={() => fetchUser()
            }>
              Generate random user
            </button>
          </div>
          
          <PaginatedList
            data={allUsers}
            listName="Users"
            page={page}
            setPage={setPage}
            pageCount={pageCount}
           setPageCount={setPageCount}
          />
          {/* <ul> 
            <h1>Users List</h1>
            {
              allUsers?.map(data => (
                <ListComponent data={data} />
              ))
            }
            
          </ul> */}
          {/* <footer>
              <button
                disabled={page === 1}
                onClick={handlePrevious}
              >
                Previous
              </button>
              <button 
                disabled={page === Math.ceil(pageCount)}
                onClick={handleNext}
              >
                Next
              </button>
          </footer> */}
        </div>
      </div>
      <ToastContainer/>   
    </>
  );
}