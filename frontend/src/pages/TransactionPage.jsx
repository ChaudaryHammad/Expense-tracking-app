import { useState } from "react";
import InputField from "../components/InputField";

const TransactionPage = () => {
  const [formData, setFormData] = useState({
    description: "",
    paymentType: "",
    category: "",
    amount: "",
    location: "",
    date: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData", formData);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  console.log(formData);

  // if (loading) return <TransactionFormSkeleton />;

  return (
    <div className="h-screen max-w-4xl mx-auto flex flex-col items-center ">
      <p className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text">
        Update this transaction
      </p>
      <form
        className="w-full max-w-lg flex flex-col gap-5 px-3 z-10"
        onSubmit={handleSubmit}
      >
        {/* TRANSACTION */}
        {/* <label htmlFor={''} className='block text-sm font-medium text-white'>TRANSACTION</label> */}
        <InputField
          placeholder={"Rent, Groceries, Salary, etc."}
          label={"TRANSACTION"}
          inputtype={"transaction"}
          type="text"
          name={"description"}
          value={formData.description}
          onChange={handleInputChange}
        />
        <div className="flex flex-wrap gap-3  ">
          <div className="w-[100%] flex-1  mb-6 md:mb-0 ">
            <label
              htmlFor="paymenType"
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
            >
              payement type
            </label>
            <div className="relative">
              <select
                className="block w-full  text-gray-700 border  py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'"
                name="paymentType"
                id="paymentType"
                onChange={handleInputChange}
                value={formData.paymentType}
                defaultValue={formData.paymentType}
              >
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
            </div>
          </div>

          <div className="w-full flex-1  mb-6 md:mb-0">
            <label
              htmlFor="paymenType"
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
            >
              CATEGORY
            </label>
            <div className="relative">
              <select
                className="block w-full  text-gray-700 border  py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                name="category"
                id="category"
                onChange={handleInputChange}
                value={formData.category}
                defaultValue={formData.category}
              >
                <option value="credit">Saving</option>
                <option value="debit">Investment</option>
                <option value="debit">Expense</option>
              </select>
            </div>
          </div>

          <div className="w-full flex-1 mb-6 md:mb-0">
            <label
              className="block uppercase text-white text-xs font-bold mb-2"
              htmlFor="amount"
            >
              Amount($)
            </label>
            <input
              className="h-[48px] block w-full bg-gray-200 text-gray-700   rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="amount"
              name="amount"
              type="number"
              placeholder="150"
              value={formData.amount}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="w-full flex-1 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="location"
            >
              Location
            </label>
            <input
              className="appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="location"
              name="location"
              type="text"
              placeholder="New York"
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>

          {/* DATE */}
          <div className="w-full flex-1">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="date"
            >
              Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              className="appearance-none block w-full  text-gray-700 border  rounded py-[11px] px-4 mb-3 leading-tight focus:outline-none
						 focus:bg-white"
              placeholder="Select date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          className="text-white font-bold w-full rounded px-4 py-2 bg-gradient-to-br
          from-pink-500 to-pink-500 hover:from-pink-600 hover:to-pink-600"
          type="submit"
        >
          Update Transaction
        </button>
      </form>
    </div>
  );
};
export default TransactionPage;
