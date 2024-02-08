"use client"
import { useEffect, useState } from 'react';
import { useGetAllAuctionsQuery } from '../../generated/graphql';
import EnterBid from '../components/entertheBid';

// Calculate the days left until the target date
export const getDaysLeft = (targetDate: Date): number => {
    const currentDate: Date = new Date();
    const differenceMs: number = targetDate.getTime() - currentDate.getTime();
    const daysLeft: number = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
    return daysLeft;
};


export default function Home() {
    // Fetch data using the useGetAllAuctionsQuery hook
    const { data } = useGetAllAuctionsQuery();

    // State variables to manage auctions and modal visibility
    const [auctions, setAuctions] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [auction, setAuction] = useState<any[]>([]);

    // Use useEffect to update auctions when data changes
    useEffect(() => {
        if (data && data.getAllAuctions && data.getAllAuctions.auction) {
            setAuctions(data.getAllAuctions.auction);
            console.log('Auction data:', data.getAllAuctions.auction);
        }
    }, [data]);

    // Handle click on auction to display modal
    const onClickPopup = (auction: any) => {
        setShowModal(true);
        setAuction(auction);
    };

    // Render the Home component
    return (
        <>
            {/* Display auctions if available */}
            {auctions.length > 0 && (
                <div>
                    {auctions.map(auction => (
                        <div className="bg-white p-6 rounded-lg shadow-lg grid grid-cols-4 gap-2 flex mb-2" key={auction.id} onClick={() => onClickPopup(auction)}>
                            <div className="flex-initial text-left px-4 py-2 m-2 col-span-2">
                                <h1><b>{auction.title}</b></h1>
                                <p>{auction.description}</p>
                            </div>
                            <div className="flex-initial text-center px-4 py-2 m-2 col-span-1">
                                {/* Display days left until auction ends */}
                                <p>{getDaysLeft(new Date(auction.terminateAt))} days left</p>
                            </div>
                            <div className="flex-initial text-center px-4 py-2 m-2 col-span-1">
                                {/* Display auction start price */}
                                {auction.startPrice}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {/* Render EnterBid component when showModal is true */}
            {showModal && <EnterBid setShowModal={setShowModal}  auctionDetail={auction} />}
        </>
    );
}

