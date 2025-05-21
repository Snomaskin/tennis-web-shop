import { useState } from "react";
import { useForm } from "react-hook-form";
import { InputWithError } from "../utilComponents/InputWithError/InputWithError";
import { listUsers, findUser, findUsers } from "./adminUtils/manageUsers";
import { listProducts, findProduct, addProduct, deleteProduct } from "./adminUtils/manageProducts";
import "./AdminPanel.css"


type AdminPanelOptions = "users" | "products";

export const AdminPanel = () => {
  const [panelView, setPanelView] = useState<AdminPanelOptions | null>(null);

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
    </div>
  );
};

const UsersPanel = () => {
  const fetchOptions = [
    {label: "List Users", key: "listUsers"},
    {label: "Find User", key: "findUser"},
    {label: "Find Users", key: "findUsers"}
  ] as const;
  type FetchOptionKey = typeof fetchOptions[number]["key"];
  type FormData = Partial<Record<FetchOptionKey, string>>;

  const { register, handleSubmit } = useForm<FormData>();
  const [selectedOption, setSelectedOption] = useState<FetchOptionKey | null>(null);
  const [fetchedData, setFetchedData] = useState<any | null>(null);

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value as FetchOptionKey);
  };
  const onSubmit = async (data: FormData) => {
    setFetchedData(null);
    if (selectedOption === "listUsers") {
      const allUsers = await listUsers();
      setFetchedData(allUsers);
    };
    if (selectedOption === "findUser" && data.findUser) {
      const user = await findUser(data.findUser);
      setFetchedData(user);
    };
    if (selectedOption === "findUsers" && data.findUsers) {
      const users = await findUsers(data.findUsers);
      setFetchedData(users);
    };
  };

  return (
    <div className="admin-selected-panel">
      <form className="admin-fetch-container" onSubmit={handleSubmit(onSubmit)}>
        <h2>Select what you want to do:</h2>
        <select onChange={(e) => handleOptionChange(e)}>
          {fetchOptions.map(item => (
            <option key={item.key} value={item.key}>
              {item.label}
            </option>
          ))}
        </select>
        {(selectedOption === "findUser" || selectedOption === "findUsers") 
          && <InputWithError register={register(selectedOption)} label="Find: " />}
      </form>
    </div>
  );
};

const ProductsPanel = () => {
  const fetchOptions = [
    {label: "List Product Category", key: "listProductCategory"},
    {label: "List All Products", key: "listAllProducts"},
    {label: "Find Product", key: "findProduct"},
    {label: "Add Product", key: "addProduct"},
    {label: "Delete Product", key: "deleteProduct"},
  ];
  type FetchOptionKey = typeof fetchOptions[number]["key"];
  type FormData = Partial<Record<FetchOptionKey, string>>;
  const { register, handleSubmit } = useForm<FormData>();
  const [selectedOption, setSelectedOption] = useState<FetchOptionKey | null>(null);
  const [fetchedData, setFetchedData] = useState<any | null>();

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const onSubmit = async (data: FormData) => {
    if (selectedOption === "listProductCategory" && data.listProductCategory) {
      const products = await listProducts(data.listProductCategory);
      setFetchedData(products);
    };
    if (selectedOption === "findProduct" && data.findProduct) {
      const product = await findProduct(data.findProduct);
      setFetchedData(product);
    };
  };

  return (
    <div className="admin-selected-panel">
      <form className="admin-fetch-container" onSubmit={handleSubmit(onSubmit)}>
        <h2>Select what you want to do: </h2>
        <select onChange={(e) => handleOptionChange(e)}>
          {fetchOptions.map(item => (
            <option key={item.key} value={item.key}>
              {item.label}
            </option>
          ))}
        </select>
        {(selectedOption === "listProductCategory" || selectedOption === "findProduct") 
          && <InputWithError register={register(selectedOption)} label="Find: " />
        }
      </form>
    </div>
  );
};