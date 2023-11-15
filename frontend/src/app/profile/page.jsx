import Layout from "@/components/Layout";
const Page = () => {
    return <>
    <Layout>
        <div className="profile-container">
           <div className="profile-account-section">
                <h2>@Username</h2>
                <span>Email@gmail.con</span>
           </div>
            <div className="profle-preferenecies-section">
                <span>Preferences</span>
                <div>
                </div>
            </div>
            <div className="profile-record-section">
                <ul>
                    <li>Favorites</li>
                    <li>Orders</li>
                </ul>

                <div>
                    
                </div>
            </div>
        </div>
    
    </Layout>
    </>;
}

export default Page