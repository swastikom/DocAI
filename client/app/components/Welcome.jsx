import React from "react";
import { MdFileUpload } from "react-icons/md";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { AiFillThunderbolt } from "react-icons/ai";

const Welcome = () => {
  return (
    <div className="flex-grow flex items-center justify-left">
      <div className="p-8 bg-white rounded-lg text-left flex-col items-start">
        <h1 className="text-[5em] font-bold mb-4 text-slate-700">
          Welcome User!
        </h1>
        <p className="text-[3em] text-[#33a87d]">
          Upload your PDF and get the gist.
        </p>
        <div className="flex items-center justsify-start mt-10 gap-4">
          <div className="card">
            
            <MdFileUpload className="mt-3" spacing={7} color="#33a87d" size={50} />
            Upload your PDF file.
          </div>
          <div className="card">
            <RiQuestionAnswerFill className="mt-3" spacing={7} color="#3B82F6" size={40}/>
            Ask your Question aboout the pdf to Bot
          </div>
          <div className="card">
            <AiFillThunderbolt className="mt-3" color="#FDE047" spacing={7}  size={40}/>
            Bot will answer!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
