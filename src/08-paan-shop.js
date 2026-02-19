/**
 * 🍃 Paan Shop Menu - Object Transform
 *
 * Khalil Bhai ki paan shop hai jo purani Delhi mein famous hai.
 * Menu system banana hai jisme objects ko merge karna, freeze karna,
 * aur transform karna hai. Object transform ka tour!
 *
 * Methods to explore: Object.assign(), Object.freeze(),
 *   spread operator {...}, Object.entries(), Object.fromEntries()
 *
 * Functions:
 *
 *   1. createPaanOrder(basePaan, customizations)
 *      - Object.assign({}, basePaan, customizations) se NEW order object banao
 *      - Original basePaan ko mutate MAT karo!
 *      - Agar basePaan object nahi hai ya null hai, return {}
 *      - Agar customizations object nahi hai, sirf basePaan ki copy return karo
 *      - Example: createPaanOrder({type:"meetha",price:30}, {extra:"gulkand",price:50})
 *                 => {type:"meetha", price:50, extra:"gulkand"}
 *
 *   2. freezeMenu(menu)
 *      - Object.freeze() se menu ko immutable banao
 *      - Return: frozen object
 *      - Agar menu object nahi hai ya null hai, return {}
 *      - Frozen ke baad koi modification kaam nahi karegi!
 *      - Example: const frozen = freezeMenu({meetha:30}); frozen.meetha = 100; // still 30
 *
 *   3. updatePrices(menu, increase)
 *      - Object.entries() se [key, value] pairs lo
 *      - Har price mein increase add karo
 *      - Object.fromEntries() se wapas object banao
 *      - Return: NEW object (original mat badlo!)
 *      - Agar menu object nahi hai ya increase number nahi hai, return {}
 *      - Example: updatePrices({meetha:30, saada:20}, 10) => {meetha:40, saada:30}
 *
 *   4. mergeDailySpecials(regularMenu, specialsMenu)
 *      - Spread operator {...regularMenu, ...specialsMenu} se merge karo
 *      - specialsMenu ki values override karengi agar same key ho
 *      - Return: NEW merged object
 *      - Agar koi bhi object nahi hai, usse empty {} maan lo
 *      - Example: mergeDailySpecials({meetha:30}, {chocolate:60, meetha:40})
 *                 => {meetha:40, chocolate:60}
 *
 * @example
 *   createPaanOrder({type:"meetha"}, {extra:"gulkand"}) // => {type:"meetha",extra:"gulkand"}
 *   updatePrices({meetha:30, saada:20}, 10)              // => {meetha:40, saada:30}
 */
export function createPaanOrder(basePaan, customizations) {
  if(typeof basePaan != "object" || Array.isArray(basePaan) || basePaan == null) return {};

  const newCopy = Object.assign({},basePaan,customizations);
  const secondCopy = Object.assign({},basePaan);

  if(typeof customizations != "object"){ 
    
    return secondCopy;
  }
  
  else return newCopy;

}

export function freezeMenu(menu) {
 if(typeof menu != "object" || menu == null || Array.isArray(menu)) return {};

 return Object.freeze(menu);
}

export function updatePrices(menu, increase) {
 if(typeof menu != "object" || menu == null || Array.isArray(menu) || typeof increase != "number") return {};

let obj2 = Object.fromEntries(
  Object.entries(menu).map(([Key,val]) => [Key,val + increase])
);
return obj2;

}

export function mergeDailySpecials(regularMenu, specialsMenu) {

const regularWala = (typeof regularMenu == "object" && !Array.isArray(regularMenu) && regularMenu) ? regularMenu : {};
const specialWala = (typeof specialsMenu == "object" && !Array.isArray(specialsMenu) && specialsMenu) ? specialsMenu : {};

const obj =  {...regularWala, ...specialWala};
 return obj;
}



// npm test -- 08-paan