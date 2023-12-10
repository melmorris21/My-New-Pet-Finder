'use client'
import './globals.css'
import React, {useState} from "react"

export default function RootLayout({
}) {
  return (
    <html lang="en">
    <title>My New Pet Finder</title>
    <h1>My New Pet Finder</h1>
         
         <FilterablePetTable pets={PETS} />
    </html>
  )
}

function FilterablePetTable({ pets }) {
  const [filterText, setFilterText] = useState('');
  const [apartmentFriendly, setApartmentFriendly] = useState(false);
  const [filterPet, setFilterPet] = useState('');

  return (
    <>
    <div className="menu">
      <h2>Filter</h2>
      <button id="Dog">Dog</button>
      <button id="Cat">Cat</button>
      <button id="Fish">Fish</button>
      <button id="Reptile">Reptile</button>
      <button id="Rodent">Rodent</button>
      <button id="Bird">Bird</button>
    </div>
    <div>
      <SearchBar 
      filterText={filterText}
      apartmentFriendly={apartmentFriendly}
      onFilterTextChanges={setFilterText}
      onApartmentFriendlyChange={setApartmentFriendly}/>
      <PetTable 
      pets={pets}
      filterText={filterText}
      apartmentFriendly={apartmentFriendly}
      filterPet={filterPet}/>
    </div>
    </>
  );
}

function SearchBar({
  filterText,
  apartmentFriendly,
  onFilterTextChanges,
  onApartmentFriendlyChange
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

function PetTable({ pets, filterText, apartmentFriendly, filterPet }){
  const rows = [];
  let petType = null;

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
  if (filterPet){
    return;
  }
  
    if (pet.type !== petType) {
      rows.push(
          <PetTypeRow
          type={pet.type}
          key={pet.type} />
      );
  }
  rows.push(
      <PetRow
      pet={pet}
      key={pet.name} />
  );
  petType = pet.type;
  });

  return (
      <table>
          <thead>
              <tr>
                  <th>Name</th>
                  <th>Type</th>
              </tr>
          </thead>
          <tbody>{rows}</tbody>
      </table>
  );
}

function PetRow({ pet }) {
  const name = pet.apartment ? pet.name :
    <span style={{ color: 'red' }}>
      {pet.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{pet.type}</td>
    </tr>
  );
}

function PetTypeRow({ type }) {
  return (
    <tr>
      <th colSpan="2">
      </th>
    </tr>
  );
}

const PETS = [
  {name: "German Shepherd", type: "Dog", apartment: false},
  {name: "Yorkie", type: "Dog", apartment: true},
  {name: "Doodle", type: "Dog", apartment: true},
  {name: "Great Dane", type: "Dog", apartment: false},
  {name: "Gecko", type: "Reptile", apartment: true},
  {name: "Bearded Dragon", type: "Reptile", apartment: true},
  {name: "Python", type: "Reptile", apartment: false},
  {name: "Beta Fish", type: "Fish", apartment: true},
  {name: "Shark", type: "Fish", apartment: false},
  {name: "Goldfish", type: "Fish", apartment: true},
  {name: "Parakeet", type: "Bird", apartment: true},
  {name: "Parrot", type: "Bird", apartment: false},
  {name: "Tabby", type: "Cat", apartment: true},
  {name: "Bengal", type: "Cat", apartment: true},
  {name: "Lynx", type: "Cat", apartment: false},
  {name: "Hamster", type: "Rodent", apartment: true},
  {name: "Guinea Pig", type: "Rodent", apartment: true},
  {name: "Chinchilla", type: "Rodent", apartment: true}
]
