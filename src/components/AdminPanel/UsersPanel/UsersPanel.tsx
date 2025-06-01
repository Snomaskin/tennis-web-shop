import { useForm } from "react-hook-form";
import { useState } from "react";
import { InputWithError } from "../../utilComponents/InputWithError/InputWithError";
import { listUsers, findUser, findUsers } from "../adminUtils/manageUsers";
import { UserProfile } from "../../../auth/AuthContext";


export const UsersPanel = () => {
  const fetchOptions = [
    {label: "List Users", key: "listUsers"},
    {label: "Find User", key: "findUser"},
    {label: "Find Users", key: "findUsers"}
  ] as const;
  type FetchOptionKey = typeof fetchOptions[number]["key"];
  type FormData = Partial<Record<FetchOptionKey, string>>;

  const { register, handleSubmit } = useForm<FormData>();
  const [selectedOption, setSelectedOption] = useState<FetchOptionKey>("listUsers");
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
    setFetchedData(result);
  };

  return (
    <div className="admin-selected-panel">
      <form className="admin-fetch-form" onSubmit={handleSubmit(onSubmit)}>
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
        <button type="submit">Submit</button>
      </form>
      <ul className="admin-fetched-list"> 
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