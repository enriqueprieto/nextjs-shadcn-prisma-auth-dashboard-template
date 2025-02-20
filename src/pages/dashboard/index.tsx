import DashboardLayout from "@/layouts/dashboard";

const Page = () => {
    return (
        <DashboardLayout>
            <div>
                <h2 className="text-4xl font-medium mb-2">Welcome to dashboard page!</h2>
                <p className="text-xl font-light mb-2">Your fancy dashboard to helping you building your own `Nexjs` application.</p>
            </div>
        </DashboardLayout>
    );
};


export default Page;