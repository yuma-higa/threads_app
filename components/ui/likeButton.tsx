"use client"
import { fetchThreadById, toggleLikeOnThread } from "@/lib/actions/thread.actions";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const LikeButton = ( { threadId, userId}:any) => {
    const [isLiked,setIsLiked] = useState(false);
    const isMounted = React.useRef(true);

    useEffect(() => {
        isMounted.current= true;
        const checkIfLiked = async () => {
            const thread = await fetchThreadById(threadId);
            if (isMounted.current) {
                setIsLiked(thread.likes.includes(userId));
            }
        };
        checkIfLiked();
        return () => {
            isMounted.current = false;
        };
    },[threadId, userId]);

    const handleLike = async () => {
        try {
            await toggleLikeOnThread(threadId, userId);
            setIsLiked(prevIsLiked => !prevIsLiked);
        } catch (err:any) {
            throw new Error(err.message);
        }
    };
    return(
        <button onClick = {handleLike}>
            {isLiked? 
            <Image
            src ="/assets/heart-filled.svg"
            alt = "likedHeart"
            width = {24}
            height = {24}
            className = "cursor-pointer object-contain"
            />
            :
            <Image
            src="/assets/heart-grey.svg"
            alt = "heart"
            width = {24}
            height = {24}
            className = "cursor-pointer object-contain"
            />}
        </button>
    );
};

export default LikeButton;