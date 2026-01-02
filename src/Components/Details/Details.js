import {
  AC,
  Bag,
  Grid,
  List,
  Location,
  Passengers,
  Service,
  Steric,
} from "../../Utils/Icons";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const Details = ({ allCarsData, LoadingCarsData }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-1 items-center">
      <div className=" w-full  flex flex-col gap-[2px] rounded min-h-[50vh]">
        {allCarsData?.length < 1 && (
          <div>
            <h1>No car available</h1>
          </div>
        )}

        {LoadingCarsData ? (
          <div className="flex w-full justify-center mt-12">
            <Loader size={40} />
          </div>
        ) : (
          allCarsData?.map((items) => {
            return (
              <div className="flex w-full  md:items-center flex-col md:flex-row h-auto md:h-[192px] mt-[2px] gap-4 py-4 px-4 bg-white rounded">
                <div className="w-full h-[200px] md:w-[280px] md:h-40 rounded">
                  <img
                    className=" relative w-full md:h-40 h-[200px] object-contain rounded z-10"
                    src={`http://localhost:5000/${items?.photos[0]}`}
                    alt="Car-Image"
                  />
                </div>
                <div className="md:h-auto min-h-[210px] w-full ">
                  <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center h-[50px] w-full md:mt-[27px] ">
                    <div className="flex w-full md:justify-start gap-3 justify-between">
                      <h1 className="font-inter font-semibold md:font-bold text-base md:text-xl leading-[22px] md:leading-6 text-secondary">
                        {items?.make?.name}&nbsp;
                        {/* {items?.model?.name}&nbsp; */}
                        {items?.variant?.name}
                      </h1>
                      <span className="flex items-center w-[81px] h-[23px] gap-[10px] rounded-[1px] bg-[#00796B1A]">
                        <p className="font-inter font-medium text-xs leading-[100%] pt-[2px] ml-1 text-primary">
                          Featured
                        </p>
                        <span>
                          <Steric />
                        </span>
                      </span>
                    </div>
                    <div className="flex shrink-0 mt-2 md:mt-0 md:flex-col w-full md:w-[99px] h-[50px]">
                      <h1 className="font-inter font-semibold md:font-bold text-lg md:text-2xl leading-6 md:leading-8 text-end text-secondary">
                        {`Rs ${items?.rentPerDay}`}
                      </h1>
                      <label className="font-inter ml-[4px] md:ml-0 mt-[6px] md:mt-0 font-medium text-xs leading-4 text-end text-[#6383A6]">
                        Per day
                      </label>
                    </div>
                  </div>
                  <div className="flex mt-4 h-4 gap-3 md:gap-6">
                    <div className="flex gap-[2px] w-[34px]">
                      <span>
                        <Passengers />
                      </span>
                      <p className="font-inter font-medium text-xs leading-4 text-primarygrey">
                        {items?.seats}
                      </p>
                    </div>
                    <div className="flex gap-[2px] min-w-[46px]  border-l-2 pl-3 border-primarygrey">
                      <span>
                        <Bag />
                      </span>
                      <p className="font-inter font-medium text-xs leading-4 text-primarygrey">
                        02
                      </p>
                    </div>
                    <div className="flex gap-[2px] min-w-[46px]  border-l-2 pl-3 border-primarygrey">
                      <span>
                        <Service />
                      </span>
                      <p className="font-inter font-medium text-xs leading-4 text-primarygrey">
                        {items?.transmission === "automatic"
                          ? "Auto"
                          : "Manual"}
                      </p>
                    </div>
                    <div className="flex gap-[2px] min-w-[46px]  border-l-2 pl-3 border-primarygrey">
                      <span>
                        <AC />
                      </span>
                      <p className="font-inter font-medium text-xs leading-4 text-primarygrey">
                        {items?.acheater ? "A/C" : "None"}
                      </p>
                    </div>
                  </div>
                  <div className="flex md:flex-row flex-col w-full justify-start md:justify-between h-10 mt-4">
                    <div className="flex md:flex-row flex-col-reverse items-start md:items-center">
                      <div className="flex gap-2  md:mt-0 mt-3">
                        <p className="font-inter font-semibold text-xs leading-5 text-primarygrey">
                          4.5
                        </p>
                        <p className="font-inter font-semibold text-xs leading-5 text-primarygrey">
                          Excellent <span> </span>
                          <span className="font-inter font-semibold text-xs leading-5 text-primary">
                            (12 reviews)
                          </span>
                        </p>
                      </div>
                      <div className="flex md:items-center gap-1 pl-0 md:pl-3 md:border-l-2 md:ml-8 md:border-primarygrey">
                        <span>
                          <Location />
                        </span>
                        <p className="font-inter font-normal text-xs leading-4 text-primarygrey">
                          {items?.business?.location?.address}
                        </p>
                      </div>
                    </div>
                    <div>
                      <Button
                        label="View Details"
                        onClick={() => {
                          navigate("/detail", { state: items });
                        }}
                        className="text-primary md:mt-0 mt-4 font-inter font-medium text-sm border rounded border-primary w-[126px] h-10 focus:ring-0 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Details;
