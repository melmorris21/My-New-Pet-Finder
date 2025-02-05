'use client'
import './globals.css'
import React, {useState} from "react"
import PETS from "./data"

export default function RootLayout({
}) {
  return (
    <html lang="en">
    <title>Adoptable Animals</title>
    <h1>Adoptable Animals</h1>
    <FilterablePetTable pets={PETS} />
    </html>
  )
}

function FilterablePetTable({ pets }) {
  const [filterText, setFilterText] = useState('');
  const [apartmentFriendly, setApartmentFriendly] = useState(false);

  return (
    <>
    <div>
      <SearchBar 
      filterText={filterText}
      apartmentFriendly={apartmentFriendly}
      onFilterTextChanges={setFilterText}
      onApartmentFriendlyChange={setApartmentFriendly}
      />
      <PetTable 
      pets={pets}
      filterText={filterText}
      apartmentFriendly={apartmentFriendly}
      />
    </div>
    </>
  );
}

function SearchBar({
  filterText,
  apartmentFriendly,
  onFilterTextChanges,
  onApartmentFriendlyChange,

  }) {
  return (
    <form>
      <input 
        type="text"
        value={filterText} placeholder="Search..." 
        onChange={(e) => onFilterTextChanges(e.target.value)} />
      <label>
        <input 
        type="checkbox"
        checked={apartmentFriendly} 
        onChange={(e) => onApartmentFriendlyChange(e.target.checked)}/>
        {' '}
        Only show pets appropriate for apartments
      </label>
    </form>
  );
}

function PetTable({ pets, filterText, apartmentFriendly }){
  const rows = [];

  pets.forEach((pet) => {
  if (
    pet.name.toLowerCase().indexOf(
      filterText.toLowerCase()
    ) === -1
  ){
    return;
  }
  if (apartmentFriendly && !pet.apartment){
    return;
  }

  rows.push(
      <PetRow
      pet={pet}
      name={pet.name} />
  );

  });

  return (
      <table>
          <thead>
              <tr>
                  <th>Name</th>
                  <th>Breed</th>
              </tr>
          </thead>
          <tbody>{rows}</tbody>
      </table>
  );
}

function PetRow({ pet }) {

  return (
    <tr>
      <td>{pet.name}</td>
      <td>{pet.breed}</td>
    </tr>
  );
}