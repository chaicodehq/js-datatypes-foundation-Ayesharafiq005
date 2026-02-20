/**
 * 🍽️ Thali Combo Platter - Mixed Methods Capstone
 *
 * Grand Indian Thali restaurant mein combo platter system banana hai.
 * String, Number, Array, aur Object — sab methods mila ke ek complete
 * thali banao. Yeh capstone challenge hai — sab kuch combine karo!
 *
 * Data format: thali = {
 *   name: "Rajasthani Thali",
 *   items: ["dal baati", "churma", "papad"],
 *   price: 250,
 *   isVeg: true
 * }
 *
 * Functions:
 *
 *   1. createThaliDescription(thali)
 *      - Template literal, .join(", "), .toUpperCase(), .toFixed(2) use karo
 *      - Format: "{NAME} (Veg/Non-Veg) - Items: {items joined} - Rs.{price}"
 *      - name ko UPPERCASE karo, price ko 2 decimal places tak
 *      - isVeg true hai toh "Veg", false hai toh "Non-Veg"
 *      - Agar thali object nahi hai ya required fields missing hain, return ""
 *      - Required fields: name (string), items (array), price (number), isVeg (boolean)
 *      - Example: createThaliDescription({name:"Rajasthani Thali", items:["dal","churma"], price:250, isVeg:true})
 *                 => "RAJASTHANI THALI (Veg) - Items: dal, churma - Rs.250.00"
 *
 *   2. getThaliStats(thalis)
 *      - Array of thali objects ka stats nikalo
 *      - .filter() se veg/non-veg count
 *      - .reduce() se average price
 *      - Math.min/Math.max se cheapest/costliest
 *      - .map() se saare names
 *      - Return: { totalThalis, vegCount, nonVegCount, avgPrice (2 decimal string),
 *                  cheapest (number), costliest (number), names (array) }
 *      - Agar thalis array nahi hai ya empty hai, return null
 *
 *   3. searchThaliMenu(thalis, query)
 *      - .filter() + .includes() se search karo (case-insensitive)
 *      - Thali match karti hai agar name ya koi bhi item query include kare
 *      - Agar thalis array nahi hai ya query string nahi hai, return []
 *      - Example: searchThaliMenu(thalis, "dal") => thalis with "dal" in name or items
 *
 *   4. generateThaliReceipt(customerName, thalis)
 *      - Template literals + .map() + .join("\n") + .reduce() se receipt banao
 *      - Format:
 *        "THALI RECEIPT\n---\nCustomer: {NAME}\n{line items}\n---\nTotal: Rs.{total}\nItems: {count}"
 *      - Line item: "- {thali name} x Rs.{price}"
 *      - customerName UPPERCASE mein
 *      - Agar customerName string nahi hai ya thalis array nahi hai/empty hai, return ""
 *
 * @example
 *   createThaliDescription({name:"Rajasthani Thali", items:["dal"], price:250, isVeg:true})
 *   // => "RAJASTHANI THALI (Veg) - Items: dal - Rs.250.00"
 */
export function createThaliDescription(thali) {
  if(!thali || typeof thali !== "object" || typeof thali.name !== "string" || !Array.isArray(thali.items) ||
   typeof thali.isVeg !== "boolean" || typeof thali.price !== "number" ) return "";


   const Vegg = thali.isVeg ? "Veg" : "Non-Veg";
   const items = thali.items.join(", ");
   const pricing = thali.price.toFixed(2);

   
   return `${thali.name.toUpperCase()} (${Vegg}) - Items: ${items} - Rs.${pricing}`;
   

}

export function getThaliStats(thalis) {
  if(!Array.isArray(thalis) || !thalis || thalis.length === 0) return null;
let vegCount = 0; let nonVegCount = 0;
let countThali = thalis.length;

  const counts = thalis.filter((x) => x.isVeg === true ? vegCount++ : nonVegCount++ );

  const Price = thalis.reduce((acc,curr) => {
    return acc + curr.price;
  },0);
  const avgPrice = (Price / countThali).toFixed(2) ;

  const priceCheck = thalis.map(x => x.price);
  const cheapest = Math.min(...priceCheck);
  const costliest = Math.max(...priceCheck);

  const names = thalis.map((x) => x.name);

  return {
   totalThalis : countThali,
    vegCount : vegCount,
    nonVegCount : nonVegCount, 
    avgPrice :avgPrice,
 cheapest : cheapest, 
 costliest : costliest,
  names : names
  }

}

export function searchThaliMenu(thalis, query) {
  if(!Array.isArray(thalis) || typeof query !== "string" || query === "") return [];

 let queryLower =  query.toLowerCase();
return thalis.filter((t) => {
 
 const nameCheck = t.name.toLowerCase().includes(queryLower);
  const thaaliCheck = t.items.join(" ").toLowerCase().includes(queryLower);

return nameCheck || thaaliCheck;

});

  
}

export function generateThaliReceipt(customerName, thalis) {
  
if(typeof customerName != "string" || customerName === "" || !Array.isArray(thalis) || thalis.length <= 0) return "";

let upperName = customerName.toUpperCase();
let lineItems =  thalis.map((t) =>`- ${t.name} x Rs.${t.price}`).join("\n");

const total = thalis.reduce((acc, curr) => acc + curr.price, 0);

return  `THALI RECEIPT\n---\nCustomer: ${upperName}\n${lineItems}\n---\nTotal: Rs.${total}\nItems: ${thalis.length}`.trim();

}


// npm test -- 12-thali