import { useForm } from "react-hook-form";
import { useState } from "react";
import { InputWithError } from "../../utilComponents/InputWithError/InputWithError";
import { listProducts, findProduct, addProduct, deleteProduct } from "../adminUtils/manageProducts";
import { Product } from "../../../data/products";
import { StandardModal } from "../../utilComponents/StandardModal/StandardModal";
import "./ProductsPanel.css"


export const ProductsPanel = () => {
  const fetchOptions = [
    {label: "List All Products", key: "listAllProducts"},
    {label: "List Product Category", key: "listProductCategory"},
    {label: "Find Product", key: "findProduct"},
  ];
  type FetchOptionKey = typeof fetchOptions[number]["key"];
  type FormData = Partial<Record<FetchOptionKey, string>>;
  const { register, handleSubmit } = useForm<FormData>();
  const [selectedOption, setSelectedOption] = useState<FetchOptionKey | null>(null);
  const [fetchedData, setFetchedData] = useState<Product[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
    let result: Product[] = [];
    if (selectedOption === "listAllProducts") {
      result = await listProducts();
    };
    if (selectedOption === "listProductCategory" && data.listProductCategory) {
      result = await listProducts(data.listProductCategory);
    };
    if (selectedOption === "findProduct" && data.findProduct) {
      result = await findProduct(data.findProduct);
    };

    setFetchedData(result);
  };

  return (
    <div className="admin-selected-panel">
      <form className="admin-fetch-form" onSubmit={handleSubmit(onSubmit)}>
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
        <button type="submit">Submit</button>
      </form>
      <div className="admin-data-container">
        <ul className="admin-fetched-list">
          {fetchedData.map(item => {
            const { id, name, price, imageUrl } = item;
            return (
              <li className="admin-list-item" key={id}>
                <img src={imageUrl} />
                <div className="admin-list-item-details">
                  Firebase ID: {id} <br/>
                  {name} <br/>
                  ${price} <br/>
                </div>
                <input type="checkbox" onChange={(e) => handleItemSelect(id, e.target.checked)} />
              </li>
            )}
          )}
        </ul>
        <div className="admin-panel-action-btns">
          <button onClick={() => setModalIsOpen(true)}>
            Add product
          </button>
          <button onClick={() => handleProductsDelete()}>
            Delete selected
          </button>
        </div>
      </div>

      {modalIsOpen && <AddProduct onClose={() => setModalIsOpen(false)} />}
    </div>
  );
};

const AddProduct = ({ onClose }: { onClose: () => void }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Product>();
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const onSubmit = async (details: Product) => {
    const addProductResponse = await addProduct(details);
    setResponseMessage(addProductResponse);
  };
  return (
    <StandardModal onClose={onClose}>
      <form className="product-submit-form" onSubmit={handleSubmit(onSubmit)}>
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
        <div className="product-form-footer">
          <button type="submit">
            Submit
          </button>
        {responseMessage && (
          <div className="product-action-response-msg">
            {responseMessage}
          </div>
        )}
        </div>
      </form>
    </StandardModal>
  );
}