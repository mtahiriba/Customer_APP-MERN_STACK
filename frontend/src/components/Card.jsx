import React, { useState, useEffect } from "react";
import {
  ButtonVariants,
  ModelLayout,
  CustomerForm,
  ConformationModelLayout,
} from "./";
import { deleteCustomer } from "../Network/customer.network";
import { toast } from "react-toastify";

const Card = ({ customer, isRerenderDashboard, setIsRerenderDashboard }) => {
  const [isEditCustomers, setIsEditCustomers] = useState(false);
  const [isDeleteClick, setIsDeleteClick] = useState(false);
  const [deleteResponse, setDeleteResponse] = useState(false);

  // handle edit button click
  const handleEditClick = () => {
    setIsEditCustomers(true);
  };

  // handle model close
  const handleModelClose = () => {
    setIsEditCustomers(false);
  };

  // handle delete button click
  const handleDeleteClick = () => {
    setIsDeleteClick(true);
  };

  useEffect(() => {
    if (deleteResponse) {
      deleteCustomer(customer._id)
        .then((res) => {
          toast.success(res.data.message);
          setIsRerenderDashboard(!isRerenderDashboard);
          setDeleteResponse(false);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setDeleteResponse(false);
        });
    }
  }, [deleteResponse]);

  return (
    <div className="bg-white shadow-md flex sm:gap-24 justify-between items-center rounded-md p-5 sm:pr-5 ">
      <img
        className="w-20 h-20 rounded-l-md"
        src={`data:image/png;base64, ${customer.profilePic}`}
        alt="profile"
      />
      <div className="sm:w-[100%] flex flex-col gap-3 sm:flex-row justify-between">
        <div className="flex flex-col xl:flex-row justify-between xl:w-[500px] 2xl:w-[650px] ">
          <span>{customer.userName}</span>
          <span>{customer.name}</span>
          <span>{customer.email}</span>
        </div>
        
        <div className="flex gap-5">
          <ButtonVariants type="success" handler={handleEditClick}>
            Edit
          </ButtonVariants>
          <ButtonVariants type="danger" handler={handleDeleteClick}>
            Delete
          </ButtonVariants>
        </div>
      </div>

      {/* Model for Edit a customer */}
      <ModelLayout
        isOpen={isEditCustomers}
        onClose={handleModelClose}
        title={"Edit Customer"}
      >
        <CustomerForm
          modelClose={handleModelClose}
          isEdit={true}
          customer={customer}
          isRerenderDashboard={isRerenderDashboard}
          setIsRerenderDashboard={setIsRerenderDashboard}
        />
      </ModelLayout>

      {/* Model for getting confirmation for delete Item */}
      <ConformationModelLayout
        isOpen={isDeleteClick}
        onClose={setIsDeleteClick}
        setDeleteResponse={setDeleteResponse}
      />
    </div>
  );
};

export default Card;
