import React, { useState, useEffect } from "react";
import { getAllCustomers } from "../Network/customer.network";
import { toast } from "react-toastify";
import {
  ModelLayout,
  CustomerForm,
  AsideBar,
  Button,
  Menu,
  Card,
  HeaderBar
} from "../components";

const Home = () => {
  const [isAddCustomers, setIsAddCustomers] = useState(false);
  const [isRerenderDashboard, setIsRerenderDashboard] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [sorting, setSorting] = useState({
    sortBy: "userName",
    order: "desc"
  })

  useEffect(() => {
    // fetch all customers
    getAllCustomers(sorting.sortBy, sorting.order)
      .then((res) => {
        toast.success("Customers fetched successfully");
        setCustomers(res.data.customers);
      })
      .catch((err) => {
        toast.error("Failed to fetch customers");
        console.log(err);
      });
  }, [isRerenderDashboard, sorting]);

  return (
    <div className="flex bg-gray-100">
      {/* Aside Bar Component */}
      <AsideBar />

      {/* Right Main Content */}
      <div className="w-[100%]">
        <Menu />
        <div className="h-[87%] py-7 flex flex-col gap-7">
          <div className="px-10">
            <Button handler={() => setIsAddCustomers(true)} width={"w-72"}>
              <div className="flex gap-5 px-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <span>Add New Customer</span>
              </div>
            </Button>
          </div>

          <HeaderBar sorting={sorting} setSorting={setSorting} />

          <div className="flex flex-col h-[700px] sm:h-[430px] gap-5 px-10 overflow-auto">
            {customers?.map((customer) => {
              return (
                <Card
                  key={customer._id}
                  customer={customer}
                  isRerenderDashboard={isRerenderDashboard}
                  setIsRerenderDashboard={setIsRerenderDashboard}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Model for Add a customer */}
      <ModelLayout
        isOpen={isAddCustomers}
        onClose={() => setIsAddCustomers(false)}
        title={"Add New Customer"}
      >
        <CustomerForm
          modelClose={() => setIsAddCustomers(false)}
          isRerenderDashboard={isRerenderDashboard}
          setIsRerenderDashboard={setIsRerenderDashboard}
        />
      </ModelLayout>
    </div>
  );
};

export default Home;
