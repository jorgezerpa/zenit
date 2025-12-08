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

// Define a common style for inputs for better visual consistency
const inputClasses = "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow mb-3";

export default function Cart() {

  const cartStore = useCartStore()
  const productsStore = useProductsStore()
  const shippingStore = useShippingStore()
  
  const paymentProofRef = useRef<HTMLInputElement>(null);
  const [contactData, setContactData] = useState<{ name:string, phone: string }>({ name:"", phone: "" })
  const [selectedShippingMode, setSelectedShippingMode] = useState<ShippingMethods|null>(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethods|null>(null)

  useEffect(()=>{
    cartStore.initialLoad()
  }, [])

  useEffect(()=>{
    shippingStore.clearShippingData()
  }, [selectedShippingMode])

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
    // 1. **Prepare Data**
    const paymentProofFile = paymentProofRef.current?.files?.[0];
  
    if (!paymentProofFile) {
      console.error("Missing payment proof file.");
      // TODO: Add user-facing error handling (toast, alert, etc.)
      return; 
    }

    // Combine basic data
    const checkoutData = {
      contact: contactData,
      shipping: {
        method: selectedShippingMode !== null ? ShippingMethods[selectedShippingMode] : null,
        deliveryDays: calculateDeliveryDays(),
        specificData: shippingStore.shippingData,
      },
      payment: {
        method: selectedPaymentMethod !== null ? PaymentMethods[selectedPaymentMethod] : null,
      },
      items: cartStore.products, // We will use this array to insert into order_items
      total: Number(calculateTotal()),
    };

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
        shipping_method: checkoutData.shipping.method,
        stimated_delivery_days: checkoutData.shipping.deliveryDays,
        shipping_data: checkoutData.shipping.specificData, // jsonb field
        payment_method: checkoutData.payment.method,
        total: checkoutData.total,
        payment_proof_url: paymentProofUrl, // The URL we got from the upload
        status: 'Pending Payment', // Initial status
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
  } 
      

    
  return (
    <div>
      <TopBar />
      <BackButton to="/" text="volver a la lista de productos"/>
      
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
                className={inputClasses}
                value={contactData.name}
                onChange={handleContactChange}
              />
              <input 
                type="text" 
                name="phone" 
                id="phone" 
                placeholder="Número de celular" 
                className={inputClasses}
                value={contactData.phone}
                onChange={handleContactChange}
              />
            </div>

            {/* Shipping */}
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <h3 className="text-lg font-bold mb-3 text-gray-800">🚚 Escoge la Forma de Envío</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div 
                  onClick={()=>setSelectedShippingMode(ShippingMethods.MRW)} 
                  className={getSelectionClasses(selectedShippingMode === ShippingMethods.MRW)}
                >
                  MRW
                </div>
                <div 
                  onClick={()=>setSelectedShippingMode(ShippingMethods.ZOOM)} 
                  className={getSelectionClasses(selectedShippingMode === ShippingMethods.ZOOM)}
                >
                  ZOOM
                </div>
              </div>
              
              {/* Shipping method specific inputs */}
              <div className="p-3 border border-gray-200 rounded-lg bg-gray-50 transition-all duration-300">
                { (selectedShippingMode === ShippingMethods.MRW) && <ShippingMRW /> }
                { (selectedShippingMode === ShippingMethods.ZOOM) && <ShippingZoom /> }
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
                        onClick={() => setSelectedPaymentMethod(method)} 
                        className={getSelectionClasses(selectedPaymentMethod === method)}
                      >
                        {getPaymentMethodName(method)}
                      </div>
                    );
                  })
                }
              </div>
              
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
                  ref={paymentProofRef}
                  type="file" 
                  name="payment-proof" 
                  id="payment-proof" 
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" 
                />
              </div>
            </div>
            
            <div className="h-5"></div>

            {/* Botón de Comprar */}
            <button
              onClick={handleBuy}
              className="w-full py-3 bg-green-500 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-green-600 transition-colors"
            >
              Confirmar Compra
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}