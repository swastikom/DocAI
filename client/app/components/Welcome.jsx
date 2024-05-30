import React from "react";
import { MdFileUpload } from "react-icons/md";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { AiFillThunderbolt } from "react-icons/ai";

const Welcome = () => {
  return (
    <div className="  flex-grow flex items-center justify-left ">
      <div className=" no-scrollbar overflow-y-auto lg:p-8 md:p-7 sm:p-7 bg-white rounded-lg text-left flex-col items-start  w-full">
        <h1 className="lg:text-[5em] md:text-[4em] sm:text-[3em] font-bold mb-4 text-slate-700">
          Welcome User!
        </h1>
        <p className="lg:text-[3em] md:text-[2em] sm:text-[1.5em] text-[#33a87d]">
          Upload your PDF and get the gist.
        </p>
        <div className="lg:flex items-center justify-start mt-10 lg:gap-4 md:gap-4 sm:gap-4">
          <div className="card">
            
            <MdFileUpload className="mt-3 mb-2" spacing={7} color="#33a87d" size={50} />
            Upload your PDF file.
          </div>
          <div className="card">
            <RiQuestionAnswerFill className="mt-3 mb-2" spacing={7} color="#3B82F6" size={40}/>
            Ask your Question aboout the pdf to Bot
          </div>
          <div className="card">
            <AiFillThunderbolt className="mt-3 mb-2" color="#FDE047" spacing={7}  size={40}/>
            Bot will answer!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;