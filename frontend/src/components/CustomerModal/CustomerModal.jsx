import './CustomerModal.css'

export default function CustomerModal ({
    customerData,
    setCustomerData,
    setShouldCreateCustomer,
    setShouldUpdateCustomer,
    action,
    selectedCustomer
}){
    function handleActions() {
        if(action === "create")
            setShouldCreateCustomer(true)
        else if(action === "update")
            setShouldUpdateCustomer(true)
    }

    return (
        <>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" >Open modal for @mdo</button>

            <div className='list-menber shadow p-3 mb-5 bg-body rounded'>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">New batata</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                            <div class="mb-3">
                                <label for="recipient-name" class="col-form-label">Name:</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="recipient-name"
                                    value={customerData.name || selectedCustomer.name}
                                    name="name"
                                    onChange={(e)=>
                                        setCustomerData({...customerData, [e.target.name]: e.target.value})
                                    }
                                />
                            </div>
                            <div class="mb-3">
                                <label for="message-text" class="col-form-label">Email:</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="recipient-name"
                                    name="email"
                                    value={customerData.email || selectedCustomer.email}
                                    onChange={(e)=>
                                        setCustomerData({...customerData, [e.target.name]: e.target.value})
                                    }
                                />
                            </div>
                            <div class="mb-3">
                                <label for="message-text" class="col-form-label">Phone:</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="recipient-name"
                                    name="phone"
                                    value={customerData.phone || selectedCustomer.phone}
                                    onChange={(e)=>
                                        setCustomerData({...customerData, [e.target.name]: e.target.value})
                                    }
                                />
                            </div>
                            <div class="mb-3">
                                <label for="message-text" class="col-form-label">Address:</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="recipient-name"
                                    name="address"
                                    value={customerData.address || selectedCustomer.address}
                                    onChange={(e)=>
                                        setCustomerData({...customerData, [e.target.name]: e.target.value})
                                    }
                                />
                            </div>
                            <div class="mb-3">
                                <label for="message-text" class="col-form-label">CPF:</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="recipient-name"
                                    value={customerData.cpf || selectedCustomer.cpf}
                                    name="cpf"
                                    onChange={(e)=>
                                        setCustomerData({...customerData, [e.target.name]: e.target.value})
                                    }
                                />                            </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary"  onClick={() => handleActions()}>
                            {
                                action === "create" ?
                                    "Create customer"
                                :
                                    "Update customer"
                            }
                            </button>
                        </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
      );
};