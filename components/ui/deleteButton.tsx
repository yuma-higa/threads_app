"use client"
import { deleteThread } from "@/lib/actions/thread.actions";
import { Button } from "../ui/button";

const DeleteButton = ({ id }:any) => {
    const handleDelete = async () => {
        try {
            await deleteThread(id, `/thread/${id}`);
        }catch(error:any){
            throw new Error(`Failed to delete thread: ${error.message}`);
        }
    }

    return(
    
        <Button className = "user-cart_btn" onClick={handleDelete}>
        Delete
        </Button>
    )
}

export default DeleteButton