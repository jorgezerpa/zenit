'use client'
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/topbar";
import { BackButton } from "@/components/backButton";
import { useCartStore } from "@/store/cart";
import { useProductsStore } from "@/store/products";
import { ShippingMRW } from "@/components/shippingMRW";
import { ShippingZoom } from "@/components/shippingZOOM";
import { useShippingStore } from "@/store/shipping";
import { PagoMovil } from "@/components/paymentMethods/PagoMovil";
import { TransferenciaProvincial } from "@/components/paymentMethods/TransferenciaProvincial";
import { TransferenciaMercantil } from "@/components/paymentMethods/TransferenciaMercantil";
import { TransferenciaBanesco } from "@/components/paymentMethods/TransferenciaBanesco";
import { Binance } from "@/components/paymentMethods/Binance";
//
import { supabase } from "@/lib/supabase";
import { error } from "console";
import { RenderUpload } from "@/components/RenderUpload";

enum PaymentMethods {
  PagoMovil,
  TransferenciaProvicial,
  // TransferenciaMercantil,
  // TransferenciaBanesco,
  Binance
}

enum ShippingMethods {
  MRW,
  ZOOM
}

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



// Define a common style for inputs for better visual consistency
const inputClasses = "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow mb-3";
const errorClasses = "border-red-500 focus:ring-red-500";

export default function Cart() {
  const router = useRouter();
  const cartStore = useCartStore()
  const productsStore = useProductsStore()
  const shippingStore = useShippingStore()
  
  const paymentProofRef = useRef<HTMLInputElement>(null);
  const [contactData, setContactData] = useState<{ name:string, phone: string, IDNumber: string, email:string }>({ name:"", phone: "", IDNumber: "", email: "" })
  const [selectedShippingMode, setSelectedShippingMode] = useState<ShippingMethods|null>(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethods|null>(null)

  const [isLoading, setIsLoading] = useState(false)

  // error handling and sanitization
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    IDNumber: '',
    email: "",
    shippingMethod: '',
    shippingState: '',
    shippingMunicipality: '',
    shippingAgencyAddress: '',
    paymentMethod: '',
    paymentProof: '',
    products: '',  
    total: '', // total to pay
  })

  const [uploadError, setUploadError] = useState(false)

  useEffect(()=>{
    cartStore.initialLoad()
  }, [])

  useEffect(()=>{
    shippingStore.clearShippingData()
  }, [selectedShippingMode])


  // useEffect to listen changes on shippingStore, to remove errors when user modifies a specific field
  useEffect(()=>{
    const shippingData = shippingStore.shippingData;
    if(!shippingData) return;
    if(shippingData.state) {
      setErrors(prev => ({ ...prev, shippingState: '' }))
    }
    if(shippingData.municipality) {
      setErrors(prev => ({ ...prev, shippingMunicipality: '' }))
    }
    if(shippingData.agencyAddress) {
      setErrors(prev => ({ ...prev, shippingAgencyAddress: '' }))
    }
  }, [shippingStore.shippingData])

  const products = cartStore.products.map(cartProduct => {
    const product = productsStore.products.find(p => p.id == cartProduct.id)
    if(!product) return null
    return { ...product, ...cartProduct }
  }).filter(p => !!p)
    
  // --- Input changes handlers ---
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Returns enum name (string)
  const getPaymentMethodName = (method: PaymentMethods) => {
    return PaymentMethods[method];
  };

  // Return clasess to render when select an option
  const getSelectionClasses = (isSelected: boolean) => (
    `p-3 border rounded-lg cursor-pointer transition-all text-sm font-medium text-center shadow-sm 
    ${isSelected 
      ? "bg-blue-500 text-white border-blue-500 hover:bg-blue-600" 
      : "bg-white text-gray-700 border-gray-300 hover:border-blue-300"
    }`
  );

  const calculateTotal = () => {
    const subtotal = products.reduce((accumulator, product) => {
      const price = product.price; 
      const quantity = product.quantity;     
      return accumulator + (Number(price) * quantity);
    }, 0);

    // NOTA: Si necesitas añadir costos de envío, se harían aquí.
    // const shippingCost = 0; 
    // return subtotal + shippingCost; 

    return subtotal.toFixed(2); // Formatea a 2 decimales para moneda
  };

  const calculateDeliveryDays = () => {
    // 1. Suma la cantidad total de unidades en el carrito
    const totalUnits = products.reduce((acc, product) => {
      return acc + product.quantity;
    }, 0);

    // 2. Añade los 3 días fijos de buffer/emergencia
    const fixedBufferDays = 3;
    
    return totalUnits + fixedBufferDays;
  };

  const formattedDeliveryDate = () => {
    const deliveryDays = calculateDeliveryDays();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + deliveryDays);
    
    // Formato de la fecha: "Lunes, 25 de Diciembre"
    const deliveryDateString = futureDate.toLocaleDateString('es-ES', {
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    return deliveryDateString
  }

  const handleBuy = async () => {
    setIsLoading(true)
    setUploadError(false)
    let errors = {
      name: '',
      phone: '',
      IDNumber: '',
      email: '',
      shippingMethod: '',
      shippingState: '',
      shippingMunicipality: '',
      shippingAgencyAddress: '',
      paymentMethod: '',
      paymentProof: '',
      products: '',  
      total: '', // total to pay
    };

    // 1. **Prepare Data**
    const paymentProofFile = paymentProofRef.current?.files?.[0];
  
    if (!paymentProofFile) {
      errors.paymentProof = "Por favor, sube el comprobante de pago.";
    }
    
    if (paymentProofFile) {
      const allowedExtensions = ['png', 'jpeg', 'jpg'];
      const fileExtension = paymentProofFile.name.split('.').pop()?.toLowerCase();
      if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
        errors.paymentProof = "Formato de archivo invalido. Solo se permiten png, jpeg, jpg.";
      }
    }

    // Combine basic data
    const checkoutData = {
      contact: contactData,
      shipping: {
        method: selectedShippingMode !== null ? ShippingMethods[selectedShippingMode] : null,
        deliveryDays: calculateDeliveryDays(),
        specificData: shippingStore.shippingData, // state: string; municipality: string; agencyNumber: string; method: "zoom" | "mrw";
      },
      payment: {
        method: selectedPaymentMethod !== null ? PaymentMethods[selectedPaymentMethod] : null,
      },
      items: cartStore.products, // We will use this array to insert into order_items
      total: Number(calculateTotal()),
    };

    // Input validation 
    // name -> Max 50 chars
    // idNumber -> should start with V or E (no camel sensitive) followed by any amount of numbers
    // email -> valid email format
    // phone -> starts with any of 0414,0424,0416,0426,0412,0422 and has 7 numbers after such prefixes
    // shippingMethod -> should be "mrw" or "zoom"
    // shippingState -> Any of the 23 states or distrit capital of venezuela  
    // shippingMunicipality -> correspondant municipality for the selected state,
    // shippingAgencyAddress: -> string,
    // paymentMethod -> "pagoMovil", "transferenciaProvincial", etc al listed
    // paymentProof: -> Image, check extension to be "png, jpeg, jpg"
    // products -> length of the list of at least 1 product and check for no repeated  
    // total -> number more than 0 and should be the sum of the products 
    if (checkoutData.contact.name.length < 5) errors.name = "El nombre ingresado es muy corto (minimo 5 caracteres)";
    if (checkoutData.contact.name.length > 50) errors.name = "El nombre ingresado es muy largo (maximo 50 caracteres)";
    if (!/^0(414|424|416|426|412|422)\d{7}$/.test(checkoutData.contact.phone)) errors.phone = "El número de teléfono ingresado no es válido.";
    if (!/^[VEve]\d+$/.test(checkoutData.contact.IDNumber)) errors.IDNumber = "El número de cédula ingresado no es válido. Debe comenzar con V o E seguido de números. ej: V12345678";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(checkoutData.contact.email)) errors.email = "El correo electrónico ingresado no es válido.";
    if (!checkoutData.shipping.method || !(checkoutData.shipping.method === "MRW" || checkoutData.shipping.method === "ZOOM")) errors.shippingMethod = "Método de envío no existente";
    if (!checkoutData.payment.method || !Object.values(PaymentMethods).includes(checkoutData.payment.method)) errors.paymentMethod = "Método de pago no existente";
    if (checkoutData.items.length === 0) errors.products = "No hay productos en el carrito.";
    // if (checkoutData.total <= 0) setErrors(prev => ({ ...prev, total: "No se puede hacer una orden con 0$ " }));
    //
    if (checkoutData.shipping.method && checkoutData.shipping.specificData) {
      const { state, municipality, agencyAddress } = checkoutData.shipping.specificData;
      // Validate state
      if (!STATES.some(s => s.name === state)) {
        errors.shippingState = "Seleccione un estado de la lista";
      } else {
        // Validate municipality
        const stateObj = STATES.find(s => s.name === state);
        if (stateObj && !stateObj.municipalities.includes(municipality)) {
          errors.shippingMunicipality = "Seleccione un municipio de la lista";
        }
      }
      // Validate agency address
      if (!agencyAddress || agencyAddress.trim().length === 0) {
        errors.shippingAgencyAddress = "Ingrese una direccion de envio valida";
      }
    } else if(checkoutData.shipping.method && !checkoutData.shipping.specificData) {
      errors.shippingState = "Seleccione un estado de la lista";
      errors.shippingMunicipality = "Seleccione un municipio de la lista";
      errors.shippingAgencyAddress = "Ingrese una direccion de envio valida";
    }

    
    // If any errors, stop the process
    if (Object.values(errors).some(error => error) || !paymentProofFile) {
      setErrors(errors);
      setIsLoading(false)
      console.log("Validation errors:", errors);
      return;
    }

    // 2. **Upload Payment Proof to Storage**
      let paymentProofUrl = null;
      const fileName = 
        `${Date.now()}-${checkoutData.contact.name}-${checkoutData.contact.phone}-${checkoutData.payment.method}-${checkoutData.total}-${Math.random().toString()}` // Unique file name
        .replace(/\s+/g, '_'); // replace spaces with underscores

      // Storage path: bucket_name/folder/filename
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('payment_proofs') // <--- Your bucket name
        .upload(`2026/${fileName}`, paymentProofFile, {
          cacheControl: '3600',
          upsert: false // Set to true if you might overwrite
        });

      if (uploadError) {
        console.error("Supabase Storage Upload Error:", uploadError);
        setIsLoading(false)
        setUploadError(true)
        // TODO: Handle upload failure
        return;
      }

      // Get the public URL for the file (You might need a separate function if RLS is strict)
      // NOTE: If RLS is strict, you'll need to generate a signed URL on the server/edge function.
      // For a simple public access, you can construct the URL like this:
      const path = uploadData.path;
      paymentProofUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/payment_proofs/${path}`;

      // 3. **Insert Order Data**
      // Prepare the object for the `orders` table
      const orderInsertData = {
        contact_name: checkoutData.contact.name,
        contact_phone: checkoutData.contact.phone,
        contact_email: checkoutData.contact.email,
        contact_idNumber: checkoutData.contact.IDNumber,
        shipping_method: checkoutData.shipping.method,
        stimated_delivery_days: checkoutData.shipping.deliveryDays,
        shipping_data: checkoutData.shipping.specificData, // jsonb field
        payment_method: checkoutData.payment.method,
        total: checkoutData.total,
        payment_proof_url: paymentProofUrl, // The URL we got from the upload
        status: 'Pending Payment check', // Initial status
        // an string with comma separated list of product ids
        products: checkoutData.items.map(item => item.id).join(','),
      };

      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([orderInsertData])
        .select() // Select the inserted row to get the generated `id`
        .single();

      if (orderError) {
        console.error("Supabase DB Insert Error (Orders):", orderError);
        // TODO: Handle DB insertion failure
        // IMPORTANT: If this fails, you should also DELETE the uploaded file!
        // await supabase.storage.from('payment_proofs').remove([`proofs/${fileName}`]);
        setIsLoading(false)
        setUploadError(true)
        try {
          await supabase.storage.from('payment_proofs').remove([path]);
        } catch (deletionError) {
          console.error("Failed to delete uploaded payment proof after DB failure:", deletionError);
        }
        return;
      }

      const newOrderId = orderData.id;
      // 4. SUCCESS
      console.log("Checkout successful. Order ID:", newOrderId);
      setIsLoading(false)

      // 5 . Clear cart and shipping data and redirect to thanks page
      cartStore.clear();
      shippingStore.clearShippingData();
      router.push(`/thank-you`);
  } 
      

  if(cartStore.products.length === 0) {
    return (
      <div>
        <TopBar />
        <div className="h-[81px]" />
        <BackButton to="/" text=""/>
        
        <div className="p-5">
          <h2 className="text-xl font-bold">Tu carrito está vacío</h2>
          <div className="h-5"></div>
          <p className="text-gray-600">Agrega productos a tu carrito para verlos aquí.</p>
        </div>
      </div>
    )
  }

    
  return (
    <div>
      <TopBar />
      <div className="h-[81px]" />
      <BackButton to="/" text=""/>
      
      <div className="p-5">
        <h2 className="text-xl font-bold">Tu carrito</h2>
        <div className="h-5"></div>

        <div className="flex flex-col lg:flex-row gap-5">
          {/* Products list */}
          <div className="w-full lg:w-3/5 bg-white p-4 rounded-xl shadow-lg">
            {
              products.map(p => (
                <div key={p.id + "cart"} className="mb-2 pb-2 border-b border-gray-300 flex justify-start items-start">
                  <div className="shrink-0 w-[81px] h-[81px] md:w-[100px] md:h-[100px] bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${p.images[0]})` }}></div>
                  <div className="pl-2 pr-2 pb-2 w-full">
                    <h2 className="text-base font-bold md:font-normal md:text-xl ">{ p.name }</h2>
                    <p className="text-gray-600">{ p.price }$</p>
                    
                    <div className="flex justify-end md:justify-start">
                      <div className="flex items-center mt-2 border border-gray-300 w-fit rounded-lg shrink-0">
                        {/* Minus Button */}
                        <div 
                          className="w-5 h-5 flex items-center justify-center cursor-pointer text-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => cartStore.decreaseQuantity(p.id)}
                        >
                          -
                        </div>
                        {/* Quantity Display */}
                        <div className="px-3 text-lg font-medium border-l border-r border-gray-300">
                          { p.quantity } 
                        </div>
                        {/* Plus Button */}
                        <div 
                          className="w-5 h-5 flex items-center justify-center cursor-pointer text-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => cartStore.increaseQuantity(p.id)}
                        >
                          +
                        </div>
                      </div>

                      <div className="ml-4 flex items-center group relative">
                          <button
                              className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                              onClick={() => { cartStore.removeProduct(p.id) }} 
                          >
                              {/* Trash/Remove SVG Icon */}
                              <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  className="h-6 w-6" 
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  stroke="currentColor" 
                                  strokeWidth={2}
                              >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                          </button>

                          {/* Hover Text Tooltip */}
                          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                              Remove from cart
                          </span>
                      </div>




                    </div>
                  </div>
                </div>
              ))
            }
            <div className="pt-4 mt-4 border-t-2 border-gray-400">
              <div className="flex justify-between items-center text-xl font-bold">
                <span className="text-gray-700">Total a Pagar:</span>
                <span className="text-2xl text-green-600">
                  ${calculateTotal()}
                </span>
              </div>
              <p className="text-sm text-gray-500 text-right mt-1">*Precio sin incluir costos de envío.</p>
            </div>

            <div className="h-10"></div>

            <div>
              <h4 className="text-base text-gray-600">
                Fecha Estimada de Entrega:
              </h4>
              <p className="text-lg mb-2 text-gray-700 capitalize">
                {formattedDeliveryDate()}
              </p>
              
              {/* Mensaje Explicativo con fondo gris muy suave */}
              <p className="text-xs text-gray-600 mt-1 p-2 bg-gray-50 border border-gray-200 rounded-md">
                <span className="font-medium text-gray-800">Nota:</span> Fabricamos bajo demanda. Por ello, tu envío requiere {calculateDeliveryDays()} días de preparación.
              </p>
            </div>
            
          </div>

          {/* Checkout */}
          <div className="w-full lg:w-2/5 space-y-5">
            
            {/* Contact */}
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <h3 className="text-lg font-bold mb-3 text-gray-800">👤 Datos de Contacto</h3>
              <input 
                type="text" 
                name="name" 
                id="name" 
                placeholder="Nombre completo" 
                className={`${inputClasses} ${errors.name ? errorClasses : ''}`}
                value={contactData.name}
                onChange={(e) => {
                  setErrors(prev => ({ ...prev, name: '' }))
                  handleContactChange(e)
                }}
              />
              {errors.name && <p className="text-red-500 text-sm -mt-2 mb-3">{errors.name}</p>}
              
              <input 
                type="text" 
                name="email" 
                id="email" 
                placeholder="email" 
                className={`${inputClasses} ${errors.name ? errorClasses : ''}`}
                value={contactData.email}
                onChange={(e) => {
                  setErrors(prev => ({ ...prev, email: '' }))
                  handleContactChange(e)
                }}
              />
              {errors.email && <p className="text-red-500 text-sm -mt-2 mb-3">{errors.email}</p>}
              
              <input 
                type="text" 
                name="IDNumber" 
                id="IDNumber" 
                placeholder="Cedula de identidad" 
                className={`${inputClasses} ${errors.IDNumber ? errorClasses : ''}`}
                value={contactData.IDNumber}
                onChange={(e)=>{
                  setErrors(prev => ({ ...prev, IDNumber: '' }))
                  handleContactChange(e)
                }}
              />
              {errors.IDNumber && <p className="text-red-500 text-sm -mt-2 mb-3">{errors.IDNumber}</p>}
              
              <input 
                type="text" 
                name="phone" 
                id="phone" 
                placeholder="Número de celular" 
                className={`${inputClasses} ${errors.phone ? errorClasses : ''}`}
                value={contactData.phone}
                onChange={(e)=>{
                  setErrors(prev => ({ ...prev, phone: '' }))
                  handleContactChange(e)
                }}
              />
              {errors.phone && <p className="text-red-500 text-sm -mt-2 mb-3">{errors.phone}</p>}
            </div>

            {/* Shipping */}
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <h3 className="text-lg font-bold mb-3 text-gray-800">🚚 Escoge la Forma de Envío</h3>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div 
                  onClick={()=>{
                    setErrors(prev => ({ ...prev, shippingMethod: '' }))
                    setSelectedShippingMode(ShippingMethods.MRW)
                  }} 
                  className={getSelectionClasses(selectedShippingMode === ShippingMethods.MRW)}
                >
                  MRW
                </div>
                <div 
                  onClick={()=>{
                    setErrors(prev => ({ ...prev, shippingMethod: '' }))
                    setSelectedShippingMode(ShippingMethods.ZOOM)
                  }} 
                  className={getSelectionClasses(selectedShippingMode === ShippingMethods.ZOOM)}
                >
                  ZOOM
                </div>
              </div>
              
              {/* Shipping Method Error */}
              {errors.shippingMethod && <p className="text-red-500 text-sm -mt-2 mb-3 font-medium">{errors.shippingMethod}</p>}
              
              {/* Shipping method specific inputs */}
              <div className="p-3 border border-gray-200 rounded-lg bg-gray-50 transition-all duration-300">
                { 
                  (selectedShippingMode === ShippingMethods.MRW) && 
                  <ShippingMRW 
                      errors={{
                        shippingState: errors.shippingState,
                        shippingMunicipality: errors.shippingMunicipality,
                        shippingAgencyAddress: errors.shippingAgencyAddress,
                      }}
                  />
                }
                { (selectedShippingMode === ShippingMethods.ZOOM) && 
                  <ShippingZoom 
                      errors={{
                        shippingState: errors.shippingState,
                        shippingMunicipality: errors.shippingMunicipality,
                        shippingAgencyAddress: errors.shippingAgencyAddress,
                      }}
                  /> 
                }
                {
                  selectedShippingMode === null && 
                  <p className="text-center text-gray-500 text-sm">Selecciona un método de envío para continuar.</p>
                }
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <h3 className="text-lg font-bold mb-3 text-gray-800">💳 Escoge tu Método de Pago</h3>
              
              <div className="grid grid-cols-2 gap-3">
                {Object.values(PaymentMethods)
                  .filter(v => typeof v === 'number')
                  .map(methodIndex => {
                    const method = methodIndex as PaymentMethods;
                    return (
                      <div 
                        key={method}
                        onClick={() => {
                          setErrors(prev => ({ ...prev, paymentMethod: '' }))
                          setSelectedPaymentMethod(method)
                        }} 
                        className={getSelectionClasses(selectedPaymentMethod === method)}
                      >
                        {getPaymentMethodName(method)}
                      </div>
                    );
                  })
                }
              </div>
              
              {/* Payment Method Error */}
              {errors.paymentMethod && <p className="text-red-500 text-sm mt-3 font-medium">{errors.paymentMethod}</p>}

              {/* Selected payment instructions */}
              {selectedPaymentMethod !== null && (
                <div className="mt-4 p-3 border border-gray-200 rounded-lg bg-yellow-50 text-gray-700">
                  <p className="font-semibold mb-2">Realiza el pago a los siguientes datos:</p>
                  <div>
                    { selectedPaymentMethod == PaymentMethods.PagoMovil && <PagoMovil /> }
                    { selectedPaymentMethod == PaymentMethods.TransferenciaProvicial && <TransferenciaProvincial /> }
                    {/* { selectedPaymentMethod == PaymentMethods.TransferenciaMercantil && <TransferenciaMercantil /> }
                    { selectedPaymentMethod == PaymentMethods.TransferenciaBanesco && <TransferenciaBanesco /> } */}
                    { selectedPaymentMethod == PaymentMethods.Binance && <Binance /> }
                  </div>
                </div>
              )}
              
              <div className="mt-4">
                <h4 className="text-md font-semibold mb-2">Comprobante de Pago</h4>
                <input 
                  onChange={()=>setErrors(prev => ({ ...prev, paymentProof: '' }))}
                  ref={paymentProofRef}
                  type="file" 
                  name="payment-proof" 
                  id="payment-proof" 
                  // Apply error style if there's a paymentProof error
                  className={`w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold ${errors.paymentProof ? 'file:bg-red-100 file:text-red-700 border-red-500' : 'file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'} cursor-pointer border rounded-md p-1 transition-all`}
                />
                {errors.paymentProof && <p className="text-red-500 text-sm mt-2">{errors.paymentProof}</p>}
              </div>
              <RenderUpload fileInputRef={paymentProofRef} />
            </div>
            
            <div className="h-5"></div>

            {/* Botón de Comprar */}
            {
              !isLoading && (
                <>
                  <button
                    onClick={handleBuy}
                    className="w-full py-3 bg-green-500 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-green-600 transition-colors"
                  >
                    Confirmar Compra
                  </button>
                  {Object.values(errors).some(error => error) && (
                    <p className="text-red-500 text-sm mt-2 text-center">
                      Ups! Parece que hay algunos errores en los datos ingresados. Por favor, revisa los campos resaltados y corrígelos para realizar con tu compra.
                    </p>
                  )}
                  {uploadError && (
                    <p className="text-red-500 text-sm mt-2 text-center">
                      Ocurrió un error al procesar tu compra. Por favor, intenta nuevamente.
                    </p>
                  )}
                </>
              )
            }
            {
              isLoading && (
                <div className="">
                  <div className="flex flex-col items-center justify-center h-full w-full">
                    <div className="bg-white p-8 rounded-lg shadow-2xl flex flex-col items-center">
                      <svg 
                        className="animate-spin h-10 w-10 text-black mb-4" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                      >
                        <circle 
                          className="opacity-25" 
                          cx="12" 
                          cy="12" 
                          r="10" 
                          stroke="#00C950" 
                          strokeWidth="4"
                        ></circle>
                        <path 
                          className="opacity-75" 
                          fill="#00C950" 
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <p className="text-xl font-semibold text-black">
                        Finalizando tu compra
                      </p>
                    </div>
                  </div>
                </div>
              )
            }
            



            
          </div>
        </div>
      </div>

    </div>
  );
}