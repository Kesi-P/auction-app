"use client"
import { useState } from 'react';
import { useRegisAuctionMutation, ItemCategory, AuctionStatus } from '../../generated/graphql';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import dateFormat, { masks } from "dateformat";


export default function Home() {
  const [formData, setFormData] = useState({
    userId: localStorage.getItem('userId') || '',
    title: '',
    description: '',
    category: ItemCategory.Vehicle,
    startPrice: 0,
    status : AuctionStatus.OnGoing
  });
  const [date, setDate] = useState<Date>(new Date());
  const [showModal, setShowModal] = useState(false);
  const [regisAuction] = useRegisAuctionMutation();

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    // If the input is for startPrice, parse the value to a number
    const parsedValue = name === 'startPrice' ? parseFloat(value) : value;

    setFormData({ ...formData, [name]: value ,[name]: parsedValue,});
    
  };

  const createAuction = async () => {
    console.log(new Date(date))
    console.log(formData)
    try {
      setShowModal(false)
      const { data } = await regisAuction({
        variables: { ...formData ,terminateAt:new Date(date)},
      });
      console.log('Auction created:', data);
    } catch (error) {
      console.error('Error creating auction:', error);
    }
  };

  return (
    <>
      
      

      <div className="w-auto h-auto ml-corner t" >
      <h3 className="text-xl font-semi">
                    My Auction
                  </h3>
      </div>
      
      <div className="w-auto h-auto ml-corner b" onClick={() => setShowModal(true)}>
        <div className="flex-1 h-full">
          <div className="flex-1 h-full p-2 border border-gray-400 rounded-full">
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                
              </svg>
            </div>
          </div>
        </div>
      </div>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Modal Title
                  </h3>
                  
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <form className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Title
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              name="title"
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Category
            </label>
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              {Object.keys(ItemCategory).map((key) => (
                <option
                  key={key}
                  value={ItemCategory[key as keyof typeof ItemCategory]}
                >
                  {ItemCategory[key as keyof typeof ItemCategory]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Description
            </label>
            <textarea
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Initial Price
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="startPrice"
              type="number"
              placeholder="€"
              value={formData.startPrice}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Terminate At
            </label>
            <DatePicker
              name="terminateAt"
              onChange={(value) =>
                setDate(value)
              }
              value={date}
              
              
            />
          </div>
        </div>
      </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => createAuction()}
                  >
                    Create Auctions
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
    
 