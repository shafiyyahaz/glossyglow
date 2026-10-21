const products = [
 {name:"Crystal Glow Lip Gloss",type:"Lip Gloss",price:88000,desc:"Kilau bening yang memantulkan pesona di setiap senyuman.",img:"assets/crystal-gloss.jpg",badge:"BEST SELLER"},
 {name:"Rose Petal Lip Oil",type:"Lip Oil",price:78000,desc:"Sentuhan lembut bernuansa kelopak mawar untuk momen manismu.",img:"assets/rose-petal-oil.jpg",badge:"SOFT GLOW"},
 {name:"Berry Bloom Tint",type:"Glossy Lip Tint",price:65000,desc:"Warna berry yang playful, dengan sentuhan glossy memikat.",img:"assets/berry-tint.jpg",badge:"LOVED"},
 {name:"Peach Nectar Lip Oil",type:"Lip Oil",price:69000,desc:"Kilau peach yang terasa fresh, seperti sinar pagi.",img:"assets/peach-oil.jpg",badge:"PEACHY"},
 {name:"Rosy Shine Gloss",type:"Lip Gloss",price:89000,desc:"Warna rosy manis untuk menemani setiap cerita indahmu.",img:"assets/rosy-shine.jpg",badge:"NEW"},
 {name:"Cherry Charm Tint",type:"Glossy Lip Tint",price:65000,desc:"Sentuhan cherry yang berani, manis, dan penuh percaya diri.",img:"assets/cherry-tint.jpg",badge:"YOUR FAVE"}
];
const money = n => "Rp " + n.toLocaleString("id-ID");
const grid = document.getElementById("productGrid");
const cart = [];
products.forEach((p,i)=>{
 const card=document.createElement("article"); card.className="product-card";
 card.innerHTML=`<div class="product-photo"><img src="${p.img}" alt="${p.name}"><span class="product-badge">${p.badge}</span></div><div class="product-info"><span class="product-type">${p.type}</span><h3>${p.name}</h3><p>${p.desc}</p><div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add-button" data-add="${i}">+ Add to Glow Bag</button></div></div>`;
 grid.appendChild(card);
});
const toast=document.getElementById("toast");let toastTimer;
function showToast(msg){toast.textContent=msg;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2400)}
function renderCart(){document.getElementById("cartCount").textContent=cart.reduce((s,p)=>s+p.qty,0);const wrap=document.getElementById("cartItems");if(!cart.length){wrap.innerHTML='<p class="tiny-note">Glow bag kamu masih kosong. Yuk temukan kilau favoritmu ♡</p>'}else{wrap.innerHTML=cart.map((p,i)=>`<div class="cart-line"><div><b>${p.name}</b><small>${p.type} · Qty ${p.qty}</small></div><strong>${money(p.price*p.qty)}</strong><button aria-label="Hapus ${p.name}" data-remove="${i}" style="border:0;background:none;color:#b0446b;cursor:pointer">×</button></div>`).join("")}document.getElementById("cartTotal").textContent=money(cart.reduce((s,p)=>s+p.price*p.qty,0))}
grid.addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(!b)return;const p=products[Number(b.dataset.add)];const existing=cart.find(x=>x.name===p.name);if(existing)existing.qty++;else cart.push({...p,qty:1});renderCart();showToast(`${p.name} masuk ke Glow Bag ♡`)});
document.getElementById("bagButton").addEventListener("click",()=>{renderCart();document.getElementById("cartDialog").showModal()});
document.getElementById("closeCart").addEventListener("click",()=>document.getElementById("cartDialog").close());
document.getElementById("cartItems").addEventListener("click",e=>{const b=e.target.closest("[data-remove]");if(!b)return;cart.splice(Number(b.dataset.remove),1);renderCart()});
document.getElementById("checkoutButton").addEventListener("click",()=>{if(!cart.length){showToast("Glow bag kamu masih kosong ♡");return}const text="Halo GlossyGlow! Aku ingin tanya tentang pesanan ini:\\n"+cart.map(p=>`- ${p.name} (${p.qty}x) — ${money(p.price*p.qty)}`).join("\\n")+`\\nTotal contoh: ${money(cart.reduce((s,p)=>s+p.price*p.qty,0))}\\nApakah produk ini tersedia?`;const blob=document.createElement("textarea");blob.value=text;blob.style.position="fixed";blob.style.opacity="0";document.body.appendChild(blob);blob.select();try{document.execCommand("copy");showToast("Ringkasan pesanan disalin ♡")}catch(e){showToast("Ringkasan pesanan siap dibuat")}document.body.removeChild(blob)});
const quotes=[["A little shine can make an ordinary day feel special.","Sedikit kilau bisa membuat hari biasa terasa istimewa."],["Good lips, good mood, good energy.","Bibir terasa nyaman, suasana hati pun ikut cerah."],["You are beautiful, just the way you are.","Kamu cantik, dengan caramu sendiri."],["Soft lips, strong dreams.","Bibir lembut, mimpi yang besar."],["Let your glow tell your story.","Biarkan kilaumu menceritakan kisahmu."]];
let quoteIndex=0;function setQuote(){document.getElementById("quoteText").textContent=quotes[quoteIndex][0];document.getElementById("quoteTranslation").textContent=quotes[quoteIndex][1]}
document.getElementById("prevQuote").addEventListener("click",()=>{quoteIndex=(quoteIndex-1+quotes.length)%quotes.length;setQuote()});
document.getElementById("nextQuote").addEventListener("click",()=>{quoteIndex=(quoteIndex+1)%quotes.length;setQuote()});
document.getElementById("newsletterForm").addEventListener("submit",e=>{e.preventDefault();showToast("Terima kasih sudah bergabung dengan GlossyGlow ♡");e.target.reset()});
document.getElementById("year").textContent=new Date().getFullYear();
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("navMenu").classList.toggle("open"));
document.querySelectorAll("#navMenu a").forEach(a=>a.addEventListener("click",()=>document.getElementById("navMenu").classList.remove("open")));
renderCart();