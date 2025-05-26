import { useState } from "react";
import { useForm } from "react-hook-form";
import { InputWithError } from "../utilComponents/InputWithError/InputWithError";
import { listUsers, findUser, findUsers } from "./adminUtils/manageUsers";
import { listProducts, findProduct, addProduct, deleteProduct } from "./adminUtils/manageProducts";
import { Product } from "../../data/products";
import { StandardModal } from "../utilComponents/StandardModal/StandardModal";
import { UserProfile } from "../../auth/AuthContext";
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
  const [fetchedData, setFetchedData] = useState<UserProfile[]>([]);

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value as FetchOptionKey);
  };
  const onSubmit = async (data: FormData) => {
    let result: UserProfile[] = [];

    if (selectedOption === "listUsers") {
      result = await listUsers();
    };
    if (selectedOption === "findUser" && data.findUser) {
      result = await findUser(data.findUser);
    };
    if (selectedOption === "findUsers" && data.findUsers) {
      result = await findUsers(data.findUsers);
    };

    setFetchedData(result)
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
      <ul className="admin-list-items"> 
        {fetchedData.map(item => {
          const { userId, name, email } = item;

          return (
            <li className="admin-list-item" key={userId}>
              <div className="admin-list-item-details">
                {userId} <br/>
                {name} <br/>
                {email} <br/>
              </div>
            </li>
          )
        })}
      </ul>

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
  const [fetchedData, setFetchedData] = useState<Product[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleItemSelect = (id: string, checked: boolean) => {
    setSelectedItems(prev => {
      if (checked) {
        return prev.includes(id) ? prev : [...prev, id];
      } else {
        return prev.filter(itemId => itemId !== id);
      }
    });
  };

  const handleProductsDelete = async () => {
    await Promise.allSettled(selectedItems.map(item => deleteProduct(item)));
    const updatedProductsList = await listProducts();
    setFetchedData(updatedProductsList);
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
      <ul className="admin-list-items">
        {fetchedData.map(item => {
          const { id, name, price, imageUrl } = item;
          return (
            <li className="admin-list-item" key={id}>
              <div className="admin-list-item-details">
                {id} <br/>
                {name} <br/>
                {price} <br/>
              </div>
              <img src={imageUrl} />
              <input type="checkbox" onChange={(e) => handleItemSelect(id, e.target.checked)} />
            </li>
          )}
        )}
      </ul>
      <div className="admin-panel-actions">
        <button>
          Add product
        </button>
        <button onClick={() => handleProductsDelete()}>
          Delete selected
        </button>
      </div>
    </div>
  );
};

const AddProduct = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Product>();
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const onSubmit = async (details: Product) => {
    const addProductResponse = await addProduct(details);
    setResponseMessage(addProductResponse);
  };

  <StandardModal>
    <form className="admin-submit-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Add new product</h2>
      <InputWithError
        label="Name"
        type="text"
        error={errors.name?.message}
        register={register("name")}
      />
      <InputWithError
        label="Price"
        type="text"
        error={errors.price?.message}
        register={register("price")}
      />
      <InputWithError
        label="ImageURL"
        type="text"
        error={errors.imageUrl?.message}
        register={register("imageUrl")}
      />
      <div className="admin-form-footer">
        <button type="submit">
          Submit
        </button>
      {responseMessage && (
        <div className="admin-action-response-msg">
          {responseMessage}
        </div>
      )}
      </div>
    </form>
  </StandardModal>
}