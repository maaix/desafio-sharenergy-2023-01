import './ListComponent.css'
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

export default function ListComponent ({
  data,
  setAction,
  setShouldUpdateCustomer,
  setShouldDeleteCustomer,
  setCustomerData
}){
  return (
      <div className='list-menber shadow p-5 mb-5  rounded'>
        {
          data.photo?
            <img src={data.photo} alt="" className='profile-photo' />
          :<></>
        }
      
        <div className="data-wrapper">
          {
            data.full_name?
            <div className="data-label">
              <p>Full Name</p>
              {data.full_name}
            </div>
            :<></>
          }
          {
            data.name?
            <div className="data-label">
              <p>Name</p>
              {data.name}
            </div>

            :<></>
          }
          {
            data.email?
            <div className="data-label"><p>Email</p>{data.email}</div>
            :<></>
          }
          {
            data.user_name?
              <div className="data-label"><p>Age</p>{data.age}</div>
            :<></>
          }
          {
            data.user_name?
            <div className="data-label"><p>User Name</p>{data.user_name}</div>
            :<></>
          }
          <div className="btn-wrapper">
            <div className="data-label">
            <p>Edit</p>
            <button
              type="button"
              class="btn btn-primary list-button edit-button"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => {
                setAction("update")
                setCustomerData(data)
              }
            }
            >
              <AiFillEdit />
            </button>

            {/* <span onClick={() =>
              setShouldUpdateCustomer(true)
            >
              
            </span> */}
          </div>

          <div className="data-label">
          <p>Delete</p>

            <button
              type="button"
              class="btn btn-primary list-button"
              onClick={() => {
                // setAction("update")
                console.log("no delete", data)
                setCustomerData(data)
                setAction("delete")
                setShouldDeleteCustomer(true)
              }
            }
            >
              <AiFillDelete />
            </button>
          </div>
          </div>
        </div>
      </div>
  );
};