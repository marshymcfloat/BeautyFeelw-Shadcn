import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import Transaction from "../lib/models/Transaction.js";
import Account from "../lib/models/Account.js";
import { connectDatabase } from "../lib/models/Customer.js";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const port = 4000;

// Connect to the database before handling requests
connectDatabase()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is now listening at port: ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to database. Server not started.", error);
  });

// Server-side code
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("selectService", async (data) => {
    console.log("Received data:", data);

    // Validate required fields
    if (!data.transactionID) {
      return socket.emit("error", { message: "Transaction ID is missing!" });
    }
    if (!data.user) {
      return socket.emit("error", { message: "User ID is missing!" });
    }
    if (!data.service) {
      return socket.emit("error", { message: "Service name is missing!" });
    }

    try {
      // Find the transaction
      const foundTransaction = await Transaction.findById(data.transactionID);
      if (!foundTransaction) {
        return socket.emit("error", {
          message:
            "Can't find any transaction with the provided transaction ID.",
        });
      }

      const serviceIndex = foundTransaction.services.findIndex(
        (service) => service.name === data.service
      );
      if (serviceIndex === -1) {
        return socket.emit("error", { message: "There is no such service." });
      }

      const foundAccount = await Account.findById(data.user);

      console.log(foundAccount);
      if (!foundAccount) {
        return socket.emit("error", {
          message: "The Account ID can't be found.",
        });
      }

      foundTransaction.services[serviceIndex].servedBy = data.checked
        ? foundAccount.username
        : null;
      foundTransaction.services[serviceIndex].checkedBy = data.checked
        ? data.user
        : null;

      await foundTransaction.save();
      console.log("Transaction updated successfully.");

      io.emit("serviceUpdated", {
        message: "Transaction updated successfully.",
        transactionID: data.transactionID,
        service: data.service,
        servedBy: foundTransaction.services[serviceIndex].servedBy,
        checkedBy: foundTransaction.services[serviceIndex].checkedBy, // Include checkedBy
      });
    } catch (error) {
      console.error("Error updating transaction:", error);
      socket.emit("error", {
        message: "An error occurred while updating the transaction.",
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
