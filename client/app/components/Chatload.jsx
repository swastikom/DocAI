import React from "react";

const Chatload = () => {
  return (
    <div class=" shadow-xl rounded-md p-5  w-full ">
      <div class="animate-pulse flex space-x-4">
        <div class="rounded-full bg-slate-300 h-10 w-10"></div>
        <div class="flex-1 space-y-6 py-1">
          <div class="h-2 bg-slate-300 rounded"></div>
          <div class="space-y-3">
            <div class="grid grid-cols-3 gap-4">
              <div class="h-2 bg-slate-300 rounded col-span-2"></div>
              <div class="h-2 bg-slate-300 rounded col-span-1"></div>
            </div>
            <div class="h-2 bg-slate-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatload;
