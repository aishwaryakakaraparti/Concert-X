let selectedSeats = [];

// SELECT CONCERT
function selectConcert(name){
  localStorage.setItem("concert", name);
  window.location.href = "details.html";
}

// SHOW CONCERT TITLE
if(document.getElementById("concertTitle")){
  document.getElementById("concertTitle").innerText = localStorage.getItem("concert");
}

// SEATS PAGE
if(document.getElementById("seatContainer")){
  let container = document.getElementById("seatContainer");

  for(let i=0;i<32;i++){
    let seat = document.createElement("div");
    seat.classList.add("seat");

    seat.onclick = function(){
      seat.classList.toggle("selected");

      let seatNumber = i + 1;

if(selectedSeats.includes(seatNumber)){
  selectedSeats.splice(selectedSeats.indexOf(seatNumber),1);
}else{
  selectedSeats.push(seatNumber);
}

      document.getElementById("count").innerText = selectedSeats.length;
      localStorage.setItem("seats", JSON.stringify(selectedSeats));
    }

    container.appendChild(seat);
  }
}

// NAVIGATION
function goToSeats(){
  window.location.href = "seats.html";
}

function goToBooking(){
  window.location.href = "booking.html";
}

// SEARCH
function searchConcerts(){
  let input = document.getElementById("searchInput").value.toLowerCase();
  let cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    let title = card.querySelector("h3").innerText.toLowerCase();

    if(title.includes(input)){
      card.style.display = "block";
    }else{
      card.style.display = "none";
    }
  });
}

// PAYMENT FUNCTION 💳
function submitPayment(){
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let card = document.getElementById("card").value;
  let expiry = document.getElementById("expiry").value;
  let cvv = document.getElementById("cvv").value;

  if(name==="" || email==="" || card===""){
    alert("Please fill required details!");
    return;
  }

  let isUPI = card.includes("@");

  // If CARD → require expiry & cvv
  if(!isUPI && (expiry==="" || cvv==="")){
    alert("Enter card expiry and CVV!");
    return;
  }

  let txnId = "TXN" + Math.floor(Math.random()*1000000);

  let concert = localStorage.getItem("concert") || "Concert";
  let seats = JSON.parse(localStorage.getItem("seats")) || [];
  let amount = seats.length * 40;

  let paymentInfo = isUPI 
    ? "UPI ID: " + card 
    : "Card: ****" + card.slice(-4);

  let summary = `
<b>Transaction ID:</b> ${txnId} <br><br>
<b>Name:</b> ${name} <br>
<b>Email:</b> ${email} <br><br>
<b>Concert:</b> ${concert} <br>
<b>Seats:</b> ${seats.join(", ")} <br>
<b>Amount Paid:</b> $${amount} <br><br>
<b>Payment:</b> ${paymentInfo} <br><br>
✅ Payment Successful! <br><br>

<button onclick="confirmBooking()">Confirm Booking</button>
`;

document.getElementById("summaryText").innerHTML = summary;
document.getElementById("summaryBox").style.display = "block";
}
function confirmBooking(){
  alert("🎉 Booking Confirmed!");

  // clear everything
  localStorage.removeItem("seats");
  localStorage.removeItem("concert");

  window.location.href = "index.html";
}