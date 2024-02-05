import React from "react";
export default function Animation1() {
  return (
    <>
      {/* Text Animation */}
      <div className="w-screen box-border  p-4 flex items-center overflow-hidden ">
        <div className="animate">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div className="text-9xl text-orange-600 whitespace-nowrap inline-flex items-center justify-center">
              No page found...
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
