"use client"
import { useState,useEffect } from 'react';
import { useRegisAuctionMutation, ItemCategory, AuctionStatus, useRegisBidMutation } from '../../generated/graphql';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import dateFormat, { masks } from "dateformat";
import {useGetMaxAndAddMaxMutation} from '../../generated/graphql'
import { getDaysLeft } from '../buyer/page';
interface EnterBidProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    userId: string;
    auctionId: string;
}
const EnterBid: React.FC<EnterBidProps> = ({ setShowModal, userId, auctionDetail }) => {
  const [ newPrice,setNewPrice] = useState(auctionDetail.startPrice)
  const [getisItmax] = useGetMaxAndAddMaxMutation()
  const [isItmax, setIsitmax] = useState(false)
  const newPriceBid = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPrice(Number(event.target.value));
};
 const [ enterNewBid ] = useRegisBidMutation()

useEffect(() => {
  const fetchData = async () => {
      try {
          const {data} = await getisItmax({
              variables: { userId, auctionId: auctionDetail.id },
          });
          console.log('pp',data?.getMaxAndAddMax.sellerId,userId)
          data?.getMaxAndAddMax.sellerId == userId ? setIsitmax(true) : setIsitmax(false)
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };

  fetchData();
}, [auctionDetail]);



const createNewBid = async () => {
  setShowModal(false)
  try {
    const { data } = await enterNewBid({
      variables: { 
        userId: localStorage.getItem('userId') || '',
        auctionId: auctionDetail.id,
        price: newPrice,
        isMax: isItmax
      },
    });
    console.log('Auction created:', data);
  } catch (error) {
    console.error('Error creating auction:', error);
  }
}; 
  return (
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
                    Auction
                  </h3>
                  
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto"></div>
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">{auctionDetail.title}</div>
    <p className="text-gray-700 text-base">
      {auctionDetail.description}
    </p>
  </div>
  <div className="px-6 pt-4 pb-2">
    <span className="inline-block  px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"><p>{getDaysLeft(new Date(auctionDetail.terminateAt))} days left</p></span>
    <span className="inline-block  px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"><p>Price {auctionDetail.startPrice} Euro</p></span>
  </div>
 
  <form className="w-full max-w-sm">
  <div className="md:flex md:items-center mb-6">
    <div className="md:w-1/3">
      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
        Your offer
      </label>
    </div>
    <div className="md:w-2/3">
      {/* <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight " 
      name='newPriceBid'
      value={auctionDetail.startPrice}
      onChange={ newPriceBid}
      /> */}
      <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              name="newPriceBid"
              placeholder={auctionDetail.startPrice}
      onChange={ newPriceBid}
              type="number"
            />
    </div>
  </div>
  </form>

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
                    onClick={() => createNewBid()}
                  >
                    Create Auctions
                  </button>
                 
                </div>
</div>
</div>
</div>
</div>
    </>
      
  );
}
    
export default EnterBid