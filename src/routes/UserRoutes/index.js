import React from "react";
import ProtectedRoute from "../../utils/ProtectedRoute/index";
import Header from "../../components/Header";
import RealEstates from "../../pages/RealEstates";
import PropertyPage from "../../pages/PropertyPage";
import AddNewProperty from "../../pages/AddNewProperty";

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
        path="/property-page/:id"
        component={() => <PropertyPage />}
      />
      <ProtectedRoute
        exact
        path="/profile"
        component={() => <div>My profile</div>}
      />
      <ProtectedRoute
        exact
        path="/property/add/:id"
        component={() => <AddNewProperty />}
      />
      <ProtectedRoute
        exact
        path="/property/edit/:id"
        component={() => <div>Edit a property</div>}
      />
    </div>
  );
}
