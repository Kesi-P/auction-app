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
    // terminateAt: new Date(),
    status : AuctionStatus.OnGoing
  });
  const [date,setDate] = useState(new Date())
  const [regisAuction] = useRegisAuctionMutation();

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData)
  };

  const createAuction = async () => {
    console.log(date)
    try {
      const { data } = await regisAuction({
        variables: { ...formData ,terminateAt:date},
      });
      console.log('Auction created:', data);
    } catch (error) {
      console.error('Error creating auction:', error);
    }
  };

  return (
    <>
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
                setDate(dateFormat(value,"yyyy-mm-dd HH:MM:ss"))
              }
              value={date}
              
              
            />
          </div>
        </div>
      </form>
      <div>
        <a
          href="#"
          className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          onClick={createAuction}
        >
          Create Auction
        </a>
      </div>
    </>
  );
}
