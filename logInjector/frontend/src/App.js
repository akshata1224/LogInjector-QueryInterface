
import React from 'react';
import './index.css';
import { useState, useEffect } from "react";
import axios from 'axios'
import ShowAllLogs from './showAllLogs/logsList.js';

function App() {

  const [searchTerm, setSearchTerm] = useState([]);
  const [logs, setLogs] = useState([]);
  const [enteredValue, setEnteredValue] = useState('');
  const [selectedFilter, SetSelectedFilter] = useState('');
  const [filters, setFilters] = useState({})
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [items, setItems] = useState();

  useEffect(() => {
    const query = `http://localhost:3000/logs?page=${currentPage}`
    fetchPosts(currentPage, query)
  },[currentPage]);

  const fetchPosts = async (page, query) => {
    
    try {
      const response = await axios.get(query);
      let temp = Object.entries(response.data.message);
      setLogs(temp)
      setItems(response.data.length)
      setTotalPages(response.data.pages);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleFilterChange = () => {
    setFilters({ ...filters, [selectedFilter]: enteredValue });
    setSearchTerm(constructQueryString())
    //setEnteredValue(constructQueryString())
  };
  
    const constructQueryString = () => {
  
      var esc = encodeURIComponent;
      var query = Object.keys(filters)
          .map(k =>  esc(k) + '=' + esc(filters[k]))
          .join('&');
          console.log(query)
        
        return "&"+query;

      };
    
  
  const handleSearch = async(e) => {
    e.preventDefault();
    const query = `http://localhost:3000/logs/search?query=${constructQueryString()}&page=${1}`
    fetchPosts(currentPage, query)
    
 }
 const handleDropdownChange = (event) => {
  SetSelectedFilter(event.target.value);
  setSearchTerm(constructQueryString())
};
 

  return (
    <div className="mx-4 px-8 flex flex-col">
      <h1 className='text-3xl py-4 font-bold text-blue-900 flex text-left'>
        Logs</h1>
      <div className=" flex min-h-screen flex-col items-center justify-between p-2">
      {/* <h1 className='text-3xl text-blue-900 flex text-left'>
        Logs</h1> */}
      <div className='w-6/12'>
      
    <div className='p-4 flex items-center justify-between'>
      
      <select value={selectedFilter}
      className='text-xl p-3 border   border-slate-600 rounded-md text-center'
       onChange={handleDropdownChange}>
        <option value="">Select</option>
        <option value="level">level</option>
        <option value="message">message</option>
        <option value="resourceId">resourceId</option>
        <option value="timestamp">timestamp</option>
        <option value="traceId">traceId</option>
        <option value="spanId">spanId</option>
        <option value="commit">commit</option>
        {/* <option value="metadata">metadata</option> */}
        
      </select>
      
      <input 
        type="text" 
        className='sm:w-full text-xl m-4 p-3 border border-slate-600 rounded-md text-left'
        placeholder="Enter search term..." 
        name="searchTerm" 
        value={enteredValue} 
        onChange={(e) => setEnteredValue(e.target.value)}
      />
      <button
      onClick={handleFilterChange}
      className='text-2xl bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-full'
      >
        +
      </button>
    </div>
    
        <form
        className='flex flex-row justify-evenly'
        onSubmit={handleSearch}
        >
          <input
            className='m-4 p-3 sm:w-full border border-slate-600 rounded-md text-left  text-xl'
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
      
          <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold my-4 px-3 rounded'
           type="submit">Search</button>
          
          
        </form> 
      </div>
        <span className=' ma-3 font-bold'
        >Total items {items}</span>
        <br/>
        <ShowAllLogs logs={logs}/>
        <div>
        <button
          onClick={() => {
            setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
           
          }
            
          }
           //disabled={currentPage === 1}
        >
          Previous
        </button>
        <span> Page {currentPage}  of {totalPages} </span>
        <button
          onClick={() => {
            
            setCurrentPage((prevPage) =>
              Math.min(prevPage + 1, totalPages)
            )
          
          }}
           disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
    </div>
  );
}

export default App;
