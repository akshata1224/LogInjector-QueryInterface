import React from "react"



const ShowAllLogs = ({ logs }) => {
    // let array = [...Object.values(books)];
     return (
           <div className="sm:w-full">
             {
               logs.map((book,index)=>(
                 <div key={book._id}>
                   <div class="m-2 sm:w-full relative flex flex-col rounded-xl border-2 border-black-100 bg-clip-border text-gray-700 shadow-md">
                   <div class="p-2">
                     <h5 class="block font-sans text-base font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                       Level: {book[1].level}
                     </h5>
                     <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                       message: {book[1].message}
                     </p>
                     <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                     resourceId: {book[1].resourceId}
                     </p>
                     <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                     timestamp: {book[1].timestamp}
                     </p>
                     <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                     traceId: {book[1].traceId}
                     </p>
                     <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                     spanId: {book[1].spanId}
                     </p>
                     <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                     commit: {book[1].commit}
                     </p>
                     {/* <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                     metadata:  {book[1].metadata}
                     </p> */}
                   </div>
                 <div class="p-2 pt-2 flex justify-end">
                   <button
                     class="select-none rounded-lg bg-pink-500 py-2 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                     type="button"
                     data-ripple-light="true"
                   >
                     Read More
                   </button>
             </div>
           </div>
                 </div>
               ))
             }
           </div>
            
             
         
     )
 
 }
 
 export default ShowAllLogs;