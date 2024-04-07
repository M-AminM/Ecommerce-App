import React, { type FC } from "react";
import { useFetch } from "./service/service";

const App: FC = () => {
  const { data, isPending } = useFetch("products");
  console.log(data);
  const url =
    "https://parkofideas.com/tastydaily/demo/wp-content/uploads/2023/09/tastydaily-2656323924-231x173.jpg";

  return (
    <div className="text-red-500 flex justify-center items-center">
      {isPending ? (
        <div>Loading...</div>
      ) : (
        <div>
          {data?.data.map((item: any) => (
            <div className="flex flex-col items-center">
              <h3>{item.name}</h3>
              {/* <img src={require(item.image_url)} /> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
