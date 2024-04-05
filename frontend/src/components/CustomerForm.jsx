import React, { useRef } from "react";
import { Formik } from "formik";
import { InputField, Button } from "./";
import { createCustomer, updateCustomer } from "../Network/customer.network";
import { validateCustomerForm } from "../utils";
import { toast } from "react-toastify";

const CustomerForm = ({
  isEdit = false,
  customer,
  modelClose,
  isRerenderDashboard,
  setIsRerenderDashboard,
}) => {
  const initialValues = {
    username: isEdit ? customer.userName : "",
    name: isEdit ? customer.name : "",
    email: isEdit ? customer.email : "",
    photo: null,
  };

  // Reference to the hidden file input
  const fileInputRef = useRef(null);

  // Function to handle file input change
  const handleFileChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("photo", file);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validate={(values) => validateCustomerForm(values)}
        onSubmit={(values, { setSubmitting }) => {
          if (!isEdit) {
            // update the existing customer
            createCustomer(values)
              .then((res) => {
                toast.success(res.data.message);
                setIsRerenderDashboard(!isRerenderDashboard);
                modelClose();
              })
              .catch((err) => {
                toast.error("Failed to update the customer");
                console.log(err);
              });
          } else {
            // Create a new customer
            updateCustomer(customer._id, values)  
              .then((res) => {
                toast.success(res.data.message);
                setIsRerenderDashboard(!isRerenderDashboard);
                modelClose();
              })
              .catch((err) => {
                toast.error(err.response.data.message);
              });
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue, // Access setFieldValue from Formik
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} className="p-7 flex flex-col gap-5">
            <InputField
              type="text"
              placeholder="Username"
              name="username"
              value={values.username}
              setValue={handleChange}
              validation={
                errors.username && touched.username && errors.username
              }
            />

            <InputField
              type="text"
              placeholder="Customer Name"
              name="name"
              value={values.name}
              setValue={handleChange}
              validation={errors.name && touched.name && errors.name}
            />

            <InputField
              type="text"
              placeholder="Email"
              name="email"
              value={values.email}
              setValue={handleChange}
              validation={errors.email && touched.email && errors.email}
            />

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(event) => handleFileChange(event, setFieldValue)}
            />

            {/* Text to trigger file input click */}
            <div>
              <span
                onClick={() => {
                  fileInputRef.current.click();
                }}
                className="text-blue-500 cursor-pointer underline"
              >
                Upload a photo
              </span>
            </div>

            <Button type="submit" width={"w-full"}>
              {isEdit ? "UPDATE CUSTOMER" : "ADD CUSTOMER"}
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default CustomerForm;
