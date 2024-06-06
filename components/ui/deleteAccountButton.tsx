"use client"
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { deleteUser } from "@/lib/actions/user.actions"; 
import { SignedIn,SignOutButton } from "@clerk/nextjs";

interface DeleteAccountButtonProps {
    authUserId: string;
}

const DeleteAccountButton: React.FC<DeleteAccountButtonProps> = ({ authUserId }) => {
    const router = useRouter();

    const handleDeleteAccount = async () => {
        const confirmation = confirm("Are you sure you want to delete your account?");
        if (!confirmation) return;

        try {
            await deleteUser(authUserId); 
            router.push("/sign-in");  
        } catch (err:any) {
            throw new Error(err.message);
        }
        
    };
    

    return (
        <SignedIn>
            <SignOutButton>
            <Button onClick={handleDeleteAccount}>
                Delete Account
            </Button>
            </SignOutButton>
        </SignedIn>
    );
};

export default DeleteAccountButton;