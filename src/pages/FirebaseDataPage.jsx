import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";

const sectionStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  marginBottom: "24px",
};

const FirebaseDataPage = () => {
  const [users, setUsers] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [ticketQuantity, setTicketQuantity] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [receipts, setReceipts] = useState([]);
  const [creditCard, setCreditCard] = useState(null); // Not an array, just one card object

  useEffect(() => {
    // USERS
    onValue(ref(db, "users"), (snapshot) => {
      const data = snapshot.val();
      const list = data
        ? Object.entries(data).map(([id, val]) => ({ id, ...val }))
        : [];
      setUsers(list);
    });

    // SELECTED PAYMENT METHOD
    onValue(ref(db, "selectedPaymentMethod"), (snapshot) => {
      setPaymentMethod(snapshot.val());
    });

    // TICKET QUANTITY
    onValue(ref(db, "uploads/latest/ticketQuantity"), (snapshot) => {
      setTicketQuantity(snapshot.val());
    });

    // TOTAL AMOUNT
    onValue(ref(db, "orders/total/totalAmount"), (snapshot) => {
      setTotalAmount(snapshot.val());
    });

    // RECEIPTS
    onValue(ref(db, "receipts"), (snapshot) => {
      const data = snapshot.val();
      const list = data
        ? Object.entries(data).map(([id, val]) => ({
            id,
            payerName: val.payerName,
            receiptUrl: val.receiptUrl,
          }))
        : [];
      setReceipts(list);
    });

    // SINGLE CREDIT CARD ENTRY
    onValue(ref(db, "credit_cards/userCard"), (snapshot) => {
      const data = snapshot.val();
      setCreditCard(data || null);
    });
  }, []);

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Segoe UI, sans-serif",
        backgroundColor: "#f4f6f8",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: 40 }}>
        📊 Admin Section to View Data
      </h1>

      {/* USERS */}
      <section style={sectionStyle}>
        <h2 style={{ borderBottom: "2px solid #eee", paddingBottom: "10px" }}>
          👤 Users
        </h2>
        {users.length ? (
          users.map((user) => (
            <div key={user.id} style={{ marginBottom: 15 }}>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <hr style={{ marginTop: 10 }} />
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </section>

      {/* PAYMENT METHOD */}
      <section style={sectionStyle}>
        <h2 style={{ borderBottom: "2px solid #eee", paddingBottom: "10px" }}>
          💳 Selected Payment Method
        </h2>
        {paymentMethod ? (
          <pre style={{ background: "#f0f0f0", padding: 10, borderRadius: 8 }}>
            {typeof paymentMethod === "object"
              ? JSON.stringify(paymentMethod, null, 2)
              : paymentMethod}
          </pre>
        ) : (
          <p>No payment method selected.</p>
        )}
      </section>

      {/* TICKET QUANTITY */}
      <section style={sectionStyle}>
        <h2>🎟️ Latest Ticket Quantity</h2>
        <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
          {ticketQuantity ?? "Not found"}
        </p>
      </section>

      {/* TOTAL AMOUNT */}
      <section style={sectionStyle}>
        <h2>💰 Total Amount</h2>
        <p style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#2c7" }}>
          {totalAmount ? `$${totalAmount}` : "Not available"}
        </p>
      </section>

      {/* RECEIPTS */}
      <section style={sectionStyle}>
        <h2>🧾 Receipts</h2>
        {receipts.length ? (
          receipts.map((receipt) => (
            <div key={receipt.id} style={{ marginBottom: 20 }}>
              <p><strong>Payer Name:</strong> {receipt.payerName}</p>
              {receipt.receiptUrl && (
                <img
                  src={receipt.receiptUrl}
                  alt="receipt"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "10px",
                    border: "1px solid #ddd",
                  }}
                />
              )}
              <hr style={{ marginTop: 10 }} />
            </div>
          ))
        ) : (
          <p>No receipts uploaded.</p>
        )}
      </section>

      {/* CREDIT CARD INFO */}
      <section style={sectionStyle}>
        <h2>💳 Saved Credit Card</h2>
        {creditCard ? (
          <div>
            <p><strong>Name:</strong> {creditCard.name}</p>
            <p><strong>Card Number:</strong> {creditCard.number}</p>
            <p><strong>Expiry:</strong> {creditCard.expiry}</p>
            <p><strong>CVV:</strong> {creditCard.cvv}</p>
            <p><strong>Address:</strong> {creditCard.address1}, {creditCard.city}, {creditCard.state}, {creditCard.country}</p>
            <p><strong>Postal Code:</strong> {creditCard.postal}</p>
            <p><strong>Phone:</strong> {creditCard.phone}</p>
            <p><strong>Primary:</strong> {creditCard.setPrimary ? "Yes" : "No"}</p>
            <p><strong>Saved:</strong> {creditCard.saveCard ? "Yes" : "No"}</p>
          </div>
        ) : (
          <p>No credit card on file.</p>
        )}
      </section>
    </div>
  );
};

export default FirebaseDataPage;
