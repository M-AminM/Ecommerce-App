import React, { type FC } from "react";
import { useFetch } from "../../service/service";

const Home: FC = () => {
  const { data, isPending } = useFetch("products");

  return (
    <div className="text-red-500 flex justify-center items-center py-10">
      {isPending ? (
        <div>Loading...</div>
      ) : (
        <div>
          {data?.data.map((item: any) => (
            <div className="flex flex-col items-center bg-red-400">
              <h3>{item.name}</h3>
              <img
                className="w-36 rounded-xl h-28"
                src={item.image_url}
                alt={item.name}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
