import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import useAuth from "../../../Hooks/useAuth";


const FileOverviewPage: React.FC = () => {
    const { isLoggedIn } = useSelector((state: any) => state.auth);

    if (!isLoggedIn) {
        return <Navigate to="/files/upload" />;
    }

    return (
        <div className="file-overview-page">
            <h1>Overview Page</h1>
        </div>
    )
}

export default FileOverviewPage;