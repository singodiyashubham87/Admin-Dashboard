import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [originalDataArray, setOriginalDataArray] = useState([]);
  const [dataArray, setDataArray] = useState([]);

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

  const updateData = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const newDataArray = originalDataArray.filter((ele) =>
      ele.name.toLowerCase().includes(searchQuery)
    );
    setDataArray(newDataArray);
  }

  return (
    <>
      <div className="parentContainer min-h-[100vh] w-[100vw] bg-[#434242] p-[2rem] pt-[4rem] font-primary flex flex-col items-center gap-8">
        <div className="searchBarAndDelete flex justify-between items-center w-[90%] lg:w-[70%]  pl-[4rem] pr-[5.5rem]">
          <input
            type="text"
            name=""
            placeholder="Search..."
            className="py-[0.3rem] pr-[2rem] pl-[0.5rem] border-2 border-gray-400 rounded-[0.3rem]"
            onChange={updateData}
          />
          <div className="deleteIcon bg-red-300 p-[0.5rem] rounded-[0.4rem] cursor-pointer hover:bg-red-200">
            <MdDeleteOutline />
          </div>
        </div>

        <div className="mainContent flex flex-col gap-4 w-[90%] lg:w-[70%] ">
          <div className="fields flex items-center text-gray-400 font-bold p-[0.2rem]">
            <input
              type="radio"
              className="w-[10%] h-[1rem] rounded-[0.2rem] "
              disabled
            />
            <h1 className="w-[25%] text-[1.2rem] text-center">Name</h1>
            <h1 className="w-[35%] text-[1.2rem] text-center">Email</h1>
            <h1 className="w-[15%] text-[1.2rem] text-center">Role</h1>
            <h1 className="w-[15%] text-[1.2rem] text-center">Actions</h1>
          </div>

          <div className="fieldData flex flex-col gap-2">
            {dataArray.map((ele, index) => {
              return (
                <>
                  <div key={index} className="field w-[100%] flex items-center text-gray-400 p-[0.3rem]">
                    <div className="w-[10%] text-center">
                    <input
                      type="radio"
                      className="h-[1rem] rounded-[0.2rem] cursor-pointer"
                    />
                    </div>
                    <h1 className="w-[25%]  text-center">{ele.name}</h1>
                    <h1 className="w-[35%]  text-center">{ele.email}</h1>
                    <h1 className="w-[15%]  text-center">{(ele.role)}</h1>
                    <div className="w-[15%] flex justify-center">
                      <div className="text-black bg-red-300 p-[0.3rem] rounded-[0.3rem] cursor-pointer hover:bg-red-200">
                        <MdDeleteOutline />
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
