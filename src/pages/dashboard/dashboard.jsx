function Dashboard() {
    return (
        <>
            <h2 className="mb-4">
                Dashboard
            </h2>

            <div className="row">

                <div className="col-md-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <h5>Total Colleges</h5>
                            <h2>25</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <h5>Total Courses</h5>
                            <h2>48</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <h5>Total Enquiries</h5>
                            <h2>136</h2>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Dashboard;