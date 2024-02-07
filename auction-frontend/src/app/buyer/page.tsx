"use client"
import { useEffect, useState } from 'react';
import { useGetAllAuctionsQuery } from '../../generated/graphql';
import EnterBid from '../components/entertheBid';

export const getDaysLeft = (targetDate: Date): number => {
    const currentDate: Date = new Date();
    const differenceMs: number = targetDate.getTime() - currentDate.getTime();
    const daysLeft: number = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
    return daysLeft;
};
export default function Home() {
    const { data } = useGetAllAuctionsQuery();
    const [auctions, setAuctions] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [auction, setAuction] = useState<any[]>([]);

    useEffect(() => {
        if (data && data.getAllAuctions && data.getAllAuctions.auction) {
            setAuctions(data.getAllAuctions.auction);
            console.log('Auction data:', data.getAllAuctions.auction);
        }
    }, [data]);

    // const getDaysLeft = (targetDate: Date): number => {
    //     const currentDate: Date = new Date();
    //     const differenceMs: number = targetDate.getTime() - currentDate.getTime();
    //     const daysLeft: number = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
    //     return daysLeft;
    // };
    const onClickPopup = (auction: any) => {
        setShowModal(true);
        setAuction(auction);
    };

    return (
        <>
            {auctions.length > 0 && (
                <div>
                    {auctions.map(auction => (
                        <div className="bg-white p-6 rounded-lg shadow-lg flex" key={auction.id} onClick={() => onClickPopup(auction)}>
                            <div className="flex-initial text-left px-4 py-2 m-2">
                                <h1>{auction.title}</h1>
                                <p>{auction.description}</p>
                            </div>
                            <div className="flex-initial text-center px-4 py-2 m-2">
                                <p>{getDaysLeft(new Date(auction.terminateAt))} days left</p>
                            </div>
                            <div className="flex-initial text-center px-4 py-2 m-2">
                                {auction.startPrice}
                            </div>
                            
                        </div>
                    ))}
                </div>
            )}
            {showModal && <EnterBid setShowModal={setShowModal} userId={localStorage.getItem('userId') || ''} auctionDetail={auction} />}
            
        </>
    );
}
