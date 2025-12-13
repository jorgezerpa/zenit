'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import { useShippingStore } from "@/store/shipping"; 
import { ShippingData } from "@/types/ShippingData";

const inputClasses = "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow mb-3";
const selectClasses = "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow mb-3 appearance-none bg-white";
const disabledClasses = "bg-gray-100 cursor-not-allowed"; // Style for disabled select

// Constants 
const STATES = [
  { 
    name: "Amazonas", 
    municipalities: [
      "Alto Orinoco",
      "Atabapo",
      "Atures",
      "Autana",
      "Manapiare",
      "Maroa",
      "Río Negro"
    ] 
  },
  { 
    name: "Anzoátegui", 
    municipalities: [
      "Anaco",
      "Aragua",
      "Bolívar",
      "Bruzual",
      "Cajigal",
      "Carvajal",
      "Diego Bautista Urbaneja",
      "Freites",
      "Guanta",
      "Guanipa",
      "Independencia",
      "Libertad",
      "McGregor",
      "Miranda",
      "Monagas",
      "Peñalver",
      "Píritu",
      "San Juan de Capistrano",
      "Santa Ana",
      "Simón Rodríguez",
      "Sotillo"
    ] 
  },
  { 
    name: "Apure", 
    municipalities: [
      "Achaguas",
      "Biruaca",
      "Muñoz",
      "Páez",
      "Pedro Camejo",
      "Rómulo Gallegos",
      "San Fernando"
    ] 
  },
  { 
    name: "Aragua", 
    municipalities: [
    "Bolívar",
    "Camatagua",
    "Francisco Linares Alcántara",
    "Girardot",
    "José Ángel Lamas",
    "José Félix Ribas",
    "José Rafael Revenga",
    "Libertador",
    "Mario Briceño Iragorry",
    "Ocumare de la Costa de Oro",
    "San Casimiro",
    "San Sebastián",
    "Santiago Mariño",
    "Santos Michelena",
    "Sucre",
    "Tovar",
    "Urdaneta",
    "Zamora"
    ] 
  },
  { 
    name: "Barinas", 
    municipalities: [
      "Alberto Arvelo Torrealba",
      "Andrés Eloy Blanco",
      "Antonio José de Sucre",
      "Arismendi",
      "Barinas",
      "Bolívar",
      "Cruz Paredes",
      "Ezequiel Zamora",
      "Obispos",
      "Pedraza",
      "Rojas",
      "Sosa"
    ] 
  },
  { 
    name: "Bolívar", 
    municipalities: [
      "Angostura", // Anteriormente Raúl Leoni
      "Angostura del Orinoco", // Anteriormente Heres (donde está Ciudad Bolívar)
      "Caroní", // Donde están Ciudad Guayana y Puerto Ordaz
      "Cedeño",
      "El Callao",
      "Gran Sabana",
      "Padre Pedro Chien",
      "Piar",
      "Roscio",
      "Sifontes",
      "Sucre"
    ] 
  },
  { 
    name: "Carabobo", 
    municipalities: [
      "Bejuma",
      "Carlos Arvelo",
      "Diego Ibarra",
      "Guacara",
      "Juan José Mora",
      "Libertador",
      "Los Guayos",
      "Miranda",
      "Montalbán",
      "Naguanagua",
      "Puerto Cabello",
      "San Diego",
      "San Joaquín",
      "Valencia" // Capital del estado
    ] 
  },
  { 
    name: "Cojedes", 
    municipalities: [
      "Anzoátegui",
      "Falcón",
      "Girardot",
      "Lima Blanco",
      "Pao de San Juan Bautista",
      "Ricaurte",
      "Rómulo Gallegos",
      "San Carlos", // Capital del estado
      "Tinaco"
    ] 
  },
  { 
    name: "Delta Amacuro", 
    municipalities: [
      "Antonio Díaz",
      "Casacoima",
      "Pedernales",
      "Tucupita" // Capital del estado
    ] 
  },
  { 
    name: "Distrito Capital", 
    municipalities: [
      "Libertador"
    ] 
  }, 
  { 
    name: "Falcón", 
    municipalities: [
      "Acosta",
      "Bolívar",
      "Buchivacoa",
      "Cacique Manaure",
      "Carirubana",
      "Colina",
      "Dabajuro",
      "Democracia",
      "Falcón",
      "Federación",
      "Iturriza",
      "Jacura",
      "Los Taques",
      "Mauroa",
      "Miranda", // Capital del estado (Coro)
      "Monseñor Iturriza",
      "Palma Sola",
      "Petit",
      "Píritu",
      "San Francisco",
      "Silva",
      "Sucre",
      "Tocópero",
      "Unión",
      "Zamora"
    ] 
  },
  { 
    name: "Guárico", 
    municipalities: [
      "Camaguán",
      "Chaguaramas",
      "El Socorro",
      "Francisco de Miranda",
      "José Félix Ribas",
      "José Tadeo Monagas",
      "Juan Germán Roscio", // Capital del estado (San Juan de los Morros)
      "Julián Mellado",
      "Las Mercedes",
      "Leonardo Infante",
      "Ortiz",
      "Pedro Zaraza",
      "San Gerónimo de Guayabal",
      "San José de Guaribe",
      "Santa María de Ipire"

    ] 
  },
  { 
    name: "La Guaira", 
    municipalities: [
      "Vargas"
    ] 
  }, // Anteriormente Vargas
  { 
    name: "Lara", 
    municipalities: [
      "Andrés Eloy Blanco",
      "Crespo",
      "Iribarren", // Capital del estado (Barquisimeto)
      "Jiménez",
      "Lara",
      "Morán",
      "Palavecino",
      "Simón Planas",
      "Torres"
    ] 
  },
  { 
    name: "Mérida", 
    municipalities: [
      "Alberto Adriani",
      "Andrés Bello",
      "Antonio Pinto Salinas",
      "Aricagua",
      "Campo Elías", // Capital del estado (Mérida)
      "Caracciolo Parra Olmedo",
      "Cardenal Quintero",
      "Guaraque",
      "Julio César Salas",
      "Justo Briceño",
      "Libertador",
      "Miranda",
      "Obispo Ramos de Lora",
      "Padre Noguera",
      "Pueblo Llano",
      "Rangel",
      "Rivas Dávila",
      "Santos Marquina",
      "Sucre",
      "Tovar",
      "Tulio Febres Cordero",
      "Zea",
      "Arapuey" // Municipio más reciente
    ] 
  },
  { 
    name: "Miranda", 
    municipalities: [
      "Acevedo",
      "Andrés Bello",
      "Baruta",
      "Brión",
      "Buroz",
      "Carrizal",
      "Chacao",
      "Cristóbal Rojas",
      "El Hatillo",
      "Guaicaipuro", // Capital del estado (Los Teques)
      "Independencia",
      "Lander",
      "Los Salias",
      "Páez",
      "Paz Castillo",
      "Pedro Gual",
      "Plaza",
      "Simón Bolívar",
      "Sucre",
      "Urdaneta",
      "Zamora"
    ] 
  },
  { 
    name: "Monagas", 
    municipalities: [
      "Acosta",
      "Aguasay",
      "Bolívar",
      "Caripe",
      "Cedeño",
      "Ezequiel Zamora",
      "Libertador",
      "Piar",
      "Punceres",
      "Santa Bárbara",
      "Sotillo",
      "Uracoa",
      "Maturín" // Capital del estado
    ] 
  },
  { 
    name: "Nueva Esparta", 
    municipalities: [
      "Antolín del Campo",
      "Arismendi", // Capital del estado (La Asunción)
      "García",
      "Gómez",
      "Maneiro",
      "Marcano",
      "Mariño", // Donde se encuentra Porlamar, el centro comercial
      "Península de Macanao",
      "Tubores",
      "Villalba",
      "Díaz"
    ] 
  },
  { 
    name: "Portuguesa", 
    municipalities: [
      "Agua Blanca",
      "Araure",
      "Esteller",
      "Guanare", // Capital del estado
      "Guanarito",
      "Monseñor José Vicente de Unda",
      "Ospino",
      "Páez",
      "Papelón",
      "San Genaro de Boconoito",
      "San Rafael de Onoto",
      "Santa Rosalía",
      "Sucre",
      "Turén"
    ] 
  },
  { 
    name: "Sucre", 
    municipalities: [
      "Andrés Eloy Blanco",
      "Andrés Mata",
      "Arismendi",
      "Benítez",
      "Bermúdez", // Donde se encuentra Carúpano
      "Bolívar",
      "Cajigal",
      "Cruz Salmerón Acosta",
      "Libertador",
      "Mariño",
      "Mejía",
      "Montes",
      "Ribero",
      "Sucre", // Capital del estado (Cumaná)
      "Valdez"
    ] 
  },
  { 
    name: "Táchira", 
    municipalities: [
      "Andrés Bello",
      "Antonio Rómulo Costa",
      "Ayacucho",
      "Bolívar",
      "Cárdenas",
      "Córdoba",
      "Fernández Feo",
      "Francisco de Miranda",
      "García de Hevia",
      "Guásimos",
      "Independencia",
      "Jáuregui",
      "José María Vargas",
      "Junín",
      "Libertad",
      "Libertador",
      "Lobatera",
      "Michelena",
      "Panamericano",
      "Pedro María Ureña",
      "Rafael Urdaneta",
      "Samuel Darío Maldonado",
      "San Cristóbal", // Capital del estado
      "San Judas Tadeo",
      "Seboruco",
      "Simón Rodríguez",
      "Sucre",
      "Torbes",
      "Uribante"
    ] 
  },
  { 
    name: "Trujillo", 
    municipalities: [
      "Andrés Bello",
      "Boconó",
      "Bolívar",
      "Candelaria",
      "Carache",
      "Escuque",
      "José Felipe Márquez Cañizalez",
      "Juan Vicente Campo Elías",
      "La Ceiba",
      "Miranda",
      "Monte Carmelo",
      "Motatán",
      "Pampán",
      "Pampanito",
      "Rafael Rangel",
      "San Rafael de Carvajal",
      "Sucre",
      "Trujillo", // Capital del estado
      "Urdaneta",
      "Valera"
    ] 
  },
  { 
    name: "Yaracuy", 
    municipalities: [
      "Aristides Bastidas",
      "Bolívar",
      "Bruzual",
      "Cocorote",
      "Independencia",
      "José Antonio Páez",
      "La Trinidad",
      "Manuel Monge",
      "Nirgua",
      "Peña",
      "San Felipe", // Capital del estado
      "Sucre",
      "Urachiche",
      "Veroes"
    ] 
  },
  { 
    name: "Zulia", 
    municipalities: [
      "Almirante Padilla",
      "Baralt",
      "Cabimas",
      "Catatumbo",
      "Colón",
      "Francisco Javier Pulgar",
      "Jesús Enrique Lossada",
      "Jesús María Semprún",
      "La Cañada de Urdaneta",
      "Lagunillas",
      "Machiques de Perijá",
      "Mara",
      "Maracaibo", // Capital del estado
      "Miranda",
      "Páez",
      "Rosario de Perijá",
      "San Francisco",
      "Santa Rita",
      "Simón Bolívar",
      "Sucre",
      "Valmore Rodríguez"
    ] 
  }
];

const errorClasses = "border-red-500 focus:ring-red-500";

type ShippingErrors = {
    shippingState: string;
    shippingMunicipality: string;
    shippingAgencyAddress: string;
}

// NOTE: You will need to ensure the parent (Cart) passes these errors like <ShippingMRW errors={errors} />
export function ShippingMRW({ errors }: { errors: ShippingErrors }) {
    // 1. Get the store function directly
    const { addShippingData } = useShippingStore(); 
    
    const [shippingData, setShippingData] = useState<ShippingData>({
        state: "", // Default value is empty string
        municipality: "", // Default value is empty string
        agencyAddress: "",
        method: "mrw", 
    });

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        
        // Use a functional update to ensure we have the latest state
        setShippingData(prevData => {
            let newState: ShippingData;

            // Handle State change logic
            if (name === "state") {
                // If state changes, reset municipality
                newState = {
                    ...prevData,
                    state: value,
                    municipality: "", // Reset municipality to prevent invalid pairing
                };
            } else {
                // Handle Municipality or AgencyAddress change
                newState = {
                    ...prevData,
                    [name]: value,
                };
            }
            
            addShippingData(newState);

            return newState;
        });
    };

    // Logic to find the municipalities for the currently selected state
    const selectedState = STATES.find(s => s.name === shippingData.state);
    const municipalities = selectedState ? selectedState.municipalities : [];
    
    // Determine if the municipality select should be disabled
    const isMunicipalityDisabled = shippingData.state === "";

    // Determine error styling
    const stateErrorClass = errors.shippingState ? errorClasses : '';
    const municipalityErrorClass = errors.shippingMunicipality ? errorClasses : '';
    const agencyAddressErrorClass = errors.shippingAgencyAddress ? errorClasses : '';

    return ( 
        <div>
            {/* State Select Input (Always Enabled) */}
            <select
                name="state" 
                id="state" 
                className={`${selectClasses} ${stateErrorClass}`}
                value={shippingData.state}
                onChange={handleChange}
            >
                <option value="" disabled hidden>Estado</option>
                {STATES.map((state) => (
                    <option key={state.name} value={state.name}>
                        {state.name}
                    </option>
                ))}
            </select>
            {errors.shippingState && <p className="text-red-500 text-sm -mt-2 mb-3">{errors.shippingState}</p>}


            {/* Municipality Select Input (Conditionally Enabled) */}
            <select
                name="municipality" 
                id="municipality" 
                className={`${selectClasses} ${isMunicipalityDisabled ? disabledClasses : ''} ${municipalityErrorClass}`}
                value={shippingData.municipality}
                onChange={handleChange}
                disabled={isMunicipalityDisabled} // Disable if no state is selected
            >
                <option value="" disabled hidden>
                    {isMunicipalityDisabled ? "Selecciona un Estado primero" : "Municipio"}
                </option>
                {/* Render municipalities only if a state is selected and has municipalities */}
                {municipalities.map((municipality) => (
                    <option key={municipality} value={municipality}>
                        {municipality}
                    </option>
                ))}
            </select>
            {errors.shippingMunicipality && <p className="text-red-500 text-sm -mt-2 mb-3">{errors.shippingMunicipality}</p>}


            {/* Agency Address Input */}
            <input 
                type="text" 
                name="agencyAddress" 
                id="agency-number" 
                placeholder="Direccion/Numero de agencia" 
                className={`${inputClasses} ${agencyAddressErrorClass}`}
                value={shippingData.agencyAddress}
                // We reuse the existing handleChange, but cast the event target to HTMLInputElement
                onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
            />
            {errors.shippingAgencyAddress && <p className="text-red-500 text-sm -mt-2 mb-3">{errors.shippingAgencyAddress}</p>}
        </div> 
    );
}