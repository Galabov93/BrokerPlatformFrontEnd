import React from "react";
import ProtectedRoute from "../../utils/ProtectedRoute/index";
import Header from "../../components/Header";
import RealEstates from "../../pages/RealEstates";

export default function UserRoutes() {
  return (
    <div>
      <ProtectedRoute component={() => <Header />} />
      <ProtectedRoute exact path="/" component={() => <div>Dashboard</div>} />
      <ProtectedRoute
        exact
        path="/real-estates"
        component={() => <RealEstates />}
      />
      <ProtectedRoute
        exact
        path="/profile"
        component={() => <div>My profile</div>}
      />
    </div>
  );
}
