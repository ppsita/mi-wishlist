import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  onSnapshot,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

/* =========================
   FIREBASE
========================= */

const firebaseConfig = {
  apiKey: "AIzaSyDNaLeAjI1CK_VasXnqsKyViUeuugpA6pA",
  authDomain: "wishlist-pepesita.firebaseapp.com",
  projectId: "wishlist-pepesita",
  storageBucket: "wishlist-pepesita.firebasestorage.app",
  messagingSenderId: "312038981830",
  appId: "1:312038981830:web:eddfda3e2c591d9b0f97c7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* =========================
   ELEMENTOS
========================= */

const contenedor = document.getElementById("products");
const modal = document.getElementById("modal");
const input = document.getElementById("guestName");
const confirmBtn = document.getElementById("confirmReservation");
const cancelBtn = document.getElementById("cancelReservation");

let selected = null;

/* =========================
   20 PRODUCTOS MANUALES
========================= */

const productos = [
  {
    id: 1,
    nombre: "Medicube Age-R Pro",
    precio: "$299.990",
    imagen: "images/regalo1.jpg.webp",
    link: "https://sokobox.cl/products/age-r-booster-pro-ex-pink?variant=44261305221293",
    reservadoPor: ""
  },
  {
    id: 2,
    nombre: "Numbuzin toner pads",
    precio: "$17.990",
    imagen: "images/regalo2.jpg.webp",
    link: "https://sokobox.cl/products/no-5-glutathione-vitamin-concentrated-toner-pads?variant=45825862631597",
    reservadoPor: ""
  },
  {
    id: 3,
    nombre: "Dr Althea 345 cream",
    precio: "$34.990",
    imagen: "images/regalo3.jpg",
    link: "https://sokobox.cl/products/345-relief-cream-2?variant=45866616848557",
    reservadoPor: ""
  },
  {
    id: 4,
    nombre: "Arencia jabón",
    precio: "$25.990",
    imagen: "images/regalo4.jpg",
    link: "https://sokobox.cl/products/blue-hyssop-rice-mochi-cleanser?variant=45929576136877",
    reservadoPor: ""
  },
  {
    id: 5,
    nombre: "Medicube PDRN cream",
    precio: "$29.990",
    imagen: "images/regalo5.jpg",
    link: "https://sokobox.cl/products/pdrn-pink-hyaluronic-moisturizing-cream?variant=44865178730669",
    reservadoPor: ""
  },
  {
    id: 6,
    nombre: "Soundcore Celestes",
    precio: "$79.990",
    imagen: "images/regalo6.jpg",
    link: "https://www.falabella.com/falabella-cl/product/80149813/AUDIFONO-OVER-EAR-SPACE-ONE-AZ/80149814",
    reservadoPor: ""
  },
  {
    id: 7,
    nombre: "VT 100 shot mascarilla",
    precio: "$7.990",
    imagen: "images/regalo7.jpg",
    link: "https://sokobox.cl/products/vt-mild-reedle-shot-100-2-step-mask?variant=44522626056365",
    reservadoPor: ""
  },
  {
    id: 8,
    nombre: "Biodance mascarillas",
    precio: "$7.990",
    imagen: "images/regalo8.jpg",
    link: "https://sokobox.cl/collections/biodance",
    reservadoPor: ""
  },
  {
    id: 9,
    nombre: "Diagnostico + corte capilar",
    precio: "$65.000",
    imagen: "images/regalo9.jpg",
    link: "https://wa.me/56920657477",
    reservadoPor: ""
  },
  {
    id: 10,
    nombre: "Calcetines talla M",
    precio: "$9.990",
    imagen: "images/regalo10.jpg",
    link: "https://www.ellesse.cl/calcetines/6640-calcetines-hiro.html?gad_source=1&gad_campaignid=19488513596&gbraid=0AAAAAogVfagNuxONVkyLSjaIh2bzzrN-H&gclid=Cj0KCQjwjIPSBhCCARIsABGyK7tIDCeCPcDLomVqVCJfJQbhHck40GdYTcssUXIftsEM05dHGW-EPbMaAjkDEALw_wcB",
    reservadoPor: ""
  },
  {
    id: 11,
    nombre: "Fijador Huda beauty",
    precio: "$20.200",
    imagen: "images/regalo11.jpg",
    link: "https://www.blush-bar.cl/mini-fijador-de-maquillaje-easy-bake-blurring-setting-spray-with-16-hour-wear/p",
    reservadoPor: ""
  },
  {
    id: 12,
    nombre: "Primer Huda beauty ",
    precio: "$35.700",
    imagen: "images/regalo12.jpg",
    link: "https://www.blush-bar.cl/primer-de-maquillaje-easy-blur-smoothing-pore-minimizing-primer/p",
    reservadoPor: ""
  },
  {
    id: 13,
    nombre: "Rubores Huda beauty",
    precio: "$51.200",
    imagen: "images/regalo13.jpg",
    link: "https://www.blush-bar.cl/blush-filter-palette-huda-beauty/p?skuId=10736",
    reservadoPor: ""
  },
  {
    id: 14,
    nombre: "Corrector Natasha Denona R2-R3",
    precio: "$38.990",
    imagen: "images/regalo14.jpg",
    link: "https://www.blush-bar.cl/corrector-hy-glam-concealer/p?skuId=9204",
    reservadoPor: ""
  },
  {
    id: 15,
    nombre: "Anastasia Lapiz cejas Soft brown",
    precio: "$32.990",
    imagen: "images/regalo15.jpg",
    link: "https://www.blush-bar.cl/lapiz-de-cejas-archibrow-brow-pencil/p?skuId=11105",
    reservadoPor: ""
  },
  {
    id: 16,
    nombre: "Pollini Cafe-Burdeo",
    precio: "$20.000",
    imagen: "images/regalo16.jpg",
    link: "https://www.pollini.cl/producto/bandoleras-mujer/15891-bandolera-mujer-pom036xb21i0205.html",
    reservadoPor: ""
  },
  {
    id: 17,
    nombre: "Parches Acne",
    precio: "$5.500",
    imagen: "images/regalo17.jpg",
    link: "https://sokobox.cl/products/parche-hidrocoloide-hydrocolloid-for-blemishes?variant=43916680429741",
    reservadoPor: ""
  },
  {
    id: 18,
    nombre: "Cintillo skincare",
    precio: "$6.990",
    imagen: "images/regalo18.jpg",
    link: "https://dbs.cl/capilar-accesorios-complementos-set-headband-and-wristles",
    reservadoPor: ""
  },
  {
    id: 19,
    nombre: "Cepillo clean lock",
    precio: "$4.990",
    imagen: "images/regalo19.jpg",
    link: "https://dbs.cl/capilar-accesorios-peines-y-cepillos-styling-hair-brush",
    reservadoPor: ""
  },
  {
    id: 20,
    nombre: "Shampoo en seco Elgon",
    precio: "$11.990",
    imagen: "images/regalo20.jpg",
    link: "https://www.pichara.cl/products/shampoo-seco-yes-daily-200ml-elgon?_pos=1&_sid=e1015db17&_ss=r",
    reservadoPor: ""
  }
];

/* =========================
   RENDER
========================= */

function render(lista) {

  contenedor.innerHTML = "";

  lista.forEach(p => {

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">

      <div class="card-content">

        <h3>${p.nombre}</h3>
        <p class="price">${p.precio}</p>

        <div class="buttons">

          <button class="btn btn-dark ver">Ver regalo</button>

          <button class="btn btn-light reservar">
            ${p.reservadoPor ? "Reservado 🤍" : "Reservar"}
          </button>

          ${p.reservadoPor ? `<p style="margin-top:10px;font-size:14px;color:#777;">Reservado por ${p.reservadoPor}</p>` : ""}

        </div>

      </div>
    `;

    /* =========================
       BOTÓN RESERVAR
    ========================= */

    const reservarBtn = card.querySelector(".reservar");

    reservarBtn.addEventListener("click", () => {

      if (p.reservadoPor) {
        deleteDoc(doc(db, "reservas", String(p.id)));
        return;
      }

      selected = p;
      modal.classList.add("active");

    });

    /* =========================
       BOTÓN VER LINK
    ========================= */

    const verBtn = card.querySelector(".ver");

    verBtn.addEventListener("click", () => {

      if (p.link && p.link !== "#") {
        window.open(p.link, "_blank");
      } else {
        alert("Este regalo aún no tiene link 💜");
      }

    });

    contenedor.appendChild(card);

  });

}

/* =========================
   FIREBASE LIVE
========================= */

const ref = collection(db, "reservas");

onSnapshot(ref, (snap) => {

  const data = snap.docs.map(d => d.data());

  const updated = productos.map(p => {

    const r = data.find(x => x.id === p.id);

    return {
      ...p,
      reservadoPor: r ? r.nombre : ""
    };

  });

  render(updated);

  /* =========================
     CONTADOR
  ========================= */

  const reservedCount = updated.filter(p => p.reservadoPor !== "").length;

  const total = productos.length;
  const available = total - reservedCount;

  document.getElementById("total").textContent = total;
  document.getElementById("reserved").textContent = reservedCount;
  document.getElementById("available").textContent = available;

});

/* =========================
   MODAL
========================= */

confirmBtn.addEventListener("click", async () => {

  const nombre = input.value.trim();

  if (!nombre || !selected) return;

  await setDoc(doc(db, "reservas", String(selected.id)), {
    id: selected.id,
    nombre: nombre
  });

  input.value = "";
  modal.classList.remove("active");

});

cancelBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});