import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { MigrationHelper } from "../utilComponents/MigrationHelper";
import { UsersPanel } from "./UsersPanel/UsersPanel";
import { ProductsPanel } from "./ProductsPanel/ProductsPanel";
import "./AdminPanel.css";


type AdminPanelOptions = "users" | "products";

export const AdminPanel = () => {
  const [panelView, setPanelView] = useState<AdminPanelOptions | null>(null);
  const { isAdmin } = useAuth();

  return (
    <div className="admin-panel">
      <div className="admin-panel-selection">
        <button onClick={() => setPanelView("users")}>Users</button>
        <button onClick={() => setPanelView("products")}>Products</button>
      </div>
      <div className="admin-panel-contents">
        {panelView === "users" && <UsersPanel />}
        {panelView === "products" && <ProductsPanel />}
      </div>
      {isAdmin && <MigrationHelper />}
    </div>
  );
};