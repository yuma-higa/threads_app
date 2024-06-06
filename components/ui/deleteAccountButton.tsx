"use client"
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { deleteUser } from "@/lib/actions/user.actions"; 

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
            router.push("/onboarding");
        } catch (err:any) {
            throw new Error(err.message);
        }
    };

    return (
        <Button onClick={handleDeleteAccount}>
            Delete Account
        </Button>
    );
};

export default DeleteAccountButton;