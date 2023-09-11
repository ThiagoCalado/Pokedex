import React, { useState, useEffect } from 'react';
import api from '../api';

function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemonDescription, setPokemonDescription] = useState("");

  // Função para buscar a lista de Pokémon na API
  const fetchPokemonList = async () => {
    try {
      const response = await api.get('pokemon?limit=151');
      setPokemonList(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  // Função para buscar a descrição do Pokémon em pt-br
  const fetchPokemonDescription = async (pokemonId) => {
    try {
      const response = await api.get(`pokemon-species/${pokemonId}`);
      const ptbrDescription = response.data.flavor_text_entries.find(
        entry => entry.language.name === 'pt-br'
      );
      if (ptbrDescription) {
        setPokemonDescription(ptbrDescription.flavor_text);
      } else {
        setPokemonDescription("Descrição não encontrada.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = async (name) => {
    try {
      const response = await api.get(`pokemon/${name}`);
      setSelectedPokemon(response.data);
      // Chama a função para buscar a descrição
      fetchPokemonDescription(response.data.id);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPokemonList();
  }, []);

  return (
    <div>
      <h1>Pokédex</h1>
      <ul>
        {pokemonList.map((pokemon, index) => (
          <li key={index} onClick={() => handleClick(pokemon.name)}>
            {pokemon.name}
          </li>
        ))}
      </ul>
      {selectedPokemon && (
        <div>
          <h2>{selectedPokemon.name}</h2>
          <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
          <p>{pokemonDescription}</p> {/* Exibe a descrição aqui */}
        </div>
      )}
    </div>
  );
}

export default Pokedex;

// Seu código JavaScript (pokedex.js)

// Suponha que você tenha uma matriz de Pokémon
const pokemonList = [
  { name: "Bulbasaur", type: "Grass/Poison" },
  { name: "Charmander", type: "Fire" },
  { name: "Squirtle", type: "Water" },
  // Outros Pokémon...
];

let currentPokemonIndex = 0; // Índice do Pokémon atual

// Função para exibir o Pokémon atual
function displayCurrentPokemon() {
  const currentPokemon = pokemonList[currentPokemonIndex];
  // Atualize o DOM para exibir as informações do Pokémon
  // Exemplo: document.getElementById("pokemonName").textContent = currentPokemon.name;
}

// Função para avançar para o próximo Pokémon
function nextPokemon() {
  currentPokemonIndex++;
  if (currentPokemonIndex >= pokemonList.length) {
      currentPokemonIndex = 0; // Volte ao primeiro Pokémon se estiver no último
  }
  displayCurrentPokemon();
}

// Função para voltar para o Pokémon anterior
function previousPokemon() {
  currentPokemonIndex--;
  if (currentPokemonIndex < 0) {
      currentPokemonIndex = pokemonList.length - 1; // Volte ao último Pokémon se estiver no primeiro
  }
  displayCurrentPokemon();
}

// Adicione manipuladores de eventos aos botões
document.getElementById("previousButton").addEventListener("click", previousPokemon);
document.getElementById("nextButton").addEventListener("click", nextPokemon);

// Exiba o primeiro Pokémon ao carregar a página
displayCurrentPokemon();
