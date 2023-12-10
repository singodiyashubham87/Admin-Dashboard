import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [isChecked, setIsChecked] = useState(false);
  const [originalDataArray, setOriginalDataArray] = useState([]);
  const [dataArray, setDataArray] = useState([]);
  const [selectedEntries, setSelectedEntries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setOriginalDataArray(res.data);
      setDataArray(res.data);
    };
    fetchData();
  }, []); // empty dependency array to run once on mount

  // Update users data on search
  const updateData = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const newDataArray = originalDataArray.filter((ele) =>
      ele.name.toLowerCase().includes(searchQuery)
    );
    setDataArray(newDataArray);
  };

  // Handle select all entries radio button
  const handleSelectAllEntries = () => {
    const dataLength = dataArray.length;

    // Check if all entries are currently selected
    const allSelected = selectedEntries.length === dataLength;

    if (allSelected) {
      // If all are selected, clear the selection
      setSelectedEntries([]);
      setIsChecked(false);
    } else {
      // If not all are selected, select all entries
      const allSelectedIndices = Array.from(
        { length: dataLength },
        (_, index) => index
      );
      setSelectedEntries(allSelectedIndices);
      setIsChecked(true);
    }
  };

  // Handle selected entry of radio buttons
  const handleSelectedEntry = (index) => {
    if (selectedEntries.includes(index)) {
      setSelectedEntries((prevSelected) =>
        prevSelected.filter((selected) => selected !== index)
      );
    } else {
      setSelectedEntries((prevSelected) => [...prevSelected, index]);
    }
  };

  // If already radio buttons selected and then clicked on corresponding delete icon of those selected radio buttons then update the selected entries array accordingly
  const removeEntry = (index) => {
    setSelectedEntries((prevSelected) =>
      prevSelected.map((selected) =>
        selected > index ? selected - 1 : selected
      )
    );
  };

  // If already radio buttons selected and then clicked on corresponding delete icon then update the data array accordingly
  const handleDeleteEntry = (i) => {
    removeEntry(i);
    const newDataArray = dataArray.filter((_, index) => i !== index);
    setOriginalDataArray(newDataArray);
    setDataArray(newDataArray);
  };

  // Handle delete button click on multiple radio buttons selected
  const handleDeleteSelectedEntries = () => {
    const newDataArray = dataArray.filter(
      (_, index) => !selectedEntries.includes(index)
    );
    setOriginalDataArray(newDataArray);
    setDataArray(newDataArray);
    setSelectedEntries([]);
  };

  return (
    <>
      <div className="parentContainer min-h-[100vh] w-[100vw] bg-[#434242] p-[2rem] pt-[4rem] font-primary flex flex-col items-center gap-8">
        <div className="searchBarAndDelete flex justify-between items-center w-[90%] lg:w-[70%]  pl-[4rem] pr-[5.5rem] bg-[#191A19] py-[1rem] rounded-[0.625rem]">
          <input
            type="text"
            name=""
            placeholder="Search..."
            className="py-[0.3rem] pr-[2rem] pl-[0.5rem] border-2 border-gray-400 rounded-[0.3rem]"
            onChange={updateData}
          />
          <div className="deleteIcon bg-red-300 p-[0.5rem] rounded-[0.4rem] cursor-pointer hover:bg-red-200">
            <MdDeleteOutline onClick={handleDeleteSelectedEntries} />
          </div>
        </div>

        <div className="mainContent flex flex-col gap-4 w-[90%] lg:w-[70%] bg-[#191A19] py-[2rem] rounded-[0.625rem]">
          <div className="fields flex items-center text-[#B6BBC4] font-bold p-[0.2rem]">
            <input
              type="radio"
              className="w-[10%] h-[1rem] rounded-[0.2rem] cursor-pointer"
              onClick={handleSelectAllEntries}
              checked={isChecked}
            />
            <h1 className="w-[25%] text-[1.2rem] text-center">Name</h1>
            <h1 className="w-[35%] text-[1.2rem] text-center">Email</h1>
            <h1 className="w-[15%] text-[1.2rem] text-center">Role</h1>
            <h1 className="w-[15%] text-[1.2rem] text-center">Actions</h1>
          </div>

          <div className="fieldData flex flex-col gap-2 overflow-hidden ease-in duration-300">
            {dataArray.map((ele, index) => {
              return (
                <>
                  <div
                    key={index}
                    className="field w-[100%] flex items-center text-gray-400 p-[0.3rem] border-[#B6BBC4] border-y-[1px] hover:scale-[1.01] ease-in duration-150"
                  >
                    <div className="w-[10%] text-center flex justify-center items-center">
                      <input
                        type="radio"
                        className="h-[1rem] rounded-[0.2rem] cursor-pointer"
                        onChange={() => handleSelectedEntry(index)}
                        checked={selectedEntries.includes(index)}
                        key={index}
                      />
                    </div>
                    <h1 className="w-[25%]  text-center">{ele.name}</h1>
                    <h1 className="w-[35%]  text-center">{ele.email}</h1>
                    <h1 className="w-[15%]  text-center">{ele.role}</h1>
                    <div className="w-[15%] flex justify-center">
                      <div className="text-black bg-red-300 p-[0.3rem] rounded-[0.3rem] cursor-pointer hover:bg-red-200">
                        <MdDeleteOutline
                          onClick={() => handleDeleteEntry(index)}
                        />
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
