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
  const [paymentMethod, setPaymentMethod] = useState(null); // CHANGED from array
  const [ticketQuantity, setTicketQuantity] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    // USERS
    onValue(ref(db, "users"), (snapshot) => {
      const data = snapshot.val();
      const list = data
        ? Object.entries(data).map(([id, val]) => ({ id, ...val }))
        : [];
      setUsers(list);
    });

    // SELECTED PAYMENT METHOD (single value or object)
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
      <h1 style={{ textAlign: "center", marginBottom: 40 }}>📊 Admin Section to View data</h1>

      {/* USERS */}
      <section style={sectionStyle}>
        <h2 style={{ borderBottom: "2px solid #eee", paddingBottom: "10px" }}>👤 Users</h2>
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

      {/* PAYMENT METHOD (SINGLE) */}
      <section style={sectionStyle}>
        <h2 style={{ borderBottom: "2px solid #eee", paddingBottom: "10px" }}>💳 Selected Payment Method</h2>
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
    </div>
  );
};

export default FirebaseDataPage;
