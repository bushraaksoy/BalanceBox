# BalanceBox – Personal Finance Assistant API

BalanceBox is a full-featured backend for a personal finance assistant application that helps users track income, expenses, savings, and card balances. It also provides features for transaction history and bank statement parsing.

## 🧩 Tech Stack

-   **Backend**: Node.js, Express.js
-   **Database**: PostgreSQL with Prisma ORM
-   **Authentication**: Custom Middleware
-   **File Uploads**: Multer
-   **PDF Parsing**: Custom Utility (`bankStatementParser.js`)

---

## 📁 Project Structure

```
├── controllers/
│   ├── TransactionController.js
│   └── UserController.js
├── middleware/
│   ├── authMiddleware.js
│   ├── cardMiddleware.js
│   └── uploadMiddleware.js
├── routes/
│   ├── transactionRoutes.js
│   └── userRoutes.js
├── utils/
│   ├── formatters.js
│   └── bankStatementParser.js
├── db/
│   └── db.config.js
├── uploads/
│   └── documents/
```

---

## 🔐 Authentication

Requests must pass a valid `userId` through headers for authenticated routes.

### Example:

```http
GET /api/v1/transactions
Headers:
  user-id: 123
```

Middleware used:

-   `authenticateUserId`: Validates the `userId` from the headers.
-   `validateCardId`: Confirms card existence and ownership.
-   `checkBalance`: Ensures sufficient card balance for transactions.

---

## 🧾 Transaction API

### `GET /api/v1/transactions?type=&period=`

Fetch all user transactions with optional filters:

-   `type`: `INCOME`, `EXPENSE`, `SAVING`
-   `period`: `month`

### `POST /api/v1/transactions/income`

Add an income transaction based on `incomeId`.

**Body**:

```json
{
    "incomeId": 1
}
```

### `POST /api/v1/transactions/expense`

Add an expense transaction (with card and balance check).

**Body**:

```json
{
    "expenseId": 2,
    "cardId": 1,
    "amount": 500
}
```

### `POST /api/v1/transactions/saving`

Add a saving transaction (deducts from card, adds to saving).

**Body**:

```json
{
    "savingId": 3,
    "cardId": 1,
    "amount": 1000
}
```

### `PUT /api/v1/transactions/:transactionId`

Update a transaction.

### `DELETE /api/v1/transactions/:transactionId`

Delete a transaction and rollback the balance accordingly:

-   For `EXPENSE` or `SAVING`: amount is added back to the card.
-   For `INCOME`: amount is subtracted from the card.

### `POST /api/v1/transactions/upload`

Upload a PDF bank statement to parse and extract transactions.

**Form Data**:

-   `bankstatement`: PDF file
-   `cardId`: Card to associate parsed transactions with

Parses the file, extracts transactions, and deletes the file after use.

---

## 👤 User API

### `GET /api/v1/users`

Fetch all users (ordered by creation date).

### `GET /api/v1/users/:userId`

Get user by ID.

### `PUT /api/v1/users/:userId`

Update a user's information.

**Body**:

```json
{
    "username": "NewName",
    "email": "new@example.com"
}
```

### `DELETE /api/v1/users/:userId` _(optional for admin)_

Delete user and return a success message.

---

## 📦 Middleware Overview

-   `authenticateUserId`: Validates user ID exists in request.
-   `validateCardId`: Ensures card exists and belongs to user.
-   `checkBalance`: Confirms card has enough funds.
-   `uploadMiddleware`: Uses Multer to handle single file upload (bank statements).

---

## 🔧 Prisma Models Overview (Schema)

**TransactionHistory**

-   `type`: `INCOME`, `EXPENSE`, `SAVING`
-   `amount`, `createdAt`, `userId`, `cardId`
-   Relations to `income`, `expense`, `saving`, and `card`

**Card**

-   `title`, `balance`, `userId`

**Income / Expense / Saving**

-   `title`, `amount`, `cardId`, `userId`

---

## 🛠 Development

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Build

```bash
npm run build
```

---

## 🧪 Testing

You can test the routes using:

-   Postman / Thunder Client
-   Swagger (optional integration)
-   Unit tests (recommended for transaction logic and parsers)

---

## 📂 Environment Variables (example)

```
DATABASE_URL=postgresql://username:password@localhost:5432/balancebox
PORT=5000
```

---

## 🙋‍♂️ Author

Developed by Bushra Aksoy
