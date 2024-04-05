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
    <div className="bg-white shadow-md flex justify-between items-center rounded-md pr-5">
      <img
        className="w-20 h-20 rounded-l-md"
        src={`data:image/png;base64, ${customer.profilePic}`}
        alt="profile"
      />
      <span>{customer.userName}</span>
      <span>{customer.name}</span>
      <span>{customer.email}</span>
      <div className="flex gap-5">
        <ButtonVariants type="success" handler={handleEditClick}>
          Edit
        </ButtonVariants>
        <ButtonVariants type="danger" handler={handleDeleteClick}>
          Delete
        </ButtonVariants>
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
