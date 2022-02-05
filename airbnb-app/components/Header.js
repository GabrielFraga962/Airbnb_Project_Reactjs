import Image from 'next/image';
import { SearchIcon, MenuIcon, GlobeAltIcon, UsersIcon, UserCircleIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/router';


function Header({placeholder}) {
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfGuests, setNoOfGuests] = useState(1);
  const router = useRouter();
  
  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  }

  const resetInput = () => {
    setSearchInput("");
  }

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        noOfGuests,
      }
    })
  }

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  }


  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white p-5 shadow-md md:px-10">
      {/* left */}
      <div onClick={() => router.push('/')} className="relative my-auto flex h-10 cursor-pointer items-center">
        <Image
          src="http://links.papareact.com/qd3"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>

      {/* Middle - Search */}
      <div className="flex item-center md:border-2 rounded-full py-2 md:shadow-sm">
        <input 
          value={searchInput}
          onChange={(e)=> setSearchInput(e.target.value)}
          className="flex-grow pl-5 bg-transparent outline-none text-sm 
          text-gray-600 placeholder-gray-600 font-semibold" 
          type="text" 
          placeholder={placeholder || "Start your search"} //If there is no default value for this, the value will be this
        />
        <SearchIcon className="hidden md:inline-flex h-8 
        cursor-pointer rounded-full bg-red-500 p-2 text-white md:mx-2" />
      </div>

      {/* Right */}
      <div className="flex items-center space-x-4 justify-end text-gray-500">
          <p className="hidden md:inline cursor-pointer hover:bg-gray-100 rounded-full p-2">Become a Host</p>
          <GlobeAltIcon className="h-6 cursor-pointer hover:bg-gray-100 rounded-full"/>

          <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
              <MenuIcon className="h-6"/>
              <UserCircleIcon className="h-6"/>
          </div>
      </div>
      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto shadow-xl rounded-lg mt-5">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#20B2AA", "#00008B"]}
            onChange={handleSelect}
          />
          <div className="flex items-center border-b mb-4"> 
            <h2 className="text-2xl flex-grow font-semibold">Number of Guests</h2>
            <UsersIcon className="h-5" />
            <input 
            value={noOfGuests}
            onChange={(e) => setNoOfGuests(e.target.value)}
            type="number"
            min={1}
            className="w-12 pl-2 text-lg outline-none text-red-500"/>
          </div>
          <div className="flex">
            <button onClick={resetInput} className="flex-grow text-gray-500">Cancel</button> 
            <button onClick={search} className="flex-grow text-red-400">Search</button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
