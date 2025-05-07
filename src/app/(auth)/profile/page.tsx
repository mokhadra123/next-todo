import { getUserProfile } from "@/api/auth/get-user-profile";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
    try {
        const userProfile = await getUserProfile();
        
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">User Profile</h1>
                <div className="bg-white shadow rounded-lg p-6">
                    <pre className="whitespace-pre-wrap">
                        {JSON.stringify(userProfile, null, 2)}
                    </pre>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Profile Error:', error);
        // Redirect to login if unauthorized
        if (error instanceof Error && error.message.includes('401')) {
            redirect('/login');
        }
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4 text-red-500">Error Loading Profile</h1>
                <p className="text-gray-600">{error instanceof Error ? error.message : 'An error occurred'}</p>
            </div>
        );
    }
}

export default ProfilePage;
