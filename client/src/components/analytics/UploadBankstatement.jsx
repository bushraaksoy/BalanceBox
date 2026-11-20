import React, { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { FaFilePdf } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import BankstatementTransactionsDrawer from '../drawers/BankstatementTransactionsDrawer';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { uploadBankstatement } from '../../services/documentService';
import { useAuthContext } from '../../context/AuthContext';
import { toast } from 'sonner';
import { getCards } from '../../services/cardService';

const UploadBankstatement = () => {
    const { userId } = useAuthContext();
    const [file, setFile] = useState('');
    const [formData, setFormData] = useState(null);
    const [transactions, setTransactions] = useState(null);
    const [selectedCard, setCard] = useState('');
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);

    const { data: cards, isCardsLoading } = useQuery({
        queryKey: ['cards'],
        queryFn: () => getCards(userId),
    });

    const { mutate, isLoading } = useMutation({
        mutationFn: (formData) => uploadBankstatement(userId, formData),
        onSuccess: (data) => {
            console.log('File scanned successfully:', data);
            setTransactions(data);
        },
        onError: (error) => {
            console.error('Error uploading file:', error);
            toast.error('Could not upload file');
        },
    });

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        console.log(selectedFile);
        setFile(selectedFile);
        const newFormData = new FormData();
        newFormData.append('bankstatement', selectedFile);
        setFormData(newFormData);
    };

    const handleCardChnage = (e) => {
        // setCard?
        // setFormData.bank
    };

    const handleScanTransactions = (e) => {
        e.preventDefault();
        mutate(formData);
        setIsOpen(true);
    };

    return (
        <>
            {file ? (
                <div className="my-3 w-full flex flex-col">
                    <div className="p-3 px-5 rounded-2xl bg-gray-100 w-full flex gap-2 items-center justify-center border-gray-600 ">
                        <FaFilePdf size={24} className="text-red-600" />
                        <div>{file?.name}</div>
                        <IoClose
                            size={20}
                            className="ml-auto text-red-400"
                            onClick={() => setFile(null)}
                        />
                    </div>
                    <div className=" cards w-full p-3 border border-gray-400 rounded-2xl flex bg-white gap-2">
                        {cards?.map((card) => (
                            <div key={card.id}>
                                <input
                                    required
                                    value={card.id}
                                    name="cardId"
                                    onChange={(e) => {
                                        setCard(card);
                                    }}
                                    type="radio"
                                    className=""
                                />
                                <label htmlFor={card.id}> {card.title} </label>
                            </div>
                        ))}
                    </div>
                    <BankstatementTransactionsDrawer
                        transactions={transactions}
                        card={selectedCard}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        isLoading={isLoading}
                        trigger={
                            <div
                                onClick={handleScanTransactions}
                                className="p-2 my-2 rounded-xl bg-yellow-400 w-full "
                            >
                                Scan Transactions
                            </div>
                        }
                    />
                </div>
            ) : (
                <div className="p-3 my-3 relative bg-gray-100 rounded-xl border border-dashed w-full flex items-center justify-center gap-2 border-stone-700 text-stone-700">
                    <AiOutlineCloudUpload size={20} />
                    Upload Bankstatement
                    <input
                        id="fileInput"
                        type="file"
                        className="opacity-0 w-full h-full absolute"
                        onChange={handleFileChange}
                    />
                </div>
            )}
        </>
    );
};

export default UploadBankstatement;
